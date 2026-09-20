const dotenv = require('dotenv');
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
console.log('Gemini API Key:', GEMINI_API_KEY ? 'Present' : 'Missing');

async function test() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`);
        const data = await response.json();
        console.log('Models status:', response.status);
        if (data.models) {
            console.log('Available models:', data.models.map(m => m.name));
        } else {
            console.log('Response body:', JSON.stringify(data, null, 2));
        }
    } catch (err) {
        console.error('Error:', err);
    }
}
test();
