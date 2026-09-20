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
console.log('Total HTML files found:', files.length);

let missingResponsive = [];
let missingViewport = [];
let missingLangSelect = [];
let hardcodedInlineWidths = [];

files.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    if (!content.includes('responsive.css')) {
        missingResponsive.push(f);
    }
    if (!content.includes('viewport')) {
        missingViewport.push(f);
    }
    if (!content.includes('languageSelect') && !content.includes('language-selector') && !content.includes('lang-select')) {
        missingLangSelect.push(f);
    }
    // Check for inline style fixed widths that could cause mobile breakage
    const inlineWidthMatches = content.match(/style=["'][^"']*(?:width:\s*\d{3,}px|grid-template-columns:\s*[^"']*px)[^"']*["']/gi);
    if (inlineWidthMatches) {
        hardcodedInlineWidths.push({ file: f, matches: inlineWidthMatches });
    }
});

console.log('Missing responsive.css:', missingResponsive.length);
if (missingResponsive.length > 0) console.log(missingResponsive);

console.log('Missing viewport meta tag:', missingViewport.length);
if (missingViewport.length > 0) console.log(missingViewport);

console.log('Missing language selector element:', missingLangSelect.length);
if (missingLangSelect.length > 0) console.log(missingLangSelect);

console.log('Files with potentially rigid inline widths:', hardcodedInlineWidths.length);
hardcodedInlineWidths.forEach(item => {
    console.log(` - ${item.file}:`, item.matches);
});
