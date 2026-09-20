const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const DIR = '/var/www/html/html_bkp/SIH_main/sih-k';
const BASE_URL = 'http://localhost:8000';

async function findHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            if (file === 'node_modules') continue;
            results = results.concat(await findHtmlFiles(filePath));
        } else if (file.endsWith('.html')) {
            results.push(filePath.replace(DIR, ''));
        }
    }
    return results;
}

async function run() {
    const files = await findHtmlFiles(DIR);
    const browser = await puppeteer.launch({ 
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    const page = await browser.newPage();
    
    let issues = [];
    
    for (const file of files) {
        const url = `${BASE_URL}${file}`;
        try {
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 5000 });
            
            // Check for missing translations on the page
            const checkPageForIssues = async (lang) => {
                const i18nElements = await page.evaluate(() => {
                    let missing = [];
                    document.querySelectorAll('[data-i18n]').forEach(el => {
                        const text = el.innerText || el.placeholder || el.value;
                        if (!text || text.trim() === '') {
                            // missing.push(`Empty text for key: ${el.getAttribute('data-i18n')}`);
                        } else if (text.includes('undefined') || text.includes('null')) {
                            missing.push(`Undefined/null in key: ${el.getAttribute('data-i18n')} - Text: ${text}`);
                        }
                    });
                    return missing;
                });
                
                if (i18nElements.length > 0) {
                    issues.push({ file, lang, issues: i18nElements });
                }
            };
            
            // Default English
            await checkPageForIssues('en');
            
            // Switch to Tamil
            await page.evaluate(() => {
                if (window.setLanguage) window.setLanguage('ta');
            });
            await new Promise(r => setTimeout(r, 100));
            await checkPageForIssues('ta');
            
            // Switch to Hindi
            await page.evaluate(() => {
                if (window.setLanguage) window.setLanguage('hi');
            });
            await new Promise(r => setTimeout(r, 100));
            await checkPageForIssues('hi');
            
        } catch (e) {
            // timeout expected on some pages
        }
    }
    
    fs.writeFileSync('translation_issues.json', JSON.stringify(issues, null, 2));
    console.log(`Testing complete. Found issues on ${issues.length} language states.`);
    await browser.close();
}

run();
