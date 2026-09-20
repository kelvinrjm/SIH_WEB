const https = require('https');
require('dotenv').config();
const req = https.request('https://api.groq.com/openai/v1/models', {
    headers: { 'Authorization': 'Bearer ' + process.env.GROQ_API_KEY }
}, (res) => {
    let data = '';
    res.on('data', d => data += d);
    res.on('end', () => {
        const json = JSON.parse(data);
        if (json.data) {
            console.log(json.data.map(m => m.id).join('\n'));
        } else {
            console.log("No data", data);
        }
    });
});
req.end();
