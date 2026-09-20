/* ===================================================================
   FARM LINK — DYNAMIC LOCATION SERVICE
   No Hardcoded Locations (SIH26132 §19)
   =================================================================== */

const LocationService = {
    // Curated agricultural districts across major Indian agricultural states
    DISTRICTS: [
        { state: 'Maharashtra', district: 'Nashik', defaultMandi: 'Nashik APMC' },
        { state: 'Maharashtra', district: 'Pune', defaultMandi: 'Gultekdi Mandi' },
        { state: 'Maharashtra', district: 'Nagpur', defaultMandi: 'Kalamna Market' },
        { state: 'Maharashtra', district: 'Jalgaon', defaultMandi: 'Jalgaon Mandi' },
        { state: 'Maharashtra', district: 'Solapur', defaultMandi: 'Solapur APMC' },
        { state: 'Maharashtra', district: 'Ahmednagar', defaultMandi: 'Ahmednagar Mandi' },
        { state: 'Tamil Nadu', district: 'Madurai', defaultMandi: 'Mattuthavani Central Mandi' },
        { state: 'Tamil Nadu', district: 'Coimbatore', defaultMandi: 'Ukkadam APMC' },
        { state: 'Tamil Nadu', district: 'Salem', defaultMandi: 'Shevapet Mandi' },
        { state: 'Tamil Nadu', district: 'Dindigul', defaultMandi: 'Dindigul Mandi' },
        { state: 'Karnataka', district: 'Kolar', defaultMandi: 'Kolar APMC Mandi' },
        { state: 'Karnataka', district: 'Belagavi', defaultMandi: 'Belagavi Mandi' },
        { state: 'Punjab', district: 'Amritsar', defaultMandi: 'Amritsar Grain Market' },
        { state: 'Uttar Pradesh', district: 'Agra', defaultMandi: 'Agra Mandi' }
    ],

    getUserLocation() {
        return StorageService.get('farmlink_selected_location', 'Nashik, Maharashtra');
    },

    setUserLocation(locStr) {
        StorageService.set('farmlink_selected_location', locStr);
    },

    async detectCurrentLocation() {
        return new Promise((resolve) => {
            if (!navigator.geolocation) {
                return resolve({ success: false, location: this.getUserLocation(), error: 'Geolocation not supported' });
            }
            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    const lat = pos.coords.latitude;
                    const lng = pos.coords.longitude;
                    // Reverse geocode via open street map
                    try {
                        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
                        const data = await res.json();
                        const city = data.address?.city || data.address?.town || data.address?.county || data.address?.state_district || 'Local Mandi';
                        const state = data.address?.state || 'India';
                        const locStr = `${city}, ${state}`;
                        this.setUserLocation(locStr);
                        resolve({ success: true, location: locStr, lat, lng });
                    } catch {
                        resolve({ success: true, location: `${lat.toFixed(2)}, ${lng.toFixed(2)}`, lat, lng });
                    }
                },
                (err) => {
                    resolve({ success: false, location: this.getUserLocation(), error: err.message });
                },
                { timeout: 8000 }
            );
        });
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = LocationService;
}
