/* ===================================================================
   FARM LINK — OTP SERVICE (Demo Code: 123456)
   =================================================================== */

const OtpService = {
    DEMO_CODE: '123456',

    generateOtp(phone) {
        return {
            phone,
            code: this.DEMO_CODE,
            expiresAt: Date.now() + 5 * 60 * 1000,
            isDemo: true
        };
    },

    verifyOtp(inputOtp) {
        const cleanOtp = String(inputOtp || '').trim();
        return cleanOtp === this.DEMO_CODE;
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = OtpService;
}
