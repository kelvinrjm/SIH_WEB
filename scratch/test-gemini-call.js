const dotenv = require('dotenv');
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

async function callGeminiDirect() {
    const mockImage = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    const body = {
        contents: [{
            role: 'user',
            parts: [
                { text: `Analyze if the image is a Tomato. Return JSON: { "valid": true }` },
                { inlineData: { mimeType: "image/png", data: mockImage } }
            ]
        }],
        generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0
        }
    };

    console.log("Calling Gemini API...");
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        console.log("Status:", response.status);
        const data = await response.json();
        console.log("Response:", JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Error:", err);
    }
}

callGeminiDirect();
