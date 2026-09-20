require('dotenv').config();
const GROQ_API_KEY = process.env.GROQ_API_KEY;

async function testSearchNoJSON() {
    console.log('Testing search with groq/compound (NO JSON mode)...');
    const body = {
        model: 'groq/compound',
        messages: [
            { role: 'user', content: 'What is the current mandi wholesale price of Tomato in Virudhunagar, Tamil Nadu today?' }
        ]
    };
    try {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify(body)
        });
        console.log('Search Status (No JSON):', res.status);
        const data = await res.json();
        console.log('Search Response (No JSON):', JSON.stringify(data, null, 2));
    } catch (e) {
        console.error('Search error (No JSON):', e.message);
    }
}

async function testSearchMiniNoJSON() {
    console.log('Testing search with groq/compound-mini (NO JSON mode)...');
    const body = {
        model: 'groq/compound-mini',
        messages: [
            { role: 'user', content: 'What is the current mandi wholesale price of Tomato in Virudhunagar, Tamil Nadu today?' }
        ]
    };
    try {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify(body)
        });
        console.log('Search Status Mini (No JSON):', res.status);
        const data = await res.json();
        console.log('Search Response Mini (No JSON):', JSON.stringify(data, null, 2));
    } catch (e) {
        console.error('Search error Mini (No JSON):', e.message);
    }
}

async function testQwen38Text() {
    console.log('Testing text completion with qwen/qwen3.8-27b...');
    const body = {
        model: 'qwen/qwen3.8-27b',
        messages: [
            { role: 'user', content: 'What is the current mandi wholesale price of Tomato in Virudhunagar, Tamil Nadu today?' }
        ]
    };
    try {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify(body)
        });
        console.log('Qwen3.8 Status:', res.status);
        const data = await res.json();
        console.log('Qwen3.8 Response:', JSON.stringify(data, null, 2));
    } catch (e) {
        console.error('Qwen3.8 error:', e.message);
    }
}

async function run() {
    await testSearchNoJSON();
    await testSearchMiniNoJSON();
    await testQwen38Text();
}

run();
