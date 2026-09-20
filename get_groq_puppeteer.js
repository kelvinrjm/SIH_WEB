const puppeteer = require('puppeteer');
async function run() {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('https://console.groq.com/docs/models', { waitUntil: 'networkidle2' });
    const text = await page.evaluate(() => document.body.innerText);
    const matches = text.match(/llama-3\.2-[a-z0-9-]+vision[a-z0-9-]*/ig);
    console.log(matches ? [...new Set(matches)] : "No matches found");
    await browser.close();
}
run();
