const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// 10x10 red dot PNG base64
const image10x10 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAI0lEQVR4AeyQMQ0AAAyDSP177hwsCCgJHxcp1BgkC99Res8BAAD//+wxhQIAAAAGSURBVAMAZIwUAbOgDh0AAAAASUVORK5CYII=";

async function testVision() {
    const product = "Tomato";
    const prompt = `The selected product is "${product}".
Inspect each image in this batch. For each image, detect the agricultural produce shown.
Only fruits and vegetables are allowed. Reject grains, pulses, spices, flowers, animals, and non-produce objects.
Return a JSON object containing an array of image analyses.
Each image analysis must include:
- "detectedProduct": The name of the produce detected (e.g. "tomato", "onion", "banana", "phone", "wheat", etc.)
- "imageCategory": Category of the object ("fruit", "vegetable", "grain", "spice", "animal", "non-agricultural", or "other")
- "confidence": A float between 0.0 and 1.0 indicating confidence.
- "reason": A short reason for the detection.

Output JSON format exactly like this:
{
  "images": [
    {
      "detectedProduct": "tomato",
      "imageCategory": "vegetable",
      "confidence": 0.9,
      "reason": "Clear view of red tomatoes"
    }
  ]
}`;

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
            model: 'qwen/qwen3.8-27b',
            messages: [
                {
                    role: 'user',
                    content: [
                        { type: 'text', text: prompt },
                        { type: 'image_url', image_url: { url: image10x10 } }
                    ]
                }
            ],
            response_format: { type: "json_object" }
        })
    });
    const data = await res.json();
    console.log("Response:", JSON.stringify(data, null, 2));
}

testVision().catch(console.error);
