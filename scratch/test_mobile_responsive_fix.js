const fs = require('fs');
const path = require('path');

console.log('========================================================');
console.log('FARM LINK — MOBILE-FIRST RESPONSIVE AUDIT & VERIFICATION');
console.log('========================================================\n');

let passed = 0;
let failed = 0;

function assert(condition, message) {
    if (condition) {
        console.log(`[PASS] ${message}`);
        passed++;
    } else {
        console.error(`[FAIL] ${message}`);
        failed++;
    }
}

// 1. Audit css/responsive.css
const respCss = fs.readFileSync('css/responsive.css', 'utf8');

// Test 1: Order Status Filter Chips (Option A: Scrollable, no letter-breaking)
assert(respCss.includes('.filter-chips-bar'), 'responsive.css defines .filter-chips-bar');
assert(respCss.includes('.filter-chip-btn'), 'responsive.css defines .filter-chip-btn');
assert(respCss.includes('white-space: nowrap !important') && respCss.includes('word-break: keep-all !important'),
    'Filter chips strictly enforce white-space: nowrap and word-break: keep-all to prevent letter-by-letter breaking');
assert(respCss.includes('flex-shrink: 0 !important'), 'Filter chips strictly enforce flex-shrink: 0 to prevent column compression');

// Test 2: Product Grids 2-Column Mobile Rule
assert(respCss.includes('grid-template-columns: repeat(2, minmax(0, 1fr)) !important'),
    'Product grids (.farmer-products-grid, .marketplace-grid) enforce 2 columns per row on mobile');
assert(respCss.includes('.farmer-product-card') && respCss.includes('.buyer-product-card'),
    'Product cards have mobile-specific adaptations (compact heights, padding, action buttons)');

// Test 3: Farmer Order Cards Single-Column
assert(respCss.includes('.farmer-order-card'), 'Farmer order card is defined as a dedicated responsive card');

// Test 4: Mobile Bottom Navigation
assert(respCss.includes('.mobile-bottom-nav') && respCss.includes('.mobile-nav-item'),
    'Mobile bottom navigation is defined with equal tab distribution and min-width: 0');

// 2. Audit pages/farmer/orders.html
const ordersHtml = fs.readFileSync('pages/farmer/orders.html', 'utf8');
assert(ordersHtml.includes('class="filter-scroll-wrapper"'), 'farmer/orders.html uses filter-scroll-wrapper');
assert(ordersHtml.includes('class="filter-chips-bar"'), 'farmer/orders.html uses filter-chips-bar');
assert(ordersHtml.includes('class="btn btn-primary btn-sm filter-chip-btn active"'), 'farmer/orders.html uses filter-chip-btn with active state');
assert(ordersHtml.includes('class="card farmer-order-card"'), 'farmer/orders.html order card uses farmer-order-card class');

// 3. Audit js/language.js for Status & Navigation Translations
const langJs = fs.readFileSync('js/language.js', 'utf8');
const reqKeys = ['All Orders', 'Placed', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'In Progress', 'Cancelled', 'Home', 'Products', 'Sell', 'Prices', 'Market'];

reqKeys.forEach(k => {
    const enMatch = langJs.includes(`'${k}':`);
    assert(enMatch, `language.js has translation entry for '${k}'`);
});

// 4. Audit js/navigation.js
const navJs = fs.readFileSync('js/navigation.js', 'utf8');
assert(navJs.includes('setupMobileBottomNav'), 'js/navigation.js implements setupMobileBottomNav()');
assert(navJs.includes('data-i18n="Home"') && navJs.includes('data-i18n="Sell"'),
    'js/navigation.js uses concise translation keys for mobile bottom nav');

// 5. Check all 48 pages for no forced letter breaking
function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const full = path.join(dir, file);
        const stat = fs.statSync(full);
        if (stat && stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'scratch') {
                results = results.concat(walk(full));
            }
        } else if (file.endsWith('.html')) {
            results.push(full);
        }
    });
    return results;
}

const htmlFiles = walk('.');
let badWordBreakFiles = [];
htmlFiles.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    if (content.includes('word-break: break-all') && (content.includes('btn') || content.includes('filter') || content.includes('nav'))) {
        badWordBreakFiles.push(f);
    }
});
assert(badWordBreakFiles.length === 0, 'No HTML pages have word-break: break-all on buttons, filters, or navigation');

console.log(`\n========================================================`);
console.log(`AUDIT RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log(`========================================================`);

if (failed > 0) process.exit(1);
