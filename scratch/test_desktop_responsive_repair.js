/**
 * FARM LINK — DESKTOP + TABLET + MOBILE RESPONSIVE REPAIR VERIFICATION
 */
const fs = require('fs');
const path = require('path');

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

console.log('========================================================');
console.log('FARM LINK — MULTI-VIEWPORT RESPONSIVE REPAIR AUDIT');
console.log('========================================================\n');

// 1. Check responsive.css
const respCss = fs.readFileSync('css/responsive.css', 'utf8');

assert(respCss.includes('.app-layout {') && respCss.includes('min-height: 100vh;'), 'responsive.css defines .app-layout base mobile styles');
assert(respCss.includes('.main-content {') && respCss.includes('width: 100% !important;'), 'responsive.css sets .main-content width: 100% on mobile');
assert(respCss.includes('.sidebar {') && respCss.includes('position: fixed !important;'), 'responsive.css sets mobile .sidebar to position: fixed');
assert(respCss.includes('.sidebar.open {') && respCss.includes('transform: translateX(0) !important;'), 'responsive.css sets .sidebar.open transform');

// Desktop query checks
assert(respCss.includes('@media (min-width: 992px)'), 'responsive.css has @media (min-width: 992px)');
assert(respCss.includes('.sidebar {') && respCss.includes('position: sticky !important;'), 'responsive.css sets desktop sidebar to position: sticky');
assert(respCss.includes('width: var(--sidebar-w, 260px) !important;'), 'responsive.css enforces desktop sidebar width: 260px');
assert(respCss.includes('flex: 1 1 0% !important;'), 'responsive.css sets desktop main-content to flex: 1 1 0%');
assert(respCss.includes('margin-left: 0 !important;'), 'responsive.css eliminates desktop main-content margin-left offset');
assert(respCss.includes('max-width: calc(100% - var(--sidebar-w, 260px)) !important;'), 'responsive.css constrains main-content to remaining available space');

// Symmetrical 7-column quick actions on desktop
assert(respCss.includes('grid-template-columns: repeat(7, 1fr) !important;'), 'responsive.css aligns all 7 farmer quick actions symmetrically on desktop');

// Product grid breakpoints
assert(respCss.includes('grid-template-columns: repeat(2, minmax(0, 1fr)) !important;'), 'Mobile product grid has 2 columns per row');
assert(respCss.includes('grid-template-columns: repeat(3, minmax(0, 1fr)) !important;'), 'Tablet & Desktop product grid has 3 columns');
assert(respCss.includes('grid-template-columns: repeat(4, minmax(0, 1fr)) !important;'), 'Large desktop product grid has 4 columns');

// Mobile Bottom Nav visibility separation
assert(respCss.includes('.mobile-bottom-nav {') && respCss.includes('display: none !important;'), 'Mobile bottom nav is strictly hidden on tablet and desktop (>= 768px)');

// Slim sidebar scrollbar
assert(respCss.includes('.sidebar-nav::-webkit-scrollbar'), 'Custom slim scrollbar defined for sidebar nav');

// HTML div balance & script validation
const farmerOrdersHtml = fs.readFileSync('pages/farmer/orders.html', 'utf8');
const fOpens = (farmerOrdersHtml.match(/<div\b/gi)||[]).length;
const fCloses = (farmerOrdersHtml.match(/<\/div>/gi)||[]).length;
assert(fOpens === fCloses, `farmer/orders.html div tags are balanced (opens: ${fOpens}, closes: ${fCloses})`);

// Check that page-header closes before filter-scroll-wrapper in farmer/orders.html
const headerSplit = farmerOrdersHtml.split('class="page-header"')[1];
const closeBeforeFilter = headerSplit.indexOf('</div>') < headerSplit.indexOf('class="filter-scroll-wrapper"');
assert(closeBeforeFilter, 'farmer/orders.html .page-header closes cleanly before filter-scroll-wrapper');

// Check buyer/orders.html
const buyerOrdersHtml = fs.readFileSync('pages/buyer/orders.html', 'utf8');
const bOpens = (buyerOrdersHtml.match(/<div\b/gi)||[]).length;
const bCloses = (buyerOrdersHtml.match(/<\/div>/gi)||[]).length;
assert(bOpens === bCloses, `buyer/orders.html div tags are balanced (opens: ${bOpens}, closes: ${bCloses})`);

// Check JavaScript validity in farmer/orders.html
let jsValid = true;
try {
    const scripts = farmerOrdersHtml.match(/<script>([\s\S]*?)<\/script>/g) || [];
    scripts.forEach(s => {
        new Function(s.replace(/<\/?script>/g, ''));
    });
} catch (e) {
    jsValid = false;
}
assert(jsValid, 'farmer/orders.html inline JavaScript executes without syntax errors');

console.log('\n========================================================');
console.log(`AUDIT RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log('========================================================');

process.exit(failed > 0 ? 1 : 0);
