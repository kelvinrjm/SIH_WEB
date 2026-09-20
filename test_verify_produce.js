const http = require('http');

// 1x1 transparent png
const b64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

const data = JSON.stringify({
    product: 'Tomato',
    images: [`data:image/png;base64,${b64}`, `data:image/png;base64,${b64}`]
});

const req = http.request('http://localhost:5000/api/verify-produce', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
    }
}, res => {
    let body = '';
    res.on('data', d => body += d);
    res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        console.log(`Response: ${body}`);
    });
});
req.write(data);
req.end();
