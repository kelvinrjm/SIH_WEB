const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();
const GROQ_API_KEY = process.env.GROQ_API_KEY;

async function testWeather() {
    console.log("Querying groq/compound for weather in Paris...");
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
            model: 'groq/compound',
            messages: [
                { role: 'user', content: 'What is the current weather in Paris? Answer briefly.' }
            ]
        })
    });
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
}

testWeather().catch(console.error);
