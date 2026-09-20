require('dotenv').config();
const GROQ_API_KEY = process.env.GROQ_API_KEY;

async function test(model) {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
        body: JSON.stringify({
            model: model,
            messages: [{ role: 'user', content: 'hello' }]
        })
    });
    const text = await res.text();
    console.log(model, res.status, text);
}
test('llama-3.2-90b-vision-instruct');
test('llama-3.2-11b-vision');
test('llama-3.2-90b-vision');
