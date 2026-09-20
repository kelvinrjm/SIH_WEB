require('dotenv').config();
const GROQ_API_KEY = process.env.GROQ_API_KEY;

const models = [
    'llama-3.2-11b-vision-instruct',
    'llama-3.2-90b-vision-instruct',
    'llama-3.2-11b-vision-preview',
    'llama-3.2-90b-vision-preview',
    'llama-3.2-11b-text-preview',
    'llama-3.2-90b-text-preview',
    'llama3-8b-8192',
    'llama3-70b-8192',
    'llama-3.1-8b-instant',
    'llama-3.1-70b-versatile',
    'mixtral-8x7b-32768',
    'gemma2-9b-it'
];

async function testModel(model) {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
        body: JSON.stringify({
            model: model,
            messages: [{ role: 'user', content: 'hello' }]
        })
    });
    const text = await res.text();
    console.log(model, res.status, text.substring(0, 80));
}

async function run() {
    for (const m of models) {
        await testModel(m);
    }
}
run();
