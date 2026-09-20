require('dotenv').config();
const GROQ_API_KEY = process.env.GROQ_API_KEY;

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
    console.log(model, res.status, text.substring(0, 100));
}
testModel('llama-3.2-11b-vision-instruct');
testModel('llama-3.2-90b-vision-instruct');
