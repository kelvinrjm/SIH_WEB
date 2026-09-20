require('dotenv').config();
const GROQ_API_KEY = process.env.GROQ_API_KEY;

async function listModels() {
    try {
        const res = await fetch('https://api.groq.com/openai/v1/models', {
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`
            }
        });
        console.log('Status:', res.status);
        const data = await res.json();
        console.log('Available models:', data.data.map(m => m.id).join(', '));
    } catch (e) {
        console.error('Error listing models:', e.message);
    }
}

listModels();
