const https = require('https');
const apiKey = process.env.GROQ_API_KEY;

const modelsToTest = [
    'llama-3.2-11b-vision-preview',
    'llama-3.2-90b-vision-preview',
    'llama-3.2-11b-vision',
    'llama-3.2-90b-vision',
    'llama-3.2-11b-vision-instruct',
    'llama-3.2-90b-vision-instruct',
    'llama-vision-11b',
    'llama-vision-90b',
    'llava-v1.5-7b-4096-preview',
    'llama-3.2-11b-multimodal',
    'llama-3.2-90b-multimodal',
    'qwen-vl-max',
    'qwen-vl-plus',
    'qwen/qwen-vl-max',
    'llama3.2-11b-vision-preview',
    'llama3.2-90b-vision-preview'
];

async function testModel(model) {
    return new Promise(resolve => {
        const data = JSON.stringify({
            model: model,
            messages: [{ role: 'user', content: 'test' }]
        });
        const req = https.request('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'Content-Length': data.length
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
    for (const m of modelsToTest) {
        await testModel(m);
    }
}
run();
