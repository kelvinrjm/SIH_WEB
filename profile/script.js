/* ========================================
   Buyer Portal – Farmer Market Linkage
   Application State & Logic
   ======================================== */

// ===== Application State =====
const state = {
    buyer: {
        name: 'Rahul Kumar',
        email: 'rahul.kumar@email.com',
        mobile: '+91 98765 43210',
        address: '123, Green Valley Apartments, Sector 15, Noida, UP - 201301',
        accountId: 'BUY-2024-00847',
        memberSince: 'August 2023'
    },
    cart: [
        { id: 1, name: 'Organic Tomatoes', price: 45, qty: 5, img: 'https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=80&h=80&fit=crop' },
        { id: 2, name: 'Fresh Green Spinach', price: 30, qty: 3, img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=80&h=80&fit=crop' },
        { id: 3, name: 'Farm Potatoes', price: 25, qty: 10, img: 'https://images.unsplash.com/photo-1508313880080-c8bef83b4f3d?w=80&h=80&fit=crop' }
    ],
    orders: [
        {
            id: 'ORD-2024-001', productId: 101, name: 'Organic Basmati Rice', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=80&h=80&fit=crop',
            qty: 2, price: 180, total: 360, orderDate: '2024-01-10', deliveryDate: '2024-01-13', deliveryTime: '9:00 AM - 12:00 PM',
            status: 'Delivered', location: 'Delivered to Home', pending: 0
        },
        {
            id: 'ORD-2024-002', productId: 102, name: 'Fresh Wheat Flour', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=80&h=80&fit=crop',
            qty: 1, price: 220, total: 220, orderDate: '2024-01-12', deliveryDate: '2024-01-15', deliveryTime: '2:00 PM - 5:00 PM',
            status: 'Delivered', location: 'Delivered to Home', pending: 0
        },
        {
            id: 'ORD-2024-003', productId: 103, name: 'Farm Fresh Eggs (Dozen)', img: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=80&h=80&fit=crop',
            qty: 3, price: 85, total: 255, orderDate: '2024-01-14', deliveryDate: '2024-01-17', deliveryTime: '10:00 AM - 1:00 PM',
            status: 'Delivered', location: 'Delivered to Office', pending: 0
        },
        {
            id: 'ORD-2024-004', productId: 104, name: 'Organic Mustard Oil', img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=80&h=80&fit=crop',
            qty: 2, price: 310, total: 620, orderDate: '2024-01-15', deliveryDate: '2024-01-18', deliveryTime: '9:00 AM - 12:00 PM',
            status: 'Out for Delivery', location: 'Sector 15 Market, Noida', pending: 1
        },
        {
            id: 'ORD-2024-005', productId: 105, name: 'Fresh Green Peas', img: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=80&h=80&fit=crop',
            qty: 4, price: 55, total: 220, orderDate: '2024-01-16', deliveryDate: '2024-01-19', deliveryTime: '2:00 PM - 5:00 PM',
            status: 'Packed', location: 'Warehouse, Noida', pending: 1
        },
        {
            id: 'ORD-2024-006', productId: 106, name: 'Organic Honey', img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=80&h=80&fit=crop',
            qty: 1, price: 450, total: 450, orderDate: '2024-01-16', deliveryDate: '2024-01-20', deliveryTime: '10:00 AM - 1:00 PM',
            status: 'Confirmed', location: 'Processing', pending: 1
        },
        {
            id: 'ORD-2024-007', productId: 107, name: 'Farm Carrots', img: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=80&h=80&fit=crop',
            qty: 6, price: 35, total: 210, orderDate: '2024-01-17', deliveryDate: '2024-01-21', deliveryTime: '9:00 AM - 12:00 PM',
            status: 'Placed', location: 'Order received', pending: 1
        },
        {
            id: 'ORD-2024-008', productId: 108, name: 'Organic Jaggery', img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=80&h=80&fit=crop',
            qty: 2, price: 120, total: 240, orderDate: '2024-01-17', deliveryDate: '2024-01-21', deliveryTime: '2:00 PM - 5:00 PM',
            status: 'Placed', location: 'Order received', pending: 1
        },
        {
            id: 'ORD-2024-009', productId: 109, name: 'Red Chillies Powder', img: 'https://images.unsplash.com/photo-1599909631715-62f8a6847e80?w=80&h=80&fit=crop',
            qty: 1, price: 95, total: 95, orderDate: '2024-01-08', deliveryDate: '2024-01-11', deliveryTime: '10:00 AM - 1:00 PM',
            status: 'Delivered', location: 'Delivered to Home', pending: 0
        },
        {
            id: 'ORD-2024-010', productId: 110, name: 'Farm Fresh Cauliflower', img: 'https://images.unsplash.com/photo-1567375698348-5d9d5ae474f0?w=80&h=80&fit=crop',
            qty: 2, price: 40, total: 80, orderDate: '2024-01-09', deliveryDate: '2024-01-12', deliveryTime: '9:00 AM - 12:00 PM',
            status: 'Cancelled', location: 'Cancelled', pending: 0
        },
        {
            id: 'ORD-2024-011', productId: 111, name: 'Organic Turmeric Powder', img: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=80&h=80&fit=crop',
            qty: 1, price: 160, total: 160, orderDate: '2024-01-05', deliveryDate: '2024-01-08', deliveryTime: '2:00 PM - 5:00 PM',
            status: 'Delivered', location: 'Delivered to Home', pending: 0
        },
        {
            id: 'ORD-2024-012', productId: 112, name: 'Fresh Green Beans', img: 'https://images.unsplash.com/photo-1574383883978-8db7e582e1d0?w=80&h=80&fit=crop',
            qty: 3, price: 48, total: 144, orderDate: '2024-01-06', deliveryDate: '2024-01-09', deliveryTime: '10:00 AM - 1:00 PM',
            status: 'Delivered', location: 'Delivered to College', pending: 0
        }
    ],
    addresses: [
        { id: 1, label: 'Home', text: '123, Green Valley Apartments, Sector 15', city: 'Noida', state: 'Uttar Pradesh', pin: '201301', mobile: '+91 98765 43210', isDefault: true },
        { id: 2, label: 'Office', text: '456, Tech Park Tower, Block B, Sector 62', city: 'Noida', state: 'Uttar Pradesh', pin: '201309', mobile: '+91 98765 43210', isDefault: false },
        { id: 3, label: 'College', text: 'Amity University Campus, Sector 125', city: 'Noida', state: 'Uttar Pradesh', pin: '201303', mobile: '+91 87654 32109', isDefault: false }
    ],
    payments: [
        { id: 'cod', name: 'Cash on Delivery', desc: 'Pay when your order is delivered', icon: 'fas fa-money-bill-wave', iconClass: 'cod', selected: false },
        { id: 'gpay', name: 'Google Pay (GPay)', desc: 'Pay instantly using UPI', icon: 'fab fa-google-pay', iconClass: 'gpay', selected: true },
        { id: 'paytm', name: 'Paytm', desc: 'Pay using Paytm wallet or UPI', icon: 'fas fa-mobile-alt', iconClass: 'paytm', selected: false }
    ],
    checkoutAddress: null,
    checkoutPayment: null,
    currentFilter: 'all',
    nextAddressId: 4,
    nextOrderId: 13
};

// ===== Utility Functions =====
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const icons = { success: 'fa-check-circle', error: 'fa-times-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas ${icons[type]} toast-icon"></i>
        <span class="toast-msg">${message}</span>
        <button class="toast-close" onclick="this.parentElement.classList.add('removing'); setTimeout(()=>this.parentElement.remove(),300)">
            <i class="fas fa-times"></i>
        </button>
    `;
    container.appendChild(toast);
    setTimeout(() => {
        if (toast.parentElement) {
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 300);
        }
    }, 3500);
}

function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN');
}

function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function getStatusBadgeClass(status) {
    const map = {
        'Placed': 'badge-placed',
        'Confirmed': 'badge-confirmed',
        'Packed': 'badge-packed',
        'Out for Delivery': 'badge-out-for-delivery',
        'Delivered': 'badge-delivered',
        'Cancelled': 'badge-cancelled'
    };
    return map[status] || 'badge-placed';
}

function getLabelIcon(label) {
    const map = { Home: 'fa-home', Office: 'fa-building', College: 'fa-graduation-cap', Other: 'fa-map-pin' };
    return map[label] || 'fa-map-pin';
}

// ===== Navigation =====
function navigateTo(pageName) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + pageName);
    if (target) target.classList.add('active');

    document.querySelectorAll('.nav-item[data-page]').forEach(n => n.classList.remove('active'));
    const navItem = document.querySelector(`.nav-item[data-page="${pageName}"]`);
    if (navItem) navItem.classList.add('active');

    const titles = {
        dashboard: 'Dashboard', orders: 'My Orders', cart: 'Shopping Cart',
        checkout: 'Checkout', profile: 'My Profile', address: 'Address Management',
        payment: 'Payment Methods', billing: 'Bills & Invoices'
    };
    document.getElementById('pageTitle').textContent = titles[pageName] || 'Dashboard';

    closeSidebar();

    switch (pageName) {
        case 'dashboard': renderDashboard(); break;
        case 'orders': renderOrders(); break;
        case 'cart': renderCart(); break;
        case 'profile': renderProfile(); break;
        case 'address': renderAddresses(); break;
        case 'payment': renderPayments(); break;
        case 'billing': renderBilling(); break;
        case 'checkout': renderCheckout(); break;
    }
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('active');
}

// ===== Dashboard =====
function renderDashboard() {
    const orders = state.orders;
    const totalOrders = orders.length;
    const confirmedOrders = orders.filter(o => ['Confirmed', 'Packed', 'Out for Delivery', 'Delivered'].includes(o.status)).length;
    const pendingOrders = orders.filter(o => ['Placed'].includes(o.status)).length;

    const activeOrders = orders.filter(o => !['Delivered', 'Cancelled'].includes(o.status));
    let upcomingText = 'No upcoming delivery';
    if (activeOrders.length > 0) {
        const next = activeOrders.sort((a, b) => new Date(a.deliveryDate) - new Date(b.deliveryDate))[0];
        upcomingText = formatDate(next.deliveryDate) + ', ' + next.deliveryTime.split('-')[0].trim();
    }

    const cartCount = state.cart.reduce((s, c) => s + c.qty, 0);
    const cartValue = state.cart.reduce((s, c) => s + c.price * c.qty, 0);

    document.getElementById('totalOrdersCount').textContent = totalOrders;
    document.getElementById('confirmedOrdersCount').textContent = confirmedOrders;
    document.getElementById('pendingOrdersCount').textContent = pendingOrders;
    document.getElementById('upcomingDelivery').textContent = upcomingText;
    document.getElementById('cartItemCount').textContent = cartCount;
    document.getElementById('cartTotalValue').textContent = formatCurrency(cartValue);

    const recent = [...orders].sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)).slice(0, 5);
    const tbody = document.getElementById('recentOrdersBody');
    tbody.innerHTML = recent.map(o => `
        <tr>
            <td><span class="order-id">${o.id}</span></td>
            <td>
                <div class="product-cell">
                    <img src="${o.img}" alt="${o.name}" class="product-thumb">
                    <span>${o.name}</span>
                </div>
            </td>
            <td>${o.qty}</td>
            <td><strong>${formatCurrency(o.total)}</strong></td>
            <td>${formatDate(o.orderDate)}</td>
            <td><span class="badge ${getStatusBadgeClass(o.status)}">${o.status}</span></td>
        </tr>
    `).join('');
}

// ===== Orders =====
function renderOrders() {
    const filter = state.currentFilter;
    const filtered = filter === 'all' ? state.orders : state.orders.filter(o => o.status === filter);
    const container = document.getElementById('ordersList');

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-box-open"></i>
                <h3>No orders found</h3>
                <p>No orders match the selected filter.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(o => `
        <div class="order-card" data-aos>
            <div class="order-card-header">
                <div>
                    <span class="order-id">${o.id}</span>
                    <span class="order-date" style="margin-left:12px">${formatDate(o.orderDate)}</span>
                </div>
                <span class="badge ${getStatusBadgeClass(o.status)}">${o.status}</span>
            </div>
            <div class="order-card-body">
                <img src="${o.img}" alt="${o.name}" class="product-thumb" style="width:64px;height:64px;">
                <div class="order-product-info">
                    <span class="order-product-name">${o.name}</span>
                    <span class="order-product-meta">Qty: ${o.qty} &times; ${formatCurrency(o.price)}</span>
                    <span class="order-product-meta">Delivery: ${formatDate(o.deliveryDate)} | ${o.deliveryTime}</span>
                </div>
                <div class="order-price-section">
                    <div class="order-price">${formatCurrency(o.total)}</div>
                </div>
            </div>
            <div class="order-card-footer">
                <div class="order-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${o.location}</span>
                    ${o.pending > 0 ? `<span style="margin-left:12px;color:var(--warning)"><i class="fas fa-clock"></i> ${o.pending} pending</span>` : ''}
                </div>
                <div class="btn-group">
                    <button class="btn btn-outline btn-sm" onclick="viewOrderDetail('${o.id}')"><i class="fas fa-eye"></i> Details</button>
                    ${!['Delivered', 'Cancelled'].includes(o.status) ? `
                        <button class="btn btn-secondary btn-sm" onclick="showToast('Edit feature activated for ${o.id}', 'info')"><i class="fas fa-edit"></i> Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="cancelOrder('${o.id}')"><i class="fas fa-times"></i> Cancel</button>
                    ` : ''}
                    ${!['Delivered', 'Cancelled', 'Placed'].includes(o.status) ? `
                        <button class="btn btn-primary btn-sm" onclick="trackOrder('${o.id}')"><i class="fas fa-truck"></i> Track</button>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function viewOrderDetail(orderId) {
    const o = state.orders.find(x => x.id === orderId);
    if (!o) return;

    const body = document.getElementById('orderDetailBody');
    body.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:8px">
            <div>
                <span class="order-id" style="font-size:1.1rem">${o.id}</span>
                <span class="order-date" style="margin-left:10px">${formatDate(o.orderDate)}</span>
            </div>
            <span class="badge ${getStatusBadgeClass(o.status)}">${o.status}</span>
        </div>
        <div style="display:flex;gap:20px;align-items:center;margin-bottom:24px;padding:16px;background:var(--bg);border-radius:var(--radius-sm)">
            <img src="${o.img}" alt="${o.name}" style="width:80px;height:80px;border-radius:var(--radius-sm);object-fit:cover">
            <div>
                <h4 style="font-family:'DM Sans';font-weight:700;font-size:1rem;margin-bottom:4px">${o.name}</h4>
                <p style="font-size:0.88rem;color:var(--text-muted)">Quantity: ${o.qty} &times; ${formatCurrency(o.price)}</p>
                <p style="font-size:1.1rem;font-weight:800;font-family:'Playfair Display';margin-top:6px">${formatCurrency(o.total)}</p>
            </div>
        </div>
        <div class="track-details">
            <div class="track-detail-row"><span class="track-detail-label">Order Date</span><span class="track-detail-value">${formatDate(o.orderDate)}</span></div>
            <div class="track-detail-row"><span class="track-detail-label">Delivery Date</span><span class="track-detail-value">${formatDate(o.deliveryDate)}</span></div>
            <div class="track-detail-row"><span class="track-detail-label">Delivery Time</span><span class="track-detail-value">${o.deliveryTime}</span></div>
            <div class="track-detail-row"><span class="track-detail-label">Current Location</span><span class="track-detail-value">${o.location}</span></div>
            <div class="track-detail-row"><span class="track-detail-label">Pending Items</span><span class="track-detail-value">${o.pending}</span></div>
            <div class="track-detail-row"><span class="track-detail-label">Status</span><span class="track-detail-value">${o.status}</span></div>
        </div>
    `;
    openModal('orderDetailModal');
}

function cancelOrder(orderId) {
    const o = state.orders.find(x => x.id === orderId);
    if (!o) return;
    o.status = 'Cancelled';
    o.location = 'Cancelled';
    o.pending = 0;
    showToast(`Order ${orderId} has been cancelled`, 'warning');
    renderOrders();
    updateCartBadge();
}

function trackOrder(orderId) {
    const o = state.orders.find(x => x.id === orderId);
    if (!o) return;

    const statuses = ['Placed', 'Confirmed', 'Packed', 'Out for Delivery', 'Delivered'];
    const statusIcons = ['fa-clipboard-list', 'fa-check', 'fa-box', 'fa-truck', 'fa-check-double'];
    const currentIdx = statuses.indexOf(o.status);

    const body = document.getElementById('trackOrderBody');
    body.innerHTML = `
        <div style="text-align:center;margin-bottom:8px">
            <span class="order-id">${o.id}</span>
        </div>
        <div class="track-status-steps">
            ${statuses.map((s, i) => `
                <div class="track-step ${i < currentIdx ? 'completed' : ''} ${i === currentIdx ? 'current' : ''}">
                    <div class="track-step-icon"><i class="fas ${statusIcons[i]}"></i></div>
                    <span class="track-step-label">${s}</span>
                </div>
            `).join('')}
        </div>
        <div class="track-details">
            <div class="track-detail-row"><span class="track-detail-label">Current Status</span><span class="track-detail-value">${o.status}</span></div>
            <div class="track-detail-row"><span class="track-detail-label">Current Location</span><span class="track-detail-value">${o.location}</span></div>
            <div class="track-detail-row"><span class="track-detail-label">Expected Delivery</span><span class="track-detail-value">${formatDate(o.deliveryDate)}</span></div>
            <div class="track-detail-row"><span class="track-detail-label">Expected Time</span><span class="track-detail-value">${o.deliveryTime}</span></div>
        </div>
    `;
    openModal('trackOrderModal');
}

// ===== Cart =====
function renderCart() {
    const list = document.getElementById('cartItemsList');
    const emptyEl = document.getElementById('emptyCart');
    const label = document.getElementById('cartItemsLabel');

    if (state.cart.length === 0) {
        list.innerHTML = '';
        emptyEl.style.display = 'block';
        label.textContent = '(0 items)';
        document.getElementById('cartSubtotal').textContent = '₹0';
        document.getElementById('cartDelivery').textContent = '₹0';
        document.getElementById('cartFinalTotal').textContent = '₹0';
        return;
    }

    emptyEl.style.display = 'none';
    const totalQty = state.cart.reduce((s, c) => s + c.qty, 0);
    label.textContent = `(${totalQty} item${totalQty > 1 ? 's' : ''})`;

    list.innerHTML = state.cart.map(item => `
        <div class="cart-item" data-aos>
            <img src="${item.img}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">${formatCurrency(item.price)} per unit</span>
            </div>
            <div class="qty-control">
                <button class="qty-btn" onclick="changeQty(${item.id}, -1)"><i class="fas fa-minus"></i></button>
                <span class="qty-value">${item.qty}</span>
                <button class="qty-btn" onclick="changeQty(${item.id}, 1)"><i class="fas fa-plus"></i></button>
            </div>
            <div class="cart-item-total">
                <div class="cart-item-total-price">${formatCurrency(item.price * item.qty)}</div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})"><i class="fas fa-trash-alt"></i> Remove</button>
            </div>
        </div>
    `).join('');

    updateCartTotals();
}

function changeQty(productId, delta) {
    const item = state.cart.find(c => c.id === productId);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    renderCart();
    updateCartBadge();
}

function removeFromCart(productId) {
    state.cart = state.cart.filter(c => c.id !== productId);
    showToast('Product removed from cart', 'info');
    renderCart();
    updateCartBadge();
}

function updateCartTotals() {
    const subtotal = state.cart.reduce((s, c) => s + c.price * c.qty, 0);
    const delivery = state.cart.length > 0 ? 40 : 0;
    const total = subtotal + delivery;
    document.getElementById('cartSubtotal').textContent = formatCurrency(subtotal);
    document.getElementById('cartDelivery').textContent = formatCurrency(delivery);
    document.getElementById('cartFinalTotal').textContent = formatCurrency(total);
}

function updateCartBadge() {
    const count = state.cart.reduce((s, c) => s + c.qty, 0);
    const badge = document.getElementById('cartBadge');
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline' : 'none';
}

// ===== Checkout =====
function renderCheckout() {
    renderCheckoutAddresses();
    renderCheckoutPayments();
    updateCheckoutSteps(1);
}

function renderCheckoutAddresses() {
    const container = document.getElementById('checkoutAddresses');
    container.innerHTML = state.addresses.map(a => `
        <div class="address-card ${a.isDefault ? 'default' : ''} ${state.checkoutAddress === a.id ? 'selected' : ''}"
             style="border-color:${state.checkoutAddress === a.id ? 'var(--primary)' : a.isDefault ? 'var(--primary)' : 'var(--border-light)'}; cursor:pointer"
             onclick="selectCheckoutAddress(${a.id})">
            <div class="address-label-badge"><i class="fas ${getLabelIcon(a.label)}"></i> ${a.label}</div>
            <div class="address-text">${a.text}</div>
            <div class="address-city-pin">${a.city}, ${a.state} - ${a.pin}</div>
            <div class="address-mobile"><i class="fas fa-phone"></i> ${a.mobile}</div>
        </div>
    `).join('');
}

function selectCheckoutAddress(id) {
    state.checkoutAddress = id;
    renderCheckoutAddresses();
}

function renderCheckoutPayments() {
    const container = document.getElementById('checkoutPayments');
    container.innerHTML = state.payments.map(p => `
        <div class="payment-option ${p.selected ? 'selected' : ''}" onclick="selectCheckoutPayment('${p.id}')">
            <div class="payment-icon ${p.iconClass}"><i class="${p.icon}"></i></div>
            <div class="payment-info">
                <div class="payment-name">${p.name}</div>
                <div class="payment-desc">${p.desc}</div>
            </div>
            <div class="payment-check"><i class="fas fa-check"></i></div>
        </div>
    `).join('');
}

function selectCheckoutPayment(id) {
    state.payments.forEach(p => p.selected = p.id === id);
    state.checkoutPayment = id;
    renderCheckoutPayments();
}

function updateCheckoutSteps(step) {
    document.querySelectorAll('.checkout-step-content').forEach(el => el.classList.remove('active'));
    document.getElementById('checkoutStep' + step).classList.add('active');

    document.querySelectorAll('.checkout-steps .step').forEach(s => {
        const sNum = parseInt(s.dataset.step);
        s.classList.remove('active', 'done');
        if (sNum === step) s.classList.add('active');
        if (sNum < step) s.classList.add('done');
    });

    document.querySelectorAll('.checkout-steps .step-line').forEach((line, i) => {
        line.classList.toggle('active', i < step - 1);
    });

    if (step === 3) {
        const addr = state.addresses.find(a => a.id === state.checkoutAddress);
        const pay = state.payments.find(p => p.id === state.checkoutPayment);
        const subtotal = state.cart.reduce((s, c) => s + c.price * c.qty, 0);
        const delivery = 40;
        const total = subtotal + delivery;

        document.getElementById('confirmDetails').innerHTML = `
            <h4 style="font-family:'DM Sans';font-weight:700;margin-bottom:16px">Order Items</h4>
            ${state.cart.map(c => `
                <div class="confirm-row">
                    <span class="confirm-label">${c.name} &times; ${c.qty}</span>
                    <span class="confirm-value">${formatCurrency(c.price * c.qty)}</span>
                </div>
            `).join('')}
            <div class="confirm-row"><span class="confirm-label">Subtotal</span><span class="confirm-value">${formatCurrency(subtotal)}</span></div>
            <div class="confirm-row"><span class="confirm-label">Delivery Charges</span><span class="confirm-value">${formatCurrency(delivery)}</span></div>
            <div class="confirm-row" style="border-top:2px solid var(--text);font-weight:800;font-size:1.05rem"><span>Total</span><span>${formatCurrency(total)}</span></div>
            <h4 style="font-family:'DM Sans';font-weight:700;margin:20px 0 12px">Delivery Address</h4>
            <div class="confirm-row"><span class="confirm-label">${addr ? addr.label : 'N/A'}</span><span class="confirm-value">${addr ? addr.text + ', ' + addr.city : 'N/A'}</span></div>
            <h4 style="font-family:'DM Sans';font-weight:700;margin:20px 0 12px">Payment Method</h4>
            <div class="confirm-row"><span class="confirm-label">Method</span><span class="confirm-value">${pay ? pay.name : 'N/A'}</span></div>
        `;
    }
}

function placeOrder() {
    if (!state.checkoutAddress) { showToast('Please select a delivery address', 'error'); return; }
    if (!state.checkoutPayment) { showToast('Please select a payment method', 'error'); return; }

    const addr = state.addresses.find(a => a.id === state.checkoutAddress);
    const pay = state.payments.find(p => p.id === state.checkoutPayment);
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);

    state.cart.forEach(item => {
        state.orders.unshift({
            id: 'ORD-2024-' + String(state.nextOrderId++).padStart(3, '0'),
            productId: item.id + 200,
            name: item.name,
            img: item.img,
            qty: item.qty,
            price: item.price,
            total: item.price * item.qty,
            orderDate: new Date().toISOString().split('T')[0],
            deliveryDate: deliveryDate.toISOString().split('T')[0],
            deliveryTime: '9:00 AM - 12:00 PM',
            status: 'Placed',
            location: 'Order received',
            pending: 1
        });
    });

    state.cart = [];
    state.checkoutAddress = null;
    state.checkoutPayment = null;
    updateCartBadge();

    showToast('Order placed successfully! You will receive a confirmation soon.', 'success');

    setTimeout(() => navigateTo('orders'), 800);
}

// ===== Profile =====
function renderProfile() {
    const b = state.buyer;
    const totalSpent = state.orders.filter(o => o.status === 'Delivered').reduce((s, o) => s + o.total, 0);
    document.getElementById('profileName').textContent = b.name;
    document.getElementById('profileFullName').textContent = b.name;
    document.getElementById('profileEmail').textContent = b.email;
    document.getElementById('profileMobile').textContent = b.mobile;
    document.getElementById('profileAddress').textContent = b.address;
    document.getElementById('profileTotalOrders').textContent = state.orders.length;
    document.getElementById('profileTotalSpent').textContent = formatCurrency(totalSpent);
}

// ===== Address Management =====
function renderAddresses() {
    const grid = document.getElementById('addressGrid');
    grid.innerHTML = state.addresses.map(a => `
        <div class="address-card ${a.isDefault ? 'default' : ''}" data-aos>
            <div class="address-label-badge"><i class="fas ${getLabelIcon(a.label)}"></i> ${a.label}</div>
            <div class="address-text">${a.text}</div>
            <div class="address-city-pin">${a.city}, ${a.state} - ${a.pin}</div>
            <div class="address-mobile"><i class="fas fa-phone"></i> ${a.mobile}</div>
            <div class="address-actions">
                <button class="btn btn-secondary btn-sm" onclick="editAddress(${a.id})"><i class="fas fa-edit"></i> Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteAddress(${a.id})"><i class="fas fa-trash"></i> Delete</button>
                ${!a.isDefault ? `<button class="btn btn-outline btn-sm" onclick="setDefaultAddress(${a.id})"><i class="fas fa-star"></i> Set Default</button>` : ''}
            </div>
        </div>
    `).join('');
}

function openAddressForm(editId = null) {
    const form = document.getElementById('addressForm');
    form.reset();
    document.getElementById('addressEditId').value = '';
    document.getElementById('addressFormTitle').textContent = 'Add New Address';

    if (editId) {
        const a = state.addresses.find(x => x.id === editId);
        if (a) {
            document.getElementById('addressFormTitle').textContent = 'Edit Address';
            document.getElementById('addressEditId').value = a.id;
            document.getElementById('addressLabel').value = a.label;
            document.getElementById('addressText').value = a.text;
            document.getElementById('addressCity').value = a.city;
            document.getElementById('addressState').value = a.state;
            document.getElementById('addressPin').value = a.pin;
            document.getElementById('addressMobile').value = a.mobile;
            document.getElementById('addressDefault').checked = a.isDefault;
        }
    }
    openModal('addressFormModal');
}

function saveAddress(e) {
    e.preventDefault();
    const editId = parseInt(document.getElementById('addressEditId').value);
    const data = {
        label: document.getElementById('addressLabel').value,
        text: document.getElementById('addressText').value,
        city: document.getElementById('addressCity').value,
        state: document.getElementById('addressState').value,
        pin: document.getElementById('addressPin').value,
        mobile: document.getElementById('addressMobile').value,
        isDefault: document.getElementById('addressDefault').checked
    };

    if (data.isDefault) {
        state.addresses.forEach(a => a.isDefault = false);
    }

    if (editId) {
        const addr = state.addresses.find(a => a.id === editId);
        if (addr) Object.assign(addr, data);
        showToast('Address updated successfully', 'success');
    } else {
        data.id = state.nextAddressId++;
        if (state.addresses.length === 0) data.isDefault = true;
        state.addresses.push(data);
        showToast('New address added successfully', 'success');
    }

    closeModal('addressFormModal');
    renderAddresses();
}

function editAddress(id) { openAddressForm(id); }

function deleteAddress(id) {
    if (state.addresses.length <= 1) {
        showToast('You must have at least one address', 'error');
        return;
    }
    const addr = state.addresses.find(a => a.id === id);
    state.addresses = state.addresses.filter(a => a.id !== id);
    if (addr && addr.isDefault && state.addresses.length > 0) {
        state.addresses[0].isDefault = true;
    }
    showToast('Address deleted', 'info');
    renderAddresses();
}

function setDefaultAddress(id) {
    state.addresses.forEach(a => a.isDefault = (a.id === id));
    showToast('Default address updated', 'success');
    renderAddresses();
}

// ===== Payment Methods =====
function renderPayments() {
    const grid = document.getElementById('paymentGrid');
    grid.innerHTML = state.payments.map(p => `
        <div class="payment-option ${p.selected ? 'selected' : ''}" onclick="selectPayment('${p.id}')">
            <div class="payment-icon ${p.iconClass}"><i class="${p.icon}"></i></div>
            <div class="payment-info">
                <div class="payment-name">${p.name}</div>
                <div class="payment-desc">${p.desc}</div>
            </div>
            <div class="payment-check"><i class="fas fa-check"></i></div>
            ${p.selected ? '<span style="margin-left:auto;font-size:0.75rem;font-weight:700;color:var(--primary)">Selected</span>' : ''}
        </div>
    `).join('');
}

function selectPayment(id) {
    state.payments.forEach(p => p.selected = (p.id === id));
    showToast(`Payment method set to ${state.payments.find(p => p.id === id).name}`, 'success');
    renderPayments();
}

// ===== Billing =====
function renderBilling() {
    const billableOrders = state.orders.filter(o => ['Delivered', 'Confirmed', 'Packed'].includes(o.status));
    const container = document.getElementById('billingList');

    if (billableOrders.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-file-invoice"></i>
                <h3>No bills available</h3>
                <p>Bills will appear here for confirmed and delivered orders.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = billableOrders.map(o => `
        <div class="billing-item" data-aos>
            <div class="billing-info">
                <span class="billing-order-id">${o.id}</span>
                <span class="billing-date">${formatDate(o.orderDate)} &mdash; ${o.name} &times; ${o.qty}</span>
            </div>
            <span class="badge ${getStatusBadgeClass(o.status)}">${o.status}</span>
            <span class="billing-amount">${formatCurrency(o.total)}</span>
            <button class="btn btn-primary btn-sm" onclick="viewBill('${o.id}')"><i class="fas fa-file-alt"></i> View Bill</button>
        </div>
    `).join('');
}

function viewBill(orderId) {
    const o = state.orders.find(x => x.id === orderId);
    if (!o) return;

    const pay = state.payments.find(p => p.selected) || state.payments[0];
    const addr = state.addresses.find(a => a.isDefault) || state.addresses[0];
    const delivery = 40;
    const total = o.total + delivery;

    const body = document.getElementById('viewBillBody');
    body.innerHTML = `
        <div class="invoice" id="invoiceContent">
            <div class="invoice-header">
                <div class="invoice-brand">
                    <div class="invoice-brand-icon"><i class="fas fa-seedling"></i></div>
                    <div>
                        <h3>FarmLink</h3>
                        <span>Farmer Market Linkage & Price Discovery</span>
                    </div>
                </div>
                <div class="invoice-title">
                    <h2>INVOICE</h2>
                    <p>${formatDate(o.orderDate)}</p>
                </div>
            </div>
            <div class="invoice-body">
                <div class="invoice-parties">
                    <div class="invoice-party">
                        <h4>Bill To</h4>
                        <p><strong>${state.buyer.name}</strong><br>
                        ${addr ? addr.text + '<br>' + addr.city + ', ' + addr.state + ' - ' + addr.pin : state.buyer.address}<br>
                        ${state.buyer.mobile}<br>
                        ${state.buyer.email}</p>
                    </div>
                    <div class="invoice-party" style="text-align:right">
                        <h4>Order Details</h4>
                        <p><strong>${o.id}</strong><br>
                        Order Date: ${formatDate(o.orderDate)}<br>
                        Delivery Date: ${formatDate(o.deliveryDate)}<br>
                        Status: ${o.status}</p>
                    </div>
                </div>
                <table class="invoice-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th class="text-right">Qty</th>
                            <th class="text-right">Price</th>
                            <th class="text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>${o.name}</td>
                            <td class="text-right">${o.qty}</td>
                            <td class="text-right">${formatCurrency(o.price)}</td>
                            <td class="text-right">${formatCurrency(o.total)}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="invoice-totals">
                    <div class="invoice-totals-table">
                        <div class="row"><span>Subtotal</span><span>${formatCurrency(o.total)}</span></div>
                        <div class="row"><span>Delivery Charges</span><span>${formatCurrency(delivery)}</span></div>
                        <div class="row total"><span>Total Amount</span><span>${formatCurrency(total)}</span></div>
                    </div>
                </div>
            </div>
            <div class="invoice-footer">
                <span>Payment Method: ${pay.name}</span>
                <span>Thank you for supporting local farmers!</span>
            </div>
        </div>
    `;
    openModal('viewBillModal');
}

function printBill() {
    const content = document.getElementById('invoiceContent').innerHTML;
    const win = window.open('', '_blank');
    win.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Invoice - FarmLink</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
            <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet">
            <style>
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { font-family: 'DM Sans', sans-serif; padding: 20px; color: #1A1A1A; }
                h1,h2,h3,h4 { font-family: 'Playfair Display', serif; }
                .invoice { border: 1px solid #E5E0D8; border-radius: 12px; overflow: hidden; }
                .invoice-header { background: #1B4332; color: #fff; padding: 28px 32px; display: flex; align-items: center; justify-content: space-between; }
                .invoice-brand { display: flex; align-items: center; gap: 12px; }
                .invoice-brand-icon { width: 42px; height: 42px; background: #D4890A; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; }
                .invoice-brand h3 { font-size: 1.15rem; font-weight: 800; }
                .invoice-brand span { font-size: 0.72rem; opacity: 0.7; }
                .invoice-title { text-align: right; }
                .invoice-title h2 { font-size: 1.5rem; }
                .invoice-title p { font-size: 0.82rem; opacity: 0.7; }
                .invoice-body { padding: 28px 32px; }
                .invoice-parties { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-bottom: 28px; }
                .invoice-party h4 { font-size: 0.78rem; text-transform: uppercase; letter-spacing: 1px; color: #8A8A8A; margin-bottom: 8px; font-family: 'DM Sans', sans-serif; font-weight: 600; }
                .invoice-party p { font-size: 0.9rem; color: #4A4A4A; line-height: 1.6; }
                .invoice-table { width: 100%; margin-bottom: 24px; font-size: 0.88rem; border-collapse: collapse; }
                .invoice-table th { background: #FAF7F2; padding: 12px 16px; text-align: left; font-weight: 600; color: #8A8A8A; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.5px; }
                .invoice-table td { padding: 12px 16px; border-bottom: 1px solid #F0EBE3; }
                .text-right { text-align: right; }
                .invoice-totals { display: flex; justify-content: flex-end; }
                .invoice-totals-table { width: 280px; }
                .invoice-totals-table .row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 0.9rem; color: #4A4A4A; }
                .invoice-totals-table .row.total { border-top: 2px solid #1A1A1A; padding-top: 14px; font-weight: 800; font-size: 1.1rem; color: #1A1A1A; font-family: 'Playfair Display', serif; }
                .invoice-footer { padding: 16px 32px; background: #FAF7F2; display: flex; justify-content: space-between; align-items: center; font-size: 0.82rem; color: #8A8A8A; }
                @media print { body { padding: 0; } }
            </style>
        </head>
        <body>${content}</body>
        </html>
    `);
    win.document.close();
    setTimeout(() => { win.print(); }, 500);
}

function downloadBill() {
    printBill();
    showToast('Use the print dialog to save as PDF', 'info');
}

// ===== Modal Helpers =====
function openModal(id) {
    document.getElementById(id).classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
    document.body.style.overflow = '';
}

// ===== Event Listeners =====
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.nav-item[data-page]').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            navigateTo(this.dataset.page);
        });
    });

    document.querySelectorAll('[data-goto]').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            navigateTo(this.dataset.goto);
        });
    });

    document.getElementById('hamburgerBtn').addEventListener('click', function () {
        document.getElementById('sidebar').classList.toggle('open');
        document.getElementById('sidebarOverlay').classList.toggle('active');
    });

    document.getElementById('sidebarOverlay').addEventListener('click', closeSidebar);

    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', function () {
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            state.currentFilter = this.dataset.filter;
            renderOrders();
        });
    });

    document.getElementById('proceedCheckoutBtn').addEventListener('click', function () {
        if (state.cart.length === 0) {
            showToast('Your cart is empty', 'error');
            return;
        }
        const defAddr = state.addresses.find(a => a.isDefault);
        state.checkoutAddress = defAddr ? defAddr.id : null;
        const selPay = state.payments.find(p => p.selected);
        state.checkoutPayment = selPay ? selPay.id : null;
        navigateTo('checkout');
    });

    document.getElementById('checkoutNext1').addEventListener('click', function () {
        if (!state.checkoutAddress) { showToast('Please select a delivery address', 'error'); return; }
        updateCheckoutSteps(2);
    });
    document.getElementById('checkoutBack2').addEventListener('click', function () { updateCheckoutSteps(1); });
    document.getElementById('checkoutNext2').addEventListener('click', function () {
        if (!state.checkoutPayment) { showToast('Please select a payment method', 'error'); return; }
        updateCheckoutSteps(3);
    });
    document.getElementById('checkoutBack3').addEventListener('click', function () { updateCheckoutSteps(2); });
    document.getElementById('placeOrderBtn').addEventListener('click', placeOrder);

    document.getElementById('addAddressBtn').addEventListener('click', function () { openAddressForm(); });
    document.getElementById('addressForm').addEventListener('submit', saveAddress);

    document.getElementById('editProfileBtn').addEventListener('click', function () {
        document.getElementById('editName').value = state.buyer.name;
        document.getElementById('editEmail').value = state.buyer.email;
        document.getElementById('editMobile').value = state.buyer.mobile;
        openModal('editProfileModal');
    });

    document.getElementById('editProfileForm').addEventListener('submit', function (e) {
        e.preventDefault();
        state.buyer.name = document.getElementById('editName').value;
        state.buyer.email = document.getElementById('editEmail').value;
        state.buyer.mobile = document.getElementById('editMobile').value;
        closeModal('editProfileModal');
        showToast('Profile updated successfully', 'success');
        renderProfile();
        const initials = state.buyer.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        document.querySelectorAll('.header-avatar, .user-avatar-small').forEach(el => el.textContent = initials);
        document.querySelectorAll('.header-user-name, .user-name-small').forEach(el => el.textContent = state.buyer.name);
    });

    document.getElementById('printBillBtn').addEventListener('click', printBill);
    document.getElementById('downloadBillBtn').addEventListener('click', downloadBill);

    document.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', function () { closeModal(this.dataset.close); });
    });

    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
        backdrop.addEventListener('click', function () {
            this.closest('.modal').classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.getElementById('logoutBtn').addEventListener('click', function (e) {
        e.preventDefault();
        showToast('You have been logged out', 'info');
    });

    renderDashboard();
    updateCartBadge();
});