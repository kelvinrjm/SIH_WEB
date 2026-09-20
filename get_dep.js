const https = require('https');
https.get('https://console.groq.com/docs/deprecations', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        // extract the actual URL if it redirects, or find the text.
        // It's a next.js app, so the data is in a __NEXT_DATA__ script tag.
        const match = data.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/);
        if (match) {
            const json = JSON.parse(match[1]);
            // stringify and grep for llama-3.2
            const str = JSON.stringify(json);
            const words = str.match(/llama-3\.2-[a-z0-9-]+vision[a-z0-9-]*/ig);
            console.log(words ? [...new Set(words)] : "No vision models found in Next data");
        } else {
            console.log("No Next data found");
        }
    });
});
