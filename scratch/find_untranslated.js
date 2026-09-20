const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            if (f !== 'node_modules') walkDir(dirPath, callback);
        } else {
            if (dirPath.endsWith('.html')) callback(dirPath);
        }
    });
}

const htmlFiles = [];
walkDir('.', filepath => htmlFiles.push(filepath));

let totalUntranslated = 0;
let results = {};

for (const file of htmlFiles) {
    const content = fs.readFileSync(file, 'utf8');
    
    // Quick regex to find tags with text but no data-i18n
    // This is naive but good enough to find major misses.
    // Looking for <tag class="...">Text</tag> without data-i18n
    const regex = /<([a-z1-6]+)(?![^>]*data-i18n)[^>]*>\s*([A-Z][A-Za-z0-9\s,&;'()-]+)\s*<\/\1>/g;
    
    let match;
    let fileMatches = [];
    while ((match = regex.exec(content)) !== null) {
        const tag = match[1];
        const text = match[2].trim();
        
        // Exclude tags that shouldn't be translated or are usually data
        if (['script', 'style', 'i', 'option', 'td', 'textarea', 'div'].includes(tag.toLowerCase())) continue;
        
        // Exclude short or all-caps or generic placeholders like "RP", "ORD-", etc.
        if (text.length < 3) continue;
        if (/^[A-Z\s]+$/.test(text) && text.length < 5) continue; 
        
        fileMatches.push(`${tag}: "${text}"`);
    }
    
    if (fileMatches.length > 0) {
        // remove duplicates
        fileMatches = [...new Set(fileMatches)];
        results[file] = fileMatches;
        totalUntranslated += fileMatches.length;
    }
}

console.log(`Found ${totalUntranslated} potentially untranslated text nodes across ${Object.keys(results).length} files.`);
for (const [file, matches] of Object.entries(results).slice(0, 10)) {
    console.log(`\n${file}:`);
    matches.forEach(m => console.log(`  - ${m}`));
}
