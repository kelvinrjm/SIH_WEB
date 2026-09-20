require('dotenv').config();
const CF_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CF_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const url = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/ai/models/search`;

async function test() {
    const res = await fetch(url, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${CF_API_TOKEN}` }
    });
    const text = await res.text();
    console.log(res.status, text.substring(0, 500));
}
test();
