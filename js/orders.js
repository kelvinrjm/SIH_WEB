/* ===================================================================
   FARM LINK — CANONICAL ORDER STATE MACHINE
   ORDER PLACED → CONFIRMED → PREPARING → OUT FOR DELIVERY → DELIVERED
   =================================================================== */

const ORDER_STATUSES = {
    PLACED: 'ORDER PLACED',
    CONFIRMED: 'CONFIRMED',
    PREPARING: 'PREPARING',
    OUT_FOR_DELIVERY: 'OUT FOR DELIVERY',
    DELIVERED: 'DELIVERED',
    CANCELLED: 'CANCELLED'
};

const RETURN_STATUSES = {
    REQUESTED: 'REQUESTED',
    UNDER_REVIEW: 'UNDER REVIEW',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED'
};

const REFUND_STATUSES = {
    PENDING: 'PENDING',
    PROCESSING: 'PROCESSING',
    REFUNDED: 'REFUNDED'
};

const OrderService = {
    STATUSES: ORDER_STATUSES,
    RETURN_STATUSES: RETURN_STATUSES,
    REFUND_STATUSES: REFUND_STATUSES,

    async getAll(filters = {}) {
        return await ApiService.getOrders(filters);
    },

    async getById(id) {
        const orders = await this.getAll();
        return orders.find(o => o.id === id) || null;
    },

    async create(orderPayload) {
        return await ApiService.createOrder(orderPayload);
    },

    async updateStatus(orderId, nextStatus, note = '') {
        return await ApiService.updateOrderStatus(orderId, nextStatus, note);
    },

    async requestReturn(orderId, reason, description) {
        const order = await this.getById(orderId);
        if (!order) throw new Error("Order not found");
        if (order.status !== ORDER_STATUSES.DELIVERED) throw new Error("Only delivered orders can be returned.");
        if (order.returnStatus) throw new Error("Return request already exists for this order.");

        const returnPayload = {
            returnStatus: RETURN_STATUSES.REQUESTED,
            refundStatus: REFUND_STATUSES.PENDING,
            returnDetails: {
                reason: reason,
                description: description,
                requestedAt: new Date().toISOString()
            }
        };

        // Leverage ApiService to partially update the order
        // Note: FarmLink's ApiService.updateOrderStatus can be extended or we can just fetch and update.
        // Let's implement an update directly on StorageService if ApiService doesn't have a direct generic update method.
        // I will check if ApiService has an update method.
        // For now, let's use the local storage fallback logic commonly used in this project if the real API isn't handling it.
        let orders = StorageService.getItem('orders', []);
        const idx = orders.findIndex(o => o.id === orderId);
        if (idx !== -1) {
            orders[idx] = { ...orders[idx], ...returnPayload };
            StorageService.setItem('orders', orders);
            return orders[idx];
        }
        return null;
    },

    async updateReturnStatus(orderId, returnStatus, refundStatus) {
        let orders = StorageService.getItem('orders', []);
        const idx = orders.findIndex(o => o.id === orderId);
        if (idx !== -1) {
            if (returnStatus) orders[idx].returnStatus = returnStatus;
            if (refundStatus) orders[idx].refundStatus = refundStatus;
            StorageService.setItem('orders', orders);
            return orders[idx];
        }
        return null;
    },

    getNextAllowedStatuses(currentStatus) {
        switch (currentStatus) {
            case ORDER_STATUSES.PLACED:
                return [ORDER_STATUSES.CONFIRMED, ORDER_STATUSES.CANCELLED];
            case ORDER_STATUSES.CONFIRMED:
                return [ORDER_STATUSES.PREPARING, ORDER_STATUSES.CANCELLED];
            case ORDER_STATUSES.PREPARING:
                return [ORDER_STATUSES.OUT_FOR_DELIVERY, ORDER_STATUSES.CANCELLED];
            case ORDER_STATUSES.OUT_FOR_DELIVERY:
                return [ORDER_STATUSES.DELIVERED];
            default:
                return [];
        }
    },

    getStatusStepIndex(status) {
        const sequence = [
            ORDER_STATUSES.PLACED,
            ORDER_STATUSES.CONFIRMED,
            ORDER_STATUSES.PREPARING,
            ORDER_STATUSES.OUT_FOR_DELIVERY,
            ORDER_STATUSES.DELIVERED
        ];
        return sequence.indexOf(status);
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { OrderService, ORDER_STATUSES, RETURN_STATUSES, REFUND_STATUSES };
}
