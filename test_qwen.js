require('dotenv').config();
const https = require('https');
const apiKey = process.env.GROQ_API_KEY;

// 1x1 transparent png
const b64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

const data = JSON.stringify({
    model: 'qwen/qwen3.8-27b',
    messages: [{
        role: 'user',
        content: [
            { type: 'text', text: 'what is this' },
            { type: 'image_url', image_url: { url: `data:image/png;base64,${b64}` } }
        ]
    }]
});
const req = https.request('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
    }
}, res => {
    let body = '';
    res.on('data', d => body += d);
    res.on('end', () => {
        console.log(`qwen/qwen3.8-27b: ${res.statusCode} ${body.substring(0, 500)}`);
    });
});
req.write(data);
req.end();
