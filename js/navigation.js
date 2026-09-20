/* ===================================================================
   FARM LINK — NAVIGATION & APP SHELL CONTROLLER
   =================================================================== */

const Navigation = {
    init() {
        // Toggle mobile sidebar
        const hamburger = document.getElementById('hamburgerBtn') || document.getElementById('hamburger');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        const closeBtn = document.getElementById('sidebarClose');

        if (hamburger && sidebar) {
            hamburger.addEventListener('click', () => {
                sidebar.classList.add('open');
                if (overlay) overlay.classList.add('show');
            });
        }

        if (closeBtn && sidebar) {
            closeBtn.addEventListener('click', () => {
                sidebar.classList.remove('open');
                if (overlay) overlay.classList.remove('show');
            });
        }

        if (overlay && sidebar) {
            overlay.addEventListener('click', () => {
                sidebar.classList.remove('open');
                overlay.classList.remove('show');
            });
        }

        // Active link highlighting based on current page pathname
        const currentPath = window.location.pathname;
        document.querySelectorAll('.sidebar-nav .nav-item').forEach(link => {
            const href = link.getAttribute('href');
            if (href && currentPath.endsWith(href)) {
                link.classList.add('active');
            }
        });

        // Setup user avatar & info in header and sidebar
        const user = AuthService.getUser();
        if (user) {
            document.querySelectorAll('.user-name-display').forEach(el => el.textContent = user.name);
            document.querySelectorAll('.user-role-display').forEach(el => {
                if (user.role === 'field_officer') el.textContent = 'Field Officer';
                else if (user.role === 'farmer') el.textContent = 'Farmer / Seller';
                else el.textContent = 'Buyer / Merchant';
            });
            document.querySelectorAll('.user-avatar-initials').forEach(el => {
                const initials = user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
                el.textContent = initials || (user.role === 'field_officer' ? 'FO' : (user.role === 'farmer' ? 'FM' : 'BY'));
            });
        }

        // Setup logout buttons
        document.querySelectorAll('.logout-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                AuthService.logout();
            });
        });

        // Setup mobile bottom navigation
        this.setupMobileBottomNav();

        // Initialize Lucide icons if available
        if (window.lucide && window.lucide.createIcons) {
            window.lucide.createIcons();
        }
    },

    setupMobileBottomNav() {
        if (document.querySelector('.mobile-bottom-nav')) return;
        const path = window.location.pathname.toLowerCase();
        const isFarmer = path.includes('/farmer/');
        const isBuyer = path.includes('/buyer/');
        const isOfficer = path.includes('/field-officer/');

        if (!isFarmer && !isBuyer && !isOfficer) return;
        if (path.endsWith('login.html')) return;

        const nav = document.createElement('nav');
        nav.className = 'mobile-bottom-nav';
        nav.setAttribute('aria-label', 'Mobile Bottom Navigation');

        if (isOfficer) {
            nav.innerHTML = `
                <a href="dashboard.html" class="mobile-nav-item ${path.endsWith('dashboard.html') ? 'active' : ''}">
                    <i data-lucide="layout-dashboard"></i>
                    <span data-i18n="Dashboard">Dashboard</span>
                </a>
                <a href="farmers.html" class="mobile-nav-item ${path.endsWith('farmers.html') || path.endsWith('add-farmer.html') ? 'active' : ''}">
                    <i data-lucide="users"></i>
                    <span data-i18n="Farmers">Farmers</span>
                </a>
                <a href="add-produce.html" class="mobile-nav-item mobile-nav-highlight ${path.endsWith('add-produce.html') ? 'active' : ''}" title="Add Produce">
                    <i data-lucide="plus-circle"></i>
                    <span data-i18n="Add Produce">Add Produce</span>
                </a>
                <a href="pending-verification.html" class="mobile-nav-item ${path.endsWith('pending-verification.html') ? 'active' : ''}">
                    <i data-lucide="shield-alert"></i>
                    <span data-i18n="Verify">Verify</span>
                </a>
                <a href="listings.html" class="mobile-nav-item ${path.endsWith('listings.html') || path.endsWith('verified-listings.html') ? 'active' : ''}">
                    <i data-lucide="package"></i>
                    <span data-i18n="Listings">Listings</span>
                </a>
            `;
        } else if (isFarmer) {
            nav.innerHTML = `
                <a href="dashboard.html" class="mobile-nav-item ${path.endsWith('dashboard.html') ? 'active' : ''}">
                    <i data-lucide="layout-dashboard"></i>
                    <span data-i18n="Home">Home</span>
                </a>
                <a href="products.html" class="mobile-nav-item ${path.endsWith('products.html') ? 'active' : ''}">
                    <i data-lucide="package"></i>
                    <span data-i18n="Products">Products</span>
                </a>
                <a href="add-product.html" class="mobile-nav-item mobile-nav-highlight ${path.endsWith('add-product.html') ? 'active' : ''}" title="Sell Produce">
                    <i data-lucide="plus"></i>
                    <span data-i18n="Sell">Sell</span>
                </a>
                <a href="orders.html" class="mobile-nav-item ${path.endsWith('orders.html') ? 'active' : ''}">
                    <i data-lucide="shopping-bag"></i>
                    <span data-i18n="Orders">Orders</span>
                </a>
                <a href="market-price.html" class="mobile-nav-item ${path.endsWith('market-price.html') ? 'active' : ''}">
                    <i data-lucide="trending-up"></i>
                    <span data-i18n="Prices">Prices</span>
                </a>
            `;
        } else if (isBuyer) {
            nav.innerHTML = `
                <a href="dashboard.html" class="mobile-nav-item ${path.endsWith('dashboard.html') ? 'active' : ''}">
                    <i data-lucide="layout-dashboard"></i>
                    <span data-i18n="Home">Home</span>
                </a>
                <a href="marketplace.html" class="mobile-nav-item ${path.endsWith('marketplace.html') ? 'active' : ''}">
                    <i data-lucide="store"></i>
                    <span data-i18n="Market">Market</span>
                </a>
                <a href="cart.html" class="mobile-nav-item mobile-nav-highlight ${path.endsWith('cart.html') ? 'active' : ''}" title="Procurement Cart">
                    <i data-lucide="shopping-cart"></i>
                    <span data-i18n="Cart">Cart</span>
                </a>
                <a href="orders.html" class="mobile-nav-item ${path.endsWith('orders.html') ? 'active' : ''}">
                    <i data-lucide="package-check"></i>
                    <span data-i18n="Orders">Orders</span>
                </a>
                <a href="search.html" class="mobile-nav-item ${path.endsWith('search.html') ? 'active' : ''}">
                    <i data-lucide="search"></i>
                    <span data-i18n="Search">Search</span>
                </a>
            `;
        }

        document.body.appendChild(nav);

        // Translate injected items if Language engine is active
        if (window.Language && typeof Language.applyTranslations === 'function') {
            Language.applyTranslations();
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Navigation;
}
