/* ===================================================================
   FARM LINK — CANONICAL LOCAL STORAGE LAYER
   Provides reliable persistence & seed data (SIH26132)
   =================================================================== */

const STORAGE_KEYS = {
    USER: 'farmlink_user',
    USERS: 'farmlink_users_v2',
    PRODUCTS: 'farmlink_products_v2',
    CART: 'farmlink_cart_v2',
    ORDERS: 'farmlink_orders_v2',
    REQUESTS: 'farmlink_requests_v2',
    ADDRESSES: 'farmlink_addresses_v2',
    FAVORITES: 'farmlink_favorites_v2',
    NOTIFICATIONS: 'farmlink_notifications_v2',
    SETTINGS: 'farmlink_settings_v2',
    FARMERS: 'farmlink_farmers_v2',
    CHATS: 'farmlink_chats_v2'
};

const SEED_USERS = [
    {
        id: 'usr-farmer-1',
        name: 'Ramesh Patel',
        phone: '9876543210',
        district: 'Nashik',
        state: 'Maharashtra',
        password: 'farmer123',
        role: 'farmer',
        createdAt: Date.now() - 3600000 * 240,
        verified: true
    },
    {
        id: 'usr-buyer-1',
        name: 'Priya Sharma',
        phone: '9876501234',
        district: 'Thane',
        state: 'Maharashtra',
        password: 'buyer123',
        role: 'buyer',
        createdAt: Date.now() - 3600000 * 120,
        verified: true
    },
    {
        id: 'usr-officer-1',
        name: 'Sanjay Deshmukh',
        phone: '9876599999',
        officerId: 'FO-MH-2026-08',
        district: 'Nashik',
        state: 'Maharashtra',
        password: 'officer123',
        role: 'field_officer',
        assignedZone: 'Nashik & Dindori Division',
        createdAt: Date.now() - 3600000 * 300,
        verified: true
    }
];

const SEED_PRODUCTS = [
    {
        id: 'PRD-1001',
        sellerId: 'farmer-1',
        sellerName: 'Ramesh Patel',
        sellerPhone: '9876543210',
        name: 'Tomato',
        category: 'vegetable',
        price: 25,
        quantity: 500,
        unit: 'kg',
        images: ['https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=600&auto=format&fit=crop&q=80'],
        image: 'https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=600&auto=format&fit=crop&q=80',
        location: 'Nashik, Maharashtra',
        latitude: 19.9975,
        longitude: 73.7898,
        grade: 'Grade A',
        harvestDate: '2026-09-01',
        expiryDate: '2026-09-15',
        description: 'Fresh farm-harvested red tomatoes, sorted and graded. Excellent shelf life and firmness.',
        status: 'AVAILABLE',
        listingSource: 'DIRECT_FARMER',
        verificationStatus: 'NOT_REQUIRED',
        freshnessScore: 94,
        estimatedShelfLifeDays: 8,
        createdAt: Date.now() - 3600000 * 24
    },
    {
        id: 'PRD-1002',
        sellerId: 'farmer-1',
        sellerName: 'Ramesh Patel',
        sellerPhone: '9876543210',
        name: 'Onion',
        category: 'vegetable',
        price: 28,
        quantity: 800,
        unit: 'kg',
        images: ['https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80'],
        image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80',
        location: 'Lasalgaon, Maharashtra',
        latitude: 20.1472,
        longitude: 74.2256,
        grade: 'Grade A',
        harvestDate: '2026-08-28',
        expiryDate: '2026-10-15',
        description: 'Quality medium-size red onions with dry outer skin. Long storage life.',
        status: 'AVAILABLE',
        listingSource: 'FIELD_OFFICER',
        fieldOfficerId: 'usr-officer-1',
        fieldOfficerName: 'Sanjay Deshmukh',
        verificationStatus: 'VERIFIED',
        verifiedBy: 'FO-MH-2026-08',
        verifiedAt: Date.now() - 3600000 * 20,
        freshnessScore: 96,
        estimatedShelfLifeDays: 20,
        createdAt: Date.now() - 3600000 * 48
    },
    {
        id: 'PRD-1003',
        sellerId: 'farmer-2',
        sellerName: 'Suresh More',
        sellerPhone: '9822334455',
        name: 'Banana',
        category: 'fruit',
        price: 32,
        quantity: 350,
        unit: 'kg',
        images: ['https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80'],
        image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80',
        location: 'Jalgaon, Maharashtra',
        latitude: 21.0077,
        longitude: 75.5626,
        grade: 'Premium',
        harvestDate: '2026-09-03',
        expiryDate: '2026-09-12',
        description: 'Naturally ripened Grand Naine bananas, sweet flavor and uniform bunch size.',
        status: 'AVAILABLE',
        listingSource: 'FIELD_OFFICER',
        fieldOfficerId: 'usr-officer-1',
        fieldOfficerName: 'Sanjay Deshmukh',
        verificationStatus: 'PENDING',
        freshnessScore: 90,
        estimatedShelfLifeDays: 6,
        createdAt: Date.now() - 3600000 * 12
    },
    {
        id: 'PRD-1004',
        sellerId: 'farmer-1',
        sellerName: 'Ramesh Patel',
        sellerPhone: '9876543210',
        name: 'Potato',
        category: 'vegetable',
        price: 22,
        quantity: 600,
        unit: 'kg',
        images: ['https://images.unsplash.com/photo-1508313880080-c8bef83b4f3d?w=600&auto=format&fit=crop&q=80'],
        image: 'https://images.unsplash.com/photo-1508313880080-c8bef83b4f3d?w=600&auto=format&fit=crop&q=80',
        location: 'Nashik, Maharashtra',
        latitude: 19.9975,
        longitude: 73.7898,
        grade: 'Grade A',
        harvestDate: '2026-08-30',
        expiryDate: '2026-10-30',
        description: 'Freshly harvested Jyoti variety potatoes. Firm, clean, and ideal for cooking & storage.',
        status: 'AVAILABLE',
        listingSource: 'DIRECT_FARMER',
        verificationStatus: 'VERIFIED',
        freshnessScore: 92,
        estimatedShelfLifeDays: 25,
        createdAt: Date.now() - 3600000 * 36
    },
    {
        id: 'PRD-1005',
        sellerId: 'farmer-1',
        sellerName: 'Ramesh Patel',
        sellerPhone: '9876543210',
        name: 'Green Chili',
        category: 'spice',
        price: 45,
        quantity: 200,
        unit: 'kg',
        images: ['https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&auto=format&fit=crop&q=80'],
        image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&auto=format&fit=crop&q=80',
        location: 'Nashik, Maharashtra',
        latitude: 19.9975,
        longitude: 73.7898,
        grade: 'Grade A',
        harvestDate: '2026-09-04',
        expiryDate: '2026-09-20',
        description: 'Spicy fresh G4 green chilies. Crisp texture and bright green color.',
        status: 'AVAILABLE',
        listingSource: 'DIRECT_FARMER',
        verificationStatus: 'VERIFIED',
        freshnessScore: 98,
        estimatedShelfLifeDays: 14,
        createdAt: Date.now() - 3600000 * 6
    },
    {
        id: 'PRD-1006',
        sellerId: 'farmer-1',
        sellerName: 'Ramesh Patel',
        sellerPhone: '9876543210',
        name: 'Pomegranate',
        category: 'fruit',
        price: 120,
        quantity: 300,
        unit: 'kg',
        images: ['https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80'],
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80',
        location: 'Nashik, Maharashtra',
        latitude: 19.9975,
        longitude: 73.7898,
        grade: 'Export Grade',
        harvestDate: '2026-09-02',
        expiryDate: '2026-10-02',
        description: 'Bhagwa variety pomegranates with deep red arils, high sweetness and juicy quality.',
        status: 'AVAILABLE',
        listingSource: 'DIRECT_FARMER',
        verificationStatus: 'VERIFIED',
        freshnessScore: 95,
        estimatedShelfLifeDays: 18,
        createdAt: Date.now() - 3600000 * 18
    }
];

const SEED_FARMERS = [
    {
        id: 'farmer-1',
        farmerId: 'FARMER-MH-101',
        name: 'Ramesh Patel',
        phone: '9876543210',
        district: 'Nashik',
        state: 'Maharashtra',
        village: 'Ozar',
        taluka: 'Niphad',
        fieldOfficerId: 'usr-officer-1',
        fieldOfficerName: 'Sanjay Deshmukh',
        landAreaAcres: 4.5,
        primaryCrops: ['Tomato', 'Onion'],
        createdAt: Date.now() - 3600000 * 240
    },
    {
        id: 'farmer-2',
        farmerId: 'FARMER-MH-102',
        name: 'Suresh More',
        phone: '9822334455',
        district: 'Jalgaon',
        state: 'Maharashtra',
        village: 'Raver',
        taluka: 'Raver',
        fieldOfficerId: 'usr-officer-1',
        fieldOfficerName: 'Sanjay Deshmukh',
        landAreaAcres: 6.0,
        primaryCrops: ['Banana'],
        createdAt: Date.now() - 3600000 * 120
    },
    {
        id: 'farmer-3',
        farmerId: 'FARMER-MH-103',
        name: 'Tukaram Shinde',
        phone: '9823112233',
        district: 'Nashik',
        state: 'Maharashtra',
        village: 'Lasalgaon',
        taluka: 'Chandwad',
        fieldOfficerId: 'usr-officer-1',
        fieldOfficerName: 'Sanjay Deshmukh',
        landAreaAcres: 3.2,
        primaryCrops: ['Onion', 'Paddy'],
        createdAt: Date.now() - 3600000 * 48
    }
];

const SEED_ORDERS = [
    {
        id: 'ORD-2026-8801',
        buyerId: 'buyer-1',
        buyerName: 'Rahul Kumar',
        buyerPhone: '9876543210',
        sellerId: 'farmer-1',
        sellerName: 'Ramesh Patel',
        sellerPhone: '9876543210',
        items: [
            { id: 'PRD-1001', name: 'Tomato', price: 25, quantity: 20, unit: 'kg', total: 500 }
        ],
        subtotal: 500,
        deliveryFee: 50,
        total: 550,
        deliveryAddress: {
            label: 'Home',
            text: '123, Green Valley Apartments, Sector 15',
            city: 'Pune',
            state: 'Maharashtra',
            pin: '411001',
            mobile: '9876543210'
        },
        paymentMethod: 'Cash on Delivery (Demo)',
        status: 'CONFIRMED',
        history: [
            { status: 'ORDER PLACED', timestamp: Date.now() - 7200000, note: 'Order placed by buyer' },
            { status: 'CONFIRMED', timestamp: Date.now() - 3600000, note: 'Confirmed by farmer' }
        ],
        createdAt: Date.now() - 7200000,
        updatedAt: Date.now() - 3600000
    }
];

const SEED_ADDRESSES = [
    { id: 'addr-1', label: 'Home', text: '123, Green Valley Apartments, Sector 15', city: 'Pune', state: 'Maharashtra', pin: '411001', mobile: '9876543210', isDefault: true },
    { id: 'addr-2', label: 'Warehouse / Store', text: 'Plot 45, APMC Market Yard, Gultekdi', city: 'Pune', state: 'Maharashtra', pin: '411037', mobile: '9876543210', isDefault: false }
];

const SEED_CHATS = [
    {
        id: 'chat-1001',
        farmerId: 'farmer-1',
        farmerName: 'Ramesh Patel',
        buyerId: 'buyer-1',
        buyerName: 'Priya Sharma',
        productId: 'PRD-1001',
        productName: 'Tomato',
        messages: [
            { senderId: 'buyer-1', text: 'Hi Ramesh, are the tomatoes fresh? I want to buy 20kg.', timestamp: Date.now() - 3600000 * 2 },
            { senderId: 'farmer-1', text: 'Yes Priya, they were harvested today morning. Very fresh.', timestamp: Date.now() - 3600000 * 1.9 }
        ]
    },
    {
        id: 'chat-1002',
        farmerId: 'farmer-1',
        farmerName: 'Ramesh Patel',
        buyerId: 'buyer-2',
        buyerName: 'Amit Singh',
        productId: 'PRD-1002',
        productName: 'Onion',
        messages: [
            { senderId: 'buyer-2', text: 'Can you provide transport for 500kg Onion to Mumbai?', timestamp: Date.now() - 3600000 * 5 },
            { senderId: 'farmer-1', text: 'Yes, transport will cost ₹1500 extra.', timestamp: Date.now() - 3600000 * 4.8 },
            { senderId: 'buyer-2', text: 'Okay, I will place the order.', timestamp: Date.now() - 3600000 * 4.5 }
        ]
    }
];

const StorageService = {
    get(key, fallback = null) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch {
            return fallback;
        }
    },

    set(key, val) {
        try {
            localStorage.setItem(key, JSON.stringify(val));
            return true;
        } catch {
            return false;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch {}
    },

    initSeeds() {
        let users = this.get(STORAGE_KEYS.USERS);
        if (!users || !Array.isArray(users)) {
            this.set(STORAGE_KEYS.USERS, SEED_USERS);
        } else {
            let updated = false;
            for (const su of SEED_USERS) {
                if (!users.some(u => u.id === su.id || (su.officerId && u.officerId === su.officerId))) {
                    users.push(su);
                    updated = true;
                }
            }
            if (updated) this.set(STORAGE_KEYS.USERS, users);
        }

        if (!this.get(STORAGE_KEYS.PRODUCTS)) {
            this.set(STORAGE_KEYS.PRODUCTS, SEED_PRODUCTS);
        }
        if (!this.get(STORAGE_KEYS.ORDERS)) {
            this.set(STORAGE_KEYS.ORDERS, SEED_ORDERS);
        }
        if (!this.get(STORAGE_KEYS.ADDRESSES)) {
            this.set(STORAGE_KEYS.ADDRESSES, SEED_ADDRESSES);
        }
        if (!this.get(STORAGE_KEYS.CART)) {
            this.set(STORAGE_KEYS.CART, []);
        }
        if (!this.get(STORAGE_KEYS.REQUESTS)) {
            this.set(STORAGE_KEYS.REQUESTS, []);
        }
        if (!this.get(STORAGE_KEYS.CHATS)) {
            this.set(STORAGE_KEYS.CHATS, SEED_CHATS);
        }

        let farmers = this.get(STORAGE_KEYS.FARMERS);
        if (!farmers || !Array.isArray(farmers)) {
            this.set(STORAGE_KEYS.FARMERS, SEED_FARMERS);
        } else {
            let updated = false;
            for (const sf of SEED_FARMERS) {
                if (!farmers.some(f => f.id === sf.id)) {
                    farmers.push(sf);
                    updated = true;
                }
            }
            if (updated) this.set(STORAGE_KEYS.FARMERS, farmers);
        }
    }
};

StorageService.initSeeds();

// Global aliases for browser compatibility across all pages
if (typeof window !== 'undefined') {
    window.StorageService = StorageService;
    window.FarmStorage = StorageService;
    window.STORAGE_KEYS = STORAGE_KEYS;
    window.SEED_FARMERS = SEED_FARMERS;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { StorageService, FarmStorage: StorageService, STORAGE_KEYS, SEED_PRODUCTS, SEED_ORDERS, SEED_USERS, SEED_FARMERS, SEED_CHATS };
}
