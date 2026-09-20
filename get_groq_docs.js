async function run() {
    const res = await fetch('https://console.groq.com/docs/models');
    const text = await res.text();
    // Look for vision models in the text
    const matches = text.match(/llama-3\.2-[a-z0-9-]+vision[a-z0-9-]*/g);
    console.log(matches ? [...new Set(matches)] : "No matches found");
}
run();
