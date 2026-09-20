async function test() {
    const dataUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    const response = await fetch('http://localhost:5000/api/verify-produce', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: 'Tomato', images: [dataUrl] })
    });
    console.log("Status:", response.status);
    console.log("Response:", await response.text());
}
test().catch(console.error);
