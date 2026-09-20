require('dotenv').config();
const CF_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CF_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const url = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/ai/v1/chat/completions`;

async function test() {
    console.log("Token:", CF_API_TOKEN);
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${CF_API_TOKEN}` },
        body: JSON.stringify({
            model: '@cf/meta/llama-3.2-11b-vision-instruct',
            messages: [
                {
                    role: 'user',
                    content: 'What is this?',
                    // Wait, Cloudflare vision model requires an image?
                    // Let's just send text to see if auth passes (should return a generation or a 400 for missing image, but not 401).
                }
            ]
        })
    });
    const text = await res.text();
    console.log(res.status, text);
}
test();
