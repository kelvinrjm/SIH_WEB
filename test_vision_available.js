require('dotenv').config();
const https = require('https');
const apiKey = process.env.GROQ_API_KEY;

const models = [
    'openai/gpt-oss-safeguard-20b',
    'openai/gpt-oss-20b',
    'groq/compound',
    'openai/gpt-oss-120b',
    'qwen/qwen3.8-27b',
    'allam-2-7b',
    'canopylabs/orpheus-arabic-saudi',
    'meta-llama/llama-prompt-guard-2-86m',
    'whisper-large-v3',
    'qwen/qwen3.6-27b',
    'meta-llama/llama-prompt-guard-2-22m',
    'canopylabs/orpheus-v1-english',
    'whisper-large-v3-turbo',
    'groq/compound-mini'
];

async function testModel(model) {
    return new Promise(resolve => {
        const data = JSON.stringify({
            model: model,
            messages: [{
                role: 'user',
                content: [
                    { type: 'text', text: 'describe this' },
                    { type: 'image_url', image_url: { url: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAGBAQABPxA=' } }
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
                console.log(`${model}: ${res.statusCode} ${body.substring(0, 100)}`);
                resolve();
            });
        });
        req.write(data);
        req.end();
    });
}

async function run() {
    for (const m of models) {
        await testModel(m);
    }
}
run();
