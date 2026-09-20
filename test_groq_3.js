require('dotenv').config();
const GROQ_API_KEY = process.env.GROQ_API_KEY;

async function test() {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
        body: JSON.stringify({
            model: 'llama-3.2-90b-vision-preview',
            messages: [{ role: 'user', content: 'hello' }]
        })
    });
    const text = await res.text();
    console.log(res.status, text);
}
test();
