require('dotenv').config();
const GROQ_API_KEY = process.env.GROQ_API_KEY;

async function test() {
    const res = await fetch('https://api.groq.com/openai/v1/models', {
        headers: { 'Authorization': `Bearer ${GROQ_API_KEY}` }
    });
    const data = await res.json();
    const visionModels = data.data.filter(m => m.id.includes('vision') || m.id.includes('llava'));
    console.log("Vision models:", visionModels.map(m => m.id));
}
test();
