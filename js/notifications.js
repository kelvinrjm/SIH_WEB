/* ===================================================================
   FARM LINK — NOTIFICATIONS SERVICE
   =================================================================== */

const NotificationService = {
    DEFAULT_NOTIFICATIONS: [
        {
            id: 'notif-1',
            title: 'Order Confirmed',
            message: 'Your order for 20 kg Tomatoes has been confirmed by farmer Ramesh Patel.',
            time: '10 mins ago',
            type: 'order',
            read: false
        },
        {
            id: 'notif-2',
            title: 'Market Price Alert',
            message: 'Nashik Mandi Onion rates increased by +8% today (₹28/kg).',
            time: '2 hours ago',
            type: 'price',
            read: false
        },
        {
            id: 'notif-3',
            title: 'Logistics Pooling Available',
            message: 'Shared freight vehicle heading to Pune APMC tomorrow at 6 AM. Space available.',
            time: '5 hours ago',
            type: 'logistics',
            read: true
        }
    ],

    getAll() {
        return StorageService.get(STORAGE_KEYS.NOTIFICATIONS, this.DEFAULT_NOTIFICATIONS);
    },

    save(list) {
        StorageService.set(STORAGE_KEYS.NOTIFICATIONS, list);
        this.updateBadge();
    },

    add(title, message, type = 'info') {
        const list = this.getAll();
        list.unshift({
            id: `notif-${Date.now()}`,
            title,
            message,
            time: 'Just now',
            type,
            read: false
        });
        this.save(list);
    },

    markAllRead() {
        const list = this.getAll().map(n => ({ ...n, read: true }));
        this.save(list);
    },

    updateBadge() {
        const unreadCount = this.getAll().filter(n => !n.read).length;
        document.querySelectorAll('.notif-dot').forEach(dot => {
            dot.style.display = unreadCount > 0 ? 'block' : 'none';
        });
    }
};

NotificationService.updateBadge();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = NotificationService;
}
