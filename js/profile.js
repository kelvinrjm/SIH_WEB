/* ===================================================================
   FARM LINK — PROFILE & ADDRESS SERVICE
   =================================================================== */

const ProfileService = {
    getAddresses() {
        return StorageService.get(STORAGE_KEYS.ADDRESSES, SEED_ADDRESSES);
    },

    saveAddresses(list) {
        StorageService.set(STORAGE_KEYS.ADDRESSES, list);
    },

    addAddress(addr) {
        const list = this.getAddresses();
        const newAddr = {
            ...addr,
            id: `addr-${Date.now()}`,
            isDefault: list.length === 0 || Boolean(addr.isDefault)
        };
        if (newAddr.isDefault) {
            list.forEach(a => a.isDefault = false);
        }
        list.push(newAddr);
        this.saveAddresses(list);
        return newAddr;
    },

    updateAddress(id, addr) {
        const list = this.getAddresses();
        const idx = list.findIndex(a => a.id === id);
        if (idx !== -1) {
            if (addr.isDefault) {
                list.forEach(a => a.isDefault = false);
            }
            list[idx] = { ...list[idx], ...addr };
            this.saveAddresses(list);
            return list[idx];
        }
        return null;
    },

    deleteAddress(id) {
        let list = this.getAddresses();
        list = list.filter(a => a.id !== id);
        if (list.length > 0 && !list.some(a => a.isDefault)) {
            list[0].isDefault = true;
        }
        this.saveAddresses(list);
    },

    getDefaultAddress() {
        const list = this.getAddresses();
        return list.find(a => a.isDefault) || list[0] || null;
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProfileService;
}
