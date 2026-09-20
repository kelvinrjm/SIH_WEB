require('dotenv').config();
const { CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID, CF_VISION_MODEL, CF_VISION_FALLBACK_MODEL } = process.env;

const CF_API_BASE = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run`;

async function testCF() {
    console.log("Token:", CLOUDFLARE_API_TOKEN ? "present" : "missing");
    console.log("Account ID:", CLOUDFLARE_ACCOUNT_ID ? "present" : "missing");
    const dataUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    const prompt = "The seller selected the product \"Tomato\". Look at the photo and identify the main object in it.";
    
    const url = `${CF_API_BASE}/${CF_VISION_MODEL || '@cf/meta/llama-4-scout-17b-16e-instruct'}`;
    console.log("Calling URL:", url);
    
    try {
        const fetch = require('node-fetch'); // or use undici if node 18+
    } catch(e) {}
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`
        },
        body: JSON.stringify({
            max_tokens: 350,
            temperature: 0,
            messages: [
                { role: 'system', content: 'You are an agricultural produce identification system. You answer only with valid JSON.' },
                { role: 'user', content: [
                    { type: 'text', text: prompt },
                    { type: 'image_url', image_url: { url: dataUrl } }
                ] }
            ]
        })
    });
    
    console.log("Status:", response.status);
    const text = await response.text();
    console.log("Response text:", text.substring(0, 500));
}

testCF().catch(console.error);
