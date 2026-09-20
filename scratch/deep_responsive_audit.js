const fs = require('fs');
const path = require('path');

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

const files = walk('.');
console.log(`=== AUDITING ALL ${files.length} HTML FILES FOR RESPONSIVE ISSUES ===\n`);

let report = {
    missingResponsiveCss: [],
    unwrappedTables: [],
    fixedPixelWidths: [],
    modalsWithoutScroll: [],
    overflowRisks: []
};

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');

    // 1. Missing responsive.css
    if (!content.includes('responsive.css')) {
        report.missingResponsiveCss.push(file);
    }

    // 2. Unwrapped tables
    const tableRegex = /<table[\s\S]*?<\/table>/gi;
    let match;
    while ((match = tableRegex.exec(content)) !== null) {
        const preContent = content.substring(Math.max(0, match.index - 100), match.index);
        if (!preContent.includes('table-responsive')) {
            report.unwrappedTables.push({ file, index: match.index });
        }
    }

    // 3. Fixed width elements (e.g. width: 400px, width: 600px without max-width)
    const fixedWidthMatches = content.match(/style=["'][^"']*\bwidth:\s*([3-9]\d{2,}px|\d{4,}px)[^"']*["']/gi);
    if (fixedWidthMatches) {
        report.fixedPixelWidths.push({ file, matches: fixedWidthMatches });
    }

    // 4. Modals without responsive sizing
    if (content.includes('class="modal"') && !content.includes('modal-content')) {
        report.modalsWithoutScroll.push(file);
    }
});

console.log('1. Files Missing responsive.css:', report.missingResponsiveCss.length);
report.missingResponsiveCss.forEach(f => console.log('   -', f));

console.log('\n2. Potentially Unwrapped Tables:', report.unwrappedTables.length);
report.unwrappedTables.forEach(t => console.log('   -', t.file));

console.log('\n3. Rigid Fixed Widths (>300px):', report.fixedPixelWidths.length);
report.fixedPixelWidths.forEach(w => console.log('   -', w.file, w.matches));

console.log('\n=== AUDIT COMPLETE ===');
