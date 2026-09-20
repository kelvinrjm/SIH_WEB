async function run() {
    const res = await fetch('http://localhost:5001/api/verify-produce', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: 'Tomato', images: ['data:image/jpeg;base64,fakeimage'] })
    });
    const json = await res.json();
    console.log(JSON.stringify(json, null, 2));
}
run();
