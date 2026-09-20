const dotenv = require('dotenv');
dotenv.config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

async function testHeader() {
    console.log("Testing x-goog-api-key header...");
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': GEMINI_API_KEY
            },
            body: JSON.stringify({ contents: [{ parts: [{ text: "Hello" }] }] })
        });
        console.log("Header response status:", response.status);
        const data = await response.json();
        console.log("Header response text excerpt:", data.candidates?.[0]?.content?.parts?.[0]?.text);
    } catch (e) {
        console.error("Header test error:", e);
    }
}

async function testQuery() {
    console.log("Testing ?key= query param...");
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: "Hello" }] }] })
        });
        console.log("Query response status:", response.status);
        const data = await response.json();
        console.log("Query response text excerpt:", data.candidates?.[0]?.content?.parts?.[0]?.text);
    } catch (e) {
        console.error("Query test error:", e);
    }
}

async function run() {
    await testHeader();
    await testQuery();
}
run();
