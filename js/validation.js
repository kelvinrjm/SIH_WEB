/* ===================================================================
   FARM LINK — VALIDATION UTILITIES & ROOT-CAUSED IMAGE SNIFFER
   =================================================================== */

const ValidationService = {
    validatePhone(phone) {
        if (!phone) return 'Phone number is required.';
        const cleanPhone = String(phone).replace(/[\s\-\+\(\)]/g, '');
        // Valid 10-digit Indian phone, with or without +91
        const isValid = /^(91)?[6-9]\d{9}$/.test(cleanPhone);
        return isValid ? null : 'Please enter a valid 10-digit Indian mobile number (starts with 6, 7, 8, 9).';
    },

    validateRequired(value, fieldName = 'Field') {
        if (value === undefined || value === null || String(value).trim() === '') {
            return `${fieldName} is required.`;
        }
        return null;
    },

    validateNumeric(value, fieldName = 'Value', min = 0) {
        const num = Number(value);
        if (isNaN(num) || num <= min) {
            return `${fieldName} must be greater than ${min}.`;
        }
        return null;
    },

    /*
     * ROOT CAUSE OF THE JPG UPLOAD BUG:
     * On many mobile browsers / camera captures, file.type arrives empty ("") or as generic
     * "application/octet-stream". If client JS validates purely by `file.type.startsWith('image/')`,
     * or passes empty MIME data:;base64,... into servers with rigid regex `^data:image/...`,
     * valid JPG photos preview via <img> src but fail upload validation.
     * 
     * Solution: We read the file's real magic bytes (FF D8 for JPEG, 89 50 4E 47 for PNG, RIFF...WEBP for WebP)
     * as primary authority, falling back to extension inspection.
     */
    async sniffFileHeader(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = (e) => {
                if (!e.target || !e.target.result) {
                    return resolve({ valid: false, mime: null });
                }
                const arr = new Uint8Array(e.target.result);
                if (arr.length < 4) return resolve({ valid: false, mime: null });

                // JPEG check: 0xFF, 0xD8
                if (arr[0] === 0xFF && arr[1] === 0xD8) {
                    return resolve({ valid: true, mime: 'image/jpeg' });
                }
                // PNG check: 0x89, 0x50, 0x4E, 0x47
                if (arr[0] === 0x89 && arr[1] === 0x50 && arr[2] === 0x4E && arr[3] === 0x47) {
                    return resolve({ valid: true, mime: 'image/png' });
                }
                // WebP check: RIFF....WEBP
                if (arr.length >= 12) {
                    const header = String.fromCharCode(...arr.slice(0, 4));
                    const format = String.fromCharCode(...arr.slice(8, 12));
                    if (header === 'RIFF' && format === 'WEBP') {
                        return resolve({ valid: true, mime: 'image/webp' });
                    }
                }
                // Check for HEIC (ISO-BMFF with 'ftyp')
                if (arr.length >= 12) {
                    const brand = String.fromCharCode(...arr.slice(4, 8));
                    if (brand === 'ftyp') {
                        return resolve({ valid: false, isHeic: true, error: 'HEIC/HEIF images are not supported. Please use JPG, PNG, or WebP.' });
                    }
                }

                // Fallback to extension check if magic bytes are obscured
                const name = (file.name || '').toLowerCase();
                if (/\.(jpe?g)$/i.test(name)) return resolve({ valid: true, mime: 'image/jpeg' });
                if (/\.(png)$/i.test(name)) return resolve({ valid: true, mime: 'image/png' });
                if (/\.(webp)$/i.test(name)) return resolve({ valid: true, mime: 'image/webp' });

                return resolve({ valid: false, error: 'File must be a valid PNG, JPEG, or WebP image.' });
            };
            reader.onerror = () => resolve({ valid: false, error: 'Could not read file.' });
            reader.readAsArrayBuffer(file.slice(0, 16));
        });
    },

    async validateImageFile(file) {
        if (!file) return { valid: false, error: 'No file provided.' };
        if (file.size > CONFIG.MAX_IMAGE_SIZE_BYTES) {
            return { valid: false, error: 'Image size exceeds 2MB limit.' };
        }
        const sniff = await this.sniffFileHeader(file);
        if (!sniff.valid) {
            return { valid: false, error: sniff.error || 'Each image must be a valid PNG, JPEG, or WebP image.' };
        }
        return { valid: true, mime: sniff.mime };
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ValidationService;
}
