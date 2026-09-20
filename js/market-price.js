/* ===================================================================
   FARM LINK — MARKET PRICE DISCOVERY (AgmarkNet Verified)
   Real Data Only — No Fabricated Values (SIH26132)
   =================================================================== */

const MarketPriceService = {
    async queryPrice(product, location, quantity = 0, expectedPrice = 0) {
        if (!product || !location) {
            throw new Error('Product name and location are required.');
        }

        try {
            const data = await ApiService.getMarketPrice(product, location, quantity, expectedPrice);
            return data;
        } catch (err) {
            console.error('Market price query failed:', err.message);
            return {
                found: false,
                product,
                requestedLocation: location,
                price: { value: null, status: 'unverified' },
                minimumPrice: null,
                modalPrice: null,
                maximumPrice: null,
                nearbyMarkets: [],
                message: 'Live government mandi data is currently unverified or unavailable. Please check your connection and retry.'
            };
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = MarketPriceService;
}
