const test = async () => {
    // 1x1 transparent GIF as a mock image
    const mockImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    try {
        const response = await fetch("http://localhost:5000/api/verify-produce", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                product: "Tomato",
                images: [mockImage]
            })
        });
        console.log("Status:", response.status);
        const data = await response.json();
        console.log("Data:", data);
    } catch (err) {
        console.error("Fetch error:", err);
    }
};
test();
