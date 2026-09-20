/* ===================================================================
   FARM LINK — APPLICATION CONFIGURATION (SIH26132)
   =================================================================== */

const CONFIG = {
    APP_NAME: 'FarmLink',
    VERSION: '2.0-hardened',
    API_BASE: 'http://localhost:5000',
    TIMEOUT_MS: 15000,
    DEMO_OTP: '123456',
    MAX_IMAGE_SIZE_BYTES: 2 * 1024 * 1024, // 2MB
    MAX_IMAGES_PER_PRODUCT: 6,
    SUPPORTED_LANGUAGES: ['en', 'ta', 'hi'],
    DEFAULT_LANGUAGE: 'en'
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
