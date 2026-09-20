/* ===================================================================
   FARM LINK — UNIFIED API CLIENT
   Communicates with Express server or gracefully falls back to local data
   =================================================================== */

const ApiService = {
    async request(endpoint, options = {}) {
        const url = `${CONFIG.API_BASE}${endpoint}`;
        const timeout = options.timeout || CONFIG.TIMEOUT_MS;
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...(options.headers || {})
                },
                signal: controller.signal
            });
            clearTimeout(id);
            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(data.error || `HTTP ${response.status}: Request failed`);
            }
            return data;
        } catch (err) {
            clearTimeout(id);
            throw err;
        }
    },

    // Health
    async getHealth() {
        try {
            return await this.request('/api/health', { method: 'GET' });
        } catch {
            return { ok: false, offline: true };
        }
    },

    // Photo Verification via Cloudflare Workers AI with resilient fallback
    async verifyProduce(product, images) {
        try {
            return await this.request('/api/verify-produce', {
                method: 'POST',
                body: JSON.stringify({ product, images }),
                timeout: 10000 // 10s timeout before smooth fallback
            });
        } catch (err) {
            console.warn('API verifyProduce server call failed or timed out, performing smart client verification fallback:', err.message);
            
            // AI service unavailable fallback
            return {
                success: false,
                verification_status: "unavailable",
                verified: false,
                reason: "AI verification service is temporarily unavailable.",
                message: "AI verification service is temporarily unavailable (AI review required)."
            };
        }
    },

    // Market Price Discovery (AgmarkNet)
    async getMarketPrice(product, location, quantity = 0, expectedPrice = 0) {
        const params = new URLSearchParams({
            product,
            location,
            quantity,
            expectedPrice
        });
        return await this.request(`/api/market-discovery?${params.toString()}`, {
            method: 'GET'
        });
    },

    // Products
    async getProducts(filters = {}) {
        const params = new URLSearchParams(filters);
        const data = await this.request(`/api/products?${params.toString()}`, { method: 'GET' });
        return data.products || [];
    },

    async createProduct(productData) {
        const data = await this.request('/api/products', {
            method: 'POST',
            body: JSON.stringify(productData)
        });
        return data.product || null;
    },

    async updateProduct(id, productData) {
        const data = await this.request(`/api/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(productData)
        });
        return data.product || null;
    },

    async deleteProduct(id) {
        await this.request(`/api/products/${id}`, { method: 'DELETE' });
        return true;
    },

    // Orders
    async getOrders(filters = {}) {
        try {
            const params = new URLSearchParams(filters);
            const data = await this.request(`/api/orders?${params.toString()}`, { method: 'GET' });
            if (data.orders) {
                StorageService.set(STORAGE_KEYS.ORDERS, data.orders);
                return data.orders;
            }
        } catch (e) {
            console.warn('API getOrders fallback to storage:', e.message);
        }
        return StorageService.get(STORAGE_KEYS.ORDERS, []);
    },

    async createOrder(orderData) {
        try {
            const data = await this.request('/api/orders', {
                method: 'POST',
                body: JSON.stringify(orderData)
            });
            if (data.order) {
                const list = StorageService.get(STORAGE_KEYS.ORDERS, []);
                list.unshift(data.order);
                StorageService.set(STORAGE_KEYS.ORDERS, list);
                return data.order;
            }
        } catch (e) {
            console.warn('API createOrder fallback:', e.message);
        }
        // Local fallback logic
        const newOrder = {
            ...orderData,
            id: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
            status: 'ORDER PLACED',
            history: [{ status: 'ORDER PLACED', timestamp: Date.now(), note: 'Order placed by buyer' }],
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        const list = StorageService.get(STORAGE_KEYS.ORDERS, []);
        list.unshift(newOrder);
        StorageService.set(STORAGE_KEYS.ORDERS, list);
        return newOrder;
    },

    async updateOrderStatus(id, newStatus, note = '') {
        try {
            const data = await this.request(`/api/orders/${id}/status`, {
                method: 'PATCH',
                body: JSON.stringify({ status: newStatus, note })
            });
            if (data.order) {
                const list = StorageService.get(STORAGE_KEYS.ORDERS, []);
                const idx = list.findIndex(o => o.id === id);
                if (idx !== -1) list[idx] = data.order;
                StorageService.set(STORAGE_KEYS.ORDERS, list);
                return data.order;
            }
        } catch (e) {
            console.warn('API updateOrderStatus fallback:', e.message);
        }
        const list = StorageService.get(STORAGE_KEYS.ORDERS, []);
        const idx = list.findIndex(o => o.id === id);
        if (idx !== -1) {
            list[idx].status = newStatus;
            list[idx].updatedAt = Date.now();
            list[idx].history.push({ status: newStatus, timestamp: Date.now(), note });
            StorageService.set(STORAGE_KEYS.ORDERS, list);
            return list[idx];
        }
        return null;
    },

    // Assisted Farmers & Verification
    async getFarmers(filters = {}) {
        try {
            const params = new URLSearchParams(filters);
            const data = await this.request(`/api/farmers?${params.toString()}`, { method: 'GET' });
            if (data.farmers) {
                StorageService.set(STORAGE_KEYS.FARMERS, data.farmers);
                return data.farmers;
            }
        } catch (e) {
            console.warn('API getFarmers fallback:', e.message);
        }
        let list = StorageService.get(STORAGE_KEYS.FARMERS, []);
        if (filters.fieldOfficerId) {
            list = list.filter(f => f.fieldOfficerId === filters.fieldOfficerId);
        }
        if (filters.search) {
            const q = filters.search.toLowerCase();
            list = list.filter(f => (f.name + ' ' + f.phone + ' ' + (f.farmerId || '') + ' ' + (f.district || '')).toLowerCase().includes(q));
        }
        return list;
    },

    async getFarmerById(id) {
        try {
            const data = await this.request(`/api/farmers/${id}`, { method: 'GET' });
            if (data.farmer) return data;
        } catch (e) {
            console.warn('API getFarmerById fallback:', e.message);
        }
        const farmers = StorageService.get(STORAGE_KEYS.FARMERS, []);
        const farmer = farmers.find(f => f.id === id || f.farmerId === id) || null;
        const products = StorageService.get(STORAGE_KEYS.PRODUCTS, []).filter(p => p.sellerId === id && p.status !== 'DELETED');
        const orders = StorageService.get(STORAGE_KEYS.ORDERS, []).filter(o => o.sellerId === id);
        return { success: Boolean(farmer), farmer, products, orders };
    },

    async createFarmer(farmerData) {
        try {
            const data = await this.request('/api/farmers', {
                method: 'POST',
                body: JSON.stringify(farmerData)
            });
            if (data.farmer) {
                const list = StorageService.get(STORAGE_KEYS.FARMERS, []);
                list.unshift(data.farmer);
                StorageService.set(STORAGE_KEYS.FARMERS, list);
                return data.farmer;
            }
        } catch (e) {
            console.warn('API createFarmer fallback:', e.message);
        }
        const newFarmer = {
            ...farmerData,
            id: `farmer-${Date.now().toString().slice(-4)}`,
            farmerId: `FARMER-MH-${Math.floor(100 + Math.random() * 900)}`,
            createdAt: Date.now()
        };
        const list = StorageService.get(STORAGE_KEYS.FARMERS, []);
        list.unshift(newFarmer);
        StorageService.set(STORAGE_KEYS.FARMERS, list);
        return newFarmer;
    },

    async verifyProduct(id, status, reason = '') {
        const data = await this.request(`/api/products/${id}/verification`, {
            method: 'PATCH',
            body: JSON.stringify({ status, rejectionReason: reason })
        });
        return data.product || null;
    },

    // Chats
    async getChats(userId) {
        try {
            const data = await this.request(`/api/chats?userId=${userId}`, { method: 'GET', timeout: 1500 });
            if (data.chats) return data.chats;
        } catch (e) {
            console.warn('API getChats fallback:', e.message);
        }
        const chats = StorageService.get(STORAGE_KEYS.CHATS, []);
        return chats.filter(c => c.farmerId === userId || c.buyerId === userId);
    },

    async createChat(chatData) {
        try {
            const data = await this.request('/api/chats', {
                method: 'POST',
                body: JSON.stringify(chatData)
            });
            if (data.chat) return data.chat;
        } catch (e) {
            console.warn('API createChat fallback:', e.message);
        }
        const chats = StorageService.get(STORAGE_KEYS.CHATS, []);
        const newChat = {
            id: `chat-${Date.now()}`,
            ...chatData,
            messages: []
        };
        chats.unshift(newChat);
        StorageService.set(STORAGE_KEYS.CHATS, chats);
        return newChat;
    },

    async sendChatMessage(chatId, messageData) {
        try {
            const data = await this.request(`/api/chats/${chatId}/messages`, {
                method: 'POST',
                body: JSON.stringify(messageData)
            });
            if (data.message) return data.message;
        } catch (e) {
            console.warn('API sendChatMessage fallback:', e.message);
        }
        const chats = StorageService.get(STORAGE_KEYS.CHATS, []);
        const idx = chats.findIndex(c => c.id === chatId);
        if (idx !== -1) {
            const newMsg = {
                ...messageData,
                timestamp: Date.now()
            };
            chats[idx].messages.push(newMsg);
            StorageService.set(STORAGE_KEYS.CHATS, chats);
            return newMsg;
        }
        return null;
    },

    async verifyProduce(productName, base64Images) {
        return await this.request('/api/verify-produce', {
            method: 'POST',
            body: JSON.stringify({ product: productName, images: base64Images })
        });
    }
};

window.ApiService = ApiService;
window.FarmAPI = ApiService;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ApiService;
}
