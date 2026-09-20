/* ===================================================================
   FARM LINK — PRODUCTS SERVICE & FRESHNESS ESTIMATOR
   =================================================================== */

const ProductService = {
    async getAll(filters = {}) {
        return await ApiService.getProducts(filters);
    },

    async getById(id) {
        const list = await this.getAll();
        return list.find(p => p.id === id) || null;
    },

    async save(productData) {
        if (productData.id && productData.id.startsWith('PRD-')) {
            return await ApiService.updateProduct(productData.id, productData);
        }
        return await ApiService.createProduct(productData);
    },

    async create(productData) {
        return await this.save(productData);
    },

    async delete(id) {
        return await ApiService.deleteProduct(id);
    },

    calculateFreshness(harvestDate, shelfLifeDays = 7) {
        if (!harvestDate) return { score: 85, daysLeft: shelfLifeDays, label: 'Fresh', cssClass: 'freshness-fresh' };
        const harvest = new Date(harvestDate);
        const now = new Date();
        const diffMs = now - harvest;
        const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
        const daysLeft = Math.max(0, shelfLifeDays - diffDays);

        if (daysLeft >= 4) {
            return { score: 95, daysLeft, label: 'Optimal Freshness', cssClass: 'freshness-fresh' };
        } else if (daysLeft >= 2) {
            return { score: 70, daysLeft, label: 'Good · Aging', cssClass: 'freshness-aging' };
        } else {
            return { score: 40, daysLeft, label: 'Sell Immediately', cssClass: 'freshness-warning' };
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductService;
}
