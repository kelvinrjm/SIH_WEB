/* FarmerMarket - vanilla JS rebuild of the original React app */
(function () {
  'use strict';

  var products = [
    { id: 1, name: 'Alphonso Mango', variety: 'Premium grade A', quality: 'Grade A', organic: 'Naturally grown', delivery: 'Available nationwide', farmer: 'Ravi Kumar', location: 'Ratnagiri, MH', phone: '+91 98765 43210', price: 180, harvest: '2026-08-20', quantity: 120, status: 'Available', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=900&q=85' },
    { id: 2, name: 'Red Onions', variety: 'Freshly harvested', quality: 'Grade A', organic: 'Farm grown', delivery: 'Available nationwide', farmer: 'Meena Farms', location: 'Nashik, MH', phone: '+91 98450 11223', price: 42, harvest: '2026-08-23', quantity: 420, status: 'Available', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=900&q=85' },
    { id: 3, name: 'Baby Spinach', variety: 'Tender & organic', quality: 'Premium', organic: 'Certified organic', delivery: 'Available nationwide', farmer: 'Green Valley Co-op', location: 'Ooty, TN', phone: '+91 97654 09876', price: 65, harvest: '2026-08-25', quantity: 35, status: 'Low Stock', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=900&q=85' },
    { id: 4, name: 'Basmati Rice', variety: 'Aged 1121', quality: 'Export quality', organic: 'Farm grown', delivery: 'Available nationwide', farmer: 'Suresh Patel', location: 'Amritsar, PB', phone: '+91 99887 66554', price: 96, harvest: '2026-08-15', quantity: 850, status: 'Available', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=85' },
    { id: 5, name: 'Okra', variety: 'Crisp & hand-picked', quality: 'Grade A', organic: 'Naturally grown', delivery: 'Available nationwide', farmer: 'Lakshmi Organics', location: 'Mysuru, KA', phone: '+91 98123 45670', price: 58, harvest: '2026-08-24', quantity: 18, status: 'Low Stock', image: 'https://images.unsplash.com/photo-1425543103986-22abb7d7ea3e?auto=format&fit=crop&w=900&q=85' },
    { id: 6, name: 'Red Tomatoes', variety: 'Vine ripened', quality: 'Grade A', organic: 'Farm grown', delivery: 'Delivery paused', farmer: 'Kaveri Collective', location: 'Kolar, KA', phone: '+91 98761 55443', price: 38, harvest: '2026-08-21', quantity: 0, status: 'Sold Out', image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=900&q=85' }
  ];

  var initialFilters = { harvest: '', min: '', max: '' };

  var state = {
    page: 'market',
    selectedProduct: null,
    cart: loadCart(),
    query: '',
    filters: Object.assign({}, initialFilters),
    draftFilters: Object.assign({}, initialFilters),
    sort: 'newest',
    toast: '',
    order: null,
    cartSearch: '',
    form: { name: '', phone: '', location: '', date: '', purpose: '' },
    errors: {}
  };

  var toastTimer = null;
  var root = document.getElementById('root');

  function loadCart() {
    try { return JSON.parse(localStorage.getItem('farmers-cart') || '[]'); }
    catch (e) { return []; }
  }
  function saveCart() {
    localStorage.setItem('farmers-cart', JSON.stringify(state.cart));
  }

  function escapeHtml(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function findProduct(id) {
    return products.filter(function (p) { return p.id === id; })[0];
  }

  function formatDate(dateStr, opts) {
    return new Date(dateStr).toLocaleDateString('en-IN', opts);
  }

  function notify(message) {
    state.toast = message;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { state.toast = ''; render(); }, 2600);
  }

  function getCartCount() {
    return state.cart.reduce(function (sum, item) { return sum + item.quantity; }, 0);
  }
  function getCartProducts() {
    return state.cart.map(function (item) {
      var p = findProduct(item.id);
      return Object.assign({}, p, { quantityInCart: item.quantity });
    });
  }
  function getVisibleProducts() {
    var q = state.query.toLowerCase();
    var f = state.filters;
    var list = products.filter(function (product) {
      var haystack = (product.name + ' ' + product.farmer + ' ' + product.location).toLowerCase();
      var matchesQuery = haystack.indexOf(q) !== -1;
      var matchesHarvest = !f.harvest || product.harvest >= f.harvest;
      var matchesMin = !f.min || product.price >= Number(f.min);
      var matchesMax = !f.max || product.price <= Number(f.max);
      return matchesQuery && matchesHarvest && matchesMin && matchesMax;
    });
    list.sort(function (a, b) {
      if (state.sort === 'low') return a.price - b.price;
      if (state.sort === 'high') return b.price - a.price;
      return b.harvest.localeCompare(a.harvest);
    });
    return list;
  }
  function getCartSearchResults() {
    var term = state.cartSearch.trim().toLowerCase();
    if (!term) return [];
    return products.filter(function (product) { return product.name.toLowerCase().indexOf(term) !== -1; });
  }

  function addToCart(productId, amount) {
    amount = amount || 1;
    var product = findProduct(productId);
    if (!product || product.status === 'Sold Out') return;
    var exists = state.cart.some(function (item) { return item.id === productId; });
    if (exists) {
      state.cart = state.cart.map(function (item) {
        return item.id === productId ? Object.assign({}, item, { quantity: item.quantity + amount }) : item;
      });
    } else {
      state.cart = state.cart.concat([{ id: productId, quantity: amount }]);
    }
    saveCart();
    notify('Product added to cart successfully!');
    state.page = 'cart';
    render();
  }
  function updateQuantity(id, change) {
    state.cart = state.cart
      .map(function (item) { return item.id === id ? Object.assign({}, item, { quantity: Math.max(0, item.quantity + change) }) : item; })
      .filter(function (item) { return item.quantity > 0; });
    saveCart();
    render();
  }
  function removeItem(id) {
    state.cart = state.cart.filter(function (item) { return item.id !== id; });
    saveCart();
    render();
  }
  function applyFilters() {
    state.filters = Object.assign({}, state.draftFilters);
    render();
  }
  function clearFilters() {
    state.draftFilters = Object.assign({}, initialFilters);
    state.filters = Object.assign({}, initialFilters);
    render();
  }
  function updateForm(field, value) {
    state.form[field] = value;
  }
  function placeOrder(event) {
    event.preventDefault();
    var required = ['name', 'phone', 'location', 'date', 'purpose'];
    var nextErrors = {};
    required.forEach(function (field) {
      if (!state.form[field].trim()) nextErrors[field] = 'Required';
    });
    state.errors = nextErrors;
    var cartProducts = getCartProducts();
    var primaryProduct = cartProducts[0];
    if (Object.keys(nextErrors).length === 0 && primaryProduct) {
      state.order = 'FM' + Math.floor(1000 + Math.random() * 8999);
      state.cart = [];
      saveCart();
      notify('Order placed successfully!');
    }
    render();
  }

  /* ---------- Render fragments ---------- */

  function renderHeader() {
    var count = getCartCount();
    return (
      '<header class="topbar">' +
        '<button class="brand" data-action="go-market"><span class="brand-mark">FM</span><span>Farmer<span>Market</span><small>Fresh from the source</small></span></button>' +
        '<div class="header-actions">' +
          '<button class="profile-button" aria-label="Buyer profile"><span class="avatar">AK</span><span class="profile-copy">Ananya Kapoor<small>Buyer account</small></span><span class="chevron">\u2304</span></button>' +
          '<button class="cart-button" data-action="go-cart" aria-label="Open cart"><span class="cart-icon">\u25B1</span><span class="cart-label">Cart</span>' + (count > 0 ? '<b>' + count + '</b>' : '') + '</button>' +
        '</div>' +
      '</header>'
    );
  }

  function renderToast() {
    if (!state.toast) return '';
    return '<div class="toast"><span>\u2713</span>' + escapeHtml(state.toast) + '</div>';
  }

  function renderFilterBar() {
    var f = state.draftFilters;
    return (
      '<div class="filterbar">' +
        '<label>Harvest from<input type="date" data-field="harvest" value="' + escapeHtml(f.harvest) + '" /></label>' +
        '<label>Min price<input type="number" placeholder="\u20B9 0" data-field="min" value="' + escapeHtml(f.min) + '" /></label>' +
        '<label>Max price<input type="number" placeholder="\u20B9 5,000" data-field="max" value="' + escapeHtml(f.max) + '" /></label>' +
        '<button class="filter-action" data-action="apply-filters">Apply filters</button>' +
        '<button class="clear-action" data-action="clear-filters">Clear</button>' +
      '</div>'
    );
  }

  function renderProductCard(product) {
    var statusClass = product.status.toLowerCase().replace(' ', '-');
    return (
      '<article class="product-card">' +
        '<button class="product-image image-trigger" data-action="view-details" data-id="' + product.id + '" aria-label="View full details for ' + escapeHtml(product.name) + '">' +
          '<img src="' + product.image + '" alt="' + escapeHtml(product.name) + '" />' +
          '<span class="status ' + statusClass + '">' + product.status + '</span>' +
          '<span class="image-detail-hint">View full details \u2193</span>' +
          '<span class="save-button" aria-hidden="true">\u2661</span>' +
        '</button>' +
        '<div class="product-content">' +
          '<div class="product-heading"><div><h3>' + escapeHtml(product.name) + '</h3><p>' + escapeHtml(product.variety) + '</p></div><strong>\u20B9' + product.price + '<small>/kg</small></strong></div>' +
          '<dl>' +
            '<div><dt>Farmer</dt><dd>' + escapeHtml(product.farmer) + '</dd></div>' +
            '<div><dt>Location</dt><dd>' + escapeHtml(product.location) + '</dd></div>' +
            '<div><dt>Harvested</dt><dd>' + formatDate(product.harvest, { day: '2-digit', month: 'short' }) + '</dd></div>' +
            '<div><dt>Available</dt><dd>' + (product.quantity ? product.quantity + ' kg' : '\u2014') + '</dd></div>' +
          '</dl>' +
          '<div class="card-footer">' +
            '<a href="tel:' + product.phone + '">\u260E ' + product.phone + '</a>' +
            '<button data-action="add-to-cart" data-id="' + product.id + '" ' + (product.status === 'Sold Out' ? 'disabled' : '') + '>' + (product.status === 'Sold Out' ? 'Sold out' : 'Add to cart') + ' <span>+</span></button>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function renderMarketPage() {
    var visible = getVisibleProducts();
    return (
      '<main>' +
        '<section class="hero-section">' +
          '<div><p class="eyebrow">DIRECT FROM INDIAN FARMS <span>\u2022</span> 1,240+ LISTINGS</p><h1>Good food starts<br />with <em>good soil.</em></h1><p class="hero-copy">Discover fresh, traceable produce from farmers who care. Buy with confidence, support local growers.</p></div>' +
          '<div class="hero-stat"><strong>08</strong><span>Days of harvest freshness<br />guaranteed</span></div>' +
        '</section>' +
        '<section class="controls">' +
          '<div class="search-wrap"><span>\u2315</span><input id="search-input" value="' + escapeHtml(state.query) + '" placeholder="Search crops, farmers or locations..." /><kbd>\u2318 K</kbd></div>' +
          renderFilterBar() +
        '</section>' +
        '<section class="listing-section">' +
          '<div class="section-heading">' +
            '<div><p class="eyebrow">THE WEEK\'S HARVEST</p><h2>Fresh products <span>available</span></h2></div>' +
            '<label class="sort-label">Sort by<select id="sort-select">' +
              '<option value="newest"' + (state.sort === 'newest' ? ' selected' : '') + '>Newest harvest</option>' +
              '<option value="low"' + (state.sort === 'low' ? ' selected' : '') + '>Price: low to high</option>' +
              '<option value="high"' + (state.sort === 'high' ? ' selected' : '') + '>Price: high to low</option>' +
            '</select></label>' +
          '</div>' +
          (visible.length
            ? '<div class="product-grid">' + visible.map(renderProductCard).join('') + '</div>'
            : '<div class="empty-state"><span>\u2315</span><h3>No products found</h3><p>Try a different crop, farmer, location, or filter.</p></div>') +
        '</section>' +
      '</main>'
    );
  }

  function renderProductDetails() {
    var product = state.selectedProduct;
    if (!product) return '';
    var statusClass = product.status.toLowerCase().replace(' ', '-');
    return (
      '<main class="details-page">' +
        '<button class="back-link" data-action="go-market">\u2190 Back to marketplace</button>' +
        '<div class="details-layout">' +
          '<div class="details-photo"><img src="' + product.image + '" alt="' + escapeHtml(product.name) + '" /><span class="status ' + statusClass + '">' + product.status + '</span></div>' +
          '<div class="details-copy">' +
            '<p class="eyebrow">PRODUCT INFORMATION</p>' +
            '<h1>' + escapeHtml(product.name) + '</h1>' +
            '<p class="details-variety">' + escapeHtml(product.variety) + '</p>' +
            '<div class="details-price">\u20B9' + product.price + '<small>/ kg</small></div>' +
            '<p class="details-description">Carefully grown and harvested by a local farmer. This produce is selected for freshness and supplied directly from the farm to your doorstep.</p>' +
            '<div class="details-facts">' +
              '<div><span>Available quantity</span><strong>' + (product.quantity ? product.quantity + ' kg' : 'Sold out') + '</strong></div>' +
              '<div><span>Harvest date</span><strong>' + formatDate(product.harvest, { day: '2-digit', month: 'long', year: 'numeric' }) + '</strong></div>' +
              '<div><span>Quality</span><strong>' + escapeHtml(product.quality) + '</strong></div>' +
              '<div><span>Organic status</span><strong>' + escapeHtml(product.organic) + '</strong></div>' +
              '<div><span>Delivery availability</span><strong>' + escapeHtml(product.delivery) + '</strong></div>' +
              '<div><span>Transport cost</span><strong>' + (product.price > 1000 ? 'Free delivery' : 'From \u20B950') + '</strong></div>' +
            '</div>' +
            '<section class="farmer-profile">' +
              '<div class="farmer-avatar">' + escapeHtml(product.farmer.slice(0, 1)) + '</div>' +
              '<div><p class="detail-label">FARMER DETAILS</p><h2>' + escapeHtml(product.farmer) + '</h2><p>' + escapeHtml(product.location) + '</p><a href="tel:' + product.phone + '">\u260E ' + product.phone + '</a></div>' +
            '</section>' +
            '<button class="details-cart-button" data-action="add-to-cart" data-id="' + product.id + '" ' + (product.status === 'Sold Out' ? 'disabled' : '') + '>' + (product.status === 'Sold Out' ? 'Sold out' : 'Add to cart') + ' <span>\u2192</span></button>' +
          '</div>' +
        '</div>' +
      '</main>'
    );
  }

  function renderCartPage() {
    var cartProducts = getCartProducts();
    var subtotal = cartProducts.reduce(function (sum, p) { return sum + p.price * p.quantityInCart; }, 0);
    var delivery = subtotal ? (subtotal > 1000 ? 0 : 50) : 0;
    var total = subtotal + delivery;
    var primaryProduct = cartProducts[0];

    var intro = (
      '<div class="page-intro">' +
        '<button class="back-link" data-action="go-market">\u2190 Back to marketplace</button>' +
        '<p class="eyebrow">YOUR SELECTION</p><h1>Cart <span>&amp; order</span></h1>' +
        '<p>Review your produce and tell us where to send it.</p>' +
      '</div>'
    );

    if (state.order) {
      return (
        '<main class="cart-page">' + intro +
          '<div class="order-success">' +
            '<div class="success-mark">\u2713</div>' +
            '<p class="eyebrow">ORDER CONFIRMED</p>' +
            '<h2>Your order has been placed successfully!</h2>' +
            '<p>We\'ve sent the order details to your phone. Your farmer will be in touch shortly.</p>' +
            '<div class="order-id">Order ID <strong>#' + state.order + '</strong></div>' +
            '<button class="filter-action" data-action="continue-shopping">Continue shopping</button>' +
          '</div>' +
        '</main>'
      );
    }

    var searchResults = getCartSearchResults();
    var cartSearchHtml = state.cartSearch
      ? (searchResults.length
          ? '<ul>' + searchResults.map(function (p) {
              return '<li class="cart-search-result-item"><img src="' + p.image + '" alt="' + escapeHtml(p.name) + '" /><span>' + escapeHtml(p.name) + '</span></li>';
            }).join('') + '</ul>'
          : '<p>No matching product found</p>')
      : '<p>Type a product name to see it here</p>';

    var leftSection = (
      '<section>' +
        '<div class="mini-search"><span>\u2315</span><input id="cart-search-input" value="' + escapeHtml(state.cartSearch) + '" placeholder="Search products..." /></div>' +
        '<div class="cart-search-results">' + cartSearchHtml + '</div>' +
        (!cartProducts.length
          ? '<div class="empty-cart"><span>\u25B1</span><h2>Your cart is waiting</h2><p>Browse the marketplace and add fresh produce to get started.</p><button class="filter-action" data-action="go-market">Explore marketplace</button></div>'
          : '<div class="cart-items">' + cartProducts.map(function (product) {
              return (
                '<div class="cart-item">' +
                  '<img src="' + product.image + '" alt="' + escapeHtml(product.name) + '" />' +
                  '<div class="cart-item-info">' +
                    '<div><h3>' + escapeHtml(product.name) + '</h3><p>' + escapeHtml(product.farmer) + ' \u00B7 ' + escapeHtml(product.location) + '</p></div>' +
                    '<button class="remove" data-action="remove-item" data-id="' + product.id + '">Remove</button>' +
                    '<strong>\u20B9' + (product.price * product.quantityInCart) + '</strong>' +
                    '<small>\u20B9' + product.price + '/kg \u00B7 ' + product.quantityInCart + ' kg</small>' +
                    '<div class="stepper">' +
                      '<button data-action="qty-dec" data-id="' + product.id + '">\u2212</button>' +
                      '<b>' + product.quantityInCart + ' kg</b>' +
                      '<button data-action="qty-inc" data-id="' + product.id + '">+</button>' +
                    '</div>' +
                  '</div>' +
                '</div>'
              );
            }).join('') + '</div>') +
      '</section>'
    );

    var fields = [
      ['name', 'Full name', 'Ananya Kapoor'],
      ['phone', 'Phone number', '+91 00000 00000'],
      ['location', 'Delivery location', 'Address, city, state'],
      ['date', 'Required by', '']
    ];

    var formFieldsHtml = fields.map(function (f) {
      var field = f[0], label = f[1], placeholder = f[2];
      var type = field === 'date' ? 'date' : field === 'phone' ? 'tel' : 'text';
      var errClass = state.errors[field] ? ' has-error' : '';
      return (
        '<label>' + label +
          '<input type="' + type + '" placeholder="' + escapeHtml(placeholder) + '" data-form-field="' + field + '" value="' + escapeHtml(state.form[field]) + '" class="' + errClass + '" />' +
          (state.errors[field] ? '<small class="error">This field is required</small>' : '') +
        '</label>'
      );
    }).join('');

    var purposeErrClass = state.errors.purpose ? ' has-error' : '';
    var purposeOptions = ['Restaurant / business', 'Home consumption', 'Resale'];

    var rightForm = (
      '<form class="order-form" id="order-form">' +
        '<div class="form-heading"><p class="eyebrow">ALMOST THERE</p><h2>Place your order</h2><p>We\'ll coordinate delivery with your farmer.</p></div>' +
        formFieldsHtml +
        '<label>Purpose / reason' +
          '<select data-form-field="purpose" class="' + purposeErrClass + '">' +
            '<option value=""' + (state.form.purpose === '' ? ' selected' : '') + '>Select a purpose</option>' +
            purposeOptions.map(function (opt) { return '<option' + (state.form.purpose === opt ? ' selected' : '') + '>' + opt + '</option>'; }).join('') +
          '</select>' +
          (state.errors.purpose ? '<small class="error">Please choose a purpose</small>' : '') +
        '</label>' +
        '<div class="summary">' +
          '<div><span>Produce subtotal</span><b>\u20B9' + subtotal + '</b></div>' +
          '<div><span>Delivery &amp; transport</span><b>' + (delivery ? '\u20B9' + delivery : 'Free') + '</b></div>' +
          '<div class="total"><span>Total amount</span><b>\u20B9' + total + '</b></div>' +
        '</div>' +
        '<button class="place-order" ' + (!primaryProduct ? 'disabled' : '') + '>Place order <span>\u2192</span></button>' +
        '<button type="button" class="secondary-action" data-action="add-another">+ Add another item</button>' +
      '</form>'
    );

    return (
      '<main class="cart-page">' + intro +
        '<div class="cart-layout">' + leftSection + rightForm + '</div>' +
      '</main>'
    );
  }

  function renderFooter() {
    return (
      '<footer>' +
        '<span>Farmer<span>Market</span></span>' +
        '<span>Better food, better futures.</span>' +
        '<span>\u00A9 2026</span>' +
      '</footer>'
    );
  }

  /* ---------- Main render + event binding ---------- */

  function render() {
    var body;
    if (state.page === 'market') body = renderMarketPage();
    else if (state.page === 'details') body = renderProductDetails();
    else body = renderCartPage();

    root.innerHTML =
      '<div class="app-shell">' +
        renderHeader() +
        renderToast() +
        body +
        renderFooter() +
      '</div>';

    bindEvents();
  }

  function bindEvents() {
    root.querySelectorAll('[data-action]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        var action = el.getAttribute('data-action');
        var idAttr = el.getAttribute('data-id');
        var id = idAttr ? Number(idAttr) : null;

        switch (action) {
          case 'go-market':
            state.page = 'market';
            render();
            break;
          case 'go-cart':
            state.page = 'cart';
            render();
            break;
          case 'view-details':
            state.selectedProduct = findProduct(id);
            state.page = 'details';
            render();
            break;
          case 'add-to-cart':
            addToCart(id, 1);
            break;
          case 'apply-filters':
            applyFilters();
            break;
          case 'clear-filters':
            clearFilters();
            break;
          case 'remove-item':
            removeItem(id);
            break;
          case 'qty-inc':
            updateQuantity(id, 1);
            break;
          case 'qty-dec':
            updateQuantity(id, -1);
            break;
          case 'continue-shopping':
            state.order = null;
            state.page = 'market';
            render();
            break;
          case 'add-another':
            var cartProducts = getCartProducts();
            if (cartProducts[0]) notify('Cart is already up to date');
            render();
            break;
        }
      });
    });

    var searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        state.query = e.target.value;
        var caret = e.target.selectionStart;
        render();
        var again = document.getElementById('search-input');
        if (again) { again.focus(); again.setSelectionRange(caret, caret); }
      });
    }

    var cartSearchInput = document.getElementById('cart-search-input');
    if (cartSearchInput) {
      cartSearchInput.addEventListener('input', function (e) {
        state.cartSearch = e.target.value;
        var caret = e.target.selectionStart;
        render();
        var again = document.getElementById('cart-search-input');
        if (again) { again.focus(); again.setSelectionRange(caret, caret); }
      });
    }

    var sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', function (e) {
        state.sort = e.target.value;
        render();
      });
    }

    root.querySelectorAll('.filterbar input[data-field]').forEach(function (input) {
      input.addEventListener('input', function (e) {
        state.draftFilters[e.target.getAttribute('data-field')] = e.target.value;
      });
    });

    root.querySelectorAll('[data-form-field]').forEach(function (input) {
      input.addEventListener('input', function (e) {
        updateForm(e.target.getAttribute('data-form-field'), e.target.value);
      });
      input.addEventListener('change', function (e) {
        updateForm(e.target.getAttribute('data-form-field'), e.target.value);
      });
    });

    var orderForm = document.getElementById('order-form');
    if (orderForm) {
      orderForm.addEventListener('submit', placeOrder);
    }
  }

  render();
})();
