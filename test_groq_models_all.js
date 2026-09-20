require('dotenv').config();
const GROQ_API_KEY = process.env.GROQ_API_KEY;

async function test() {
    const res = await fetch('https://api.groq.com/openai/v1/models', {
        headers: { 'Authorization': `Bearer ${GROQ_API_KEY}` }
    });
    const data = await res.json();
    console.log(data.data.map(m => m.id));
}
test();
