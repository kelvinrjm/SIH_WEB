/* ===================================================================
   FARM LINK — CART SERVICE (Stock-Validated)
   =================================================================== */

const CartService = {
    getCart() {
        return StorageService.get(STORAGE_KEYS.CART, []);
    },

    saveCart(cart) {
        StorageService.set(STORAGE_KEYS.CART, cart);
        this.updateBadge();
    },

    async addItem(product, quantity = 1) {
        const cart = this.getCart();
        const qtyToAdd = Math.max(1, parseInt(quantity) || 1);

        // Fetch latest product to check real available stock
        const liveProduct = await ProductService.getById(product.id);
        const availableStock = liveProduct ? liveProduct.quantity : (product.quantity || 0);

        const existing = cart.find(item => item.id === product.id);
        const currentInCart = existing ? existing.quantity : 0;

        if (currentInCart + qtyToAdd > availableStock) {
            throw new Error(`Cannot add ${qtyToAdd} ${product.unit || 'kg'}. Only ${availableStock - currentInCart} ${product.unit || 'kg'} remaining in stock.`);
        }

        if (existing) {
            existing.quantity += qtyToAdd;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                unit: product.unit || 'kg',
                image: product.image || (product.images && product.images[0]) || '',
                sellerName: product.sellerName || 'Farmer',
                sellerId: product.sellerId || '',
                sellerPhone: product.sellerPhone || '',
                location: product.location || '',
                quantity: qtyToAdd,
                availableStock
            });
        }

        this.saveCart(cart);
        return cart;
    },

    updateQuantity(productId, newQty) {
        let cart = this.getCart();
        const item = cart.find(i => i.id === productId);
        if (!item) return cart;

        const qty = parseInt(newQty);
        if (isNaN(qty) || qty <= 0) {
            return this.removeItem(productId);
        }

        if (qty > item.availableStock) {
            throw new Error(`Maximum available stock for ${item.name} is ${item.availableStock} ${item.unit}.`);
        }

        item.quantity = qty;
        this.saveCart(cart);
        return cart;
    },

    removeItem(productId) {
        let cart = this.getCart();
        cart = cart.filter(item => item.id !== productId);
        this.saveCart(cart);
        return cart;
    },

    clearCart() {
        this.saveCart([]);
    },

    getTotals(buyerLocation, sellerLocation) {
        const cart = this.getCart();
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        let distanceKm = 120; // fallback default
        if (typeof buyerLocation === 'string' && typeof sellerLocation === 'string') {
            distanceKm = FarmUtils.calculateDistance(buyerLocation, sellerLocation);
        } else if (typeof buyerLocation === 'number') {
            distanceKm = buyerLocation; // backwards compatibility if number passed directly
        }
        
        // Dynamic distance-based transport fee (₹2/km). Minimum fee ₹50.
        const deliveryFee = subtotal === 0 ? 0 : Math.max(50, distanceKm * 2);
        
        const total = subtotal + deliveryFee;
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

        return { subtotal, deliveryFee, total, itemCount, distanceKm };
    },

    updateBadge() {
        const count = this.getCart().reduce((sum, item) => sum + item.quantity, 0);
        document.querySelectorAll('.cart-count-badge').forEach(badge => {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'inline-flex' : 'none';
        });
    }
};

CartService.updateBadge();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CartService;
}
