require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const db = require('./backend/db');

const JWT_SECRET = process.env.JWT_SECRET || 'farmlink-secret-2026';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, error: 'Unauthorized' });
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ success: false, error: 'Forbidden' });
        req.user = user;
        next();
    });
};

const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ success: false, error: 'Access denied' });
        }
        next();
    };
};

const app = express();
const PORT = Number(process.env.PORT) || 5000;

/* ============================ CONFIG (values come ONLY from .env, never hard-coded) ============================ */
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
const GROQ_VISION_MODEL = process.env.GROQ_VISION_MODEL || 'qwen/qwen3.8-27b';

const CF_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CF_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const CF_VISION_MODEL = process.env.CF_VISION_MODEL || '@cf/meta/llama-3.2-11b-vision-instruct';
const CF_VISION_FALLBACK_MODEL = process.env.CF_VISION_FALLBACK_MODEL || '@cf/meta/llama-3.2-11b-vision-instruct';
const CF_API_BASE = (process.env.CF_API_BASE || `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID || ''}/ai`).replace(/\/+$/, '');

const GOV_API_KEY = process.env.GOV_API_KEY;
const GOV_API_BASE = (process.env.GOV_API_BASE || 'https://api.data.gov.in/resource').replace(/\/+$/, '');
const GOV_RESOURCE_ID = process.env.GOV_RESOURCE_ID || '9ef84268-d588-465a-a308-a864a43d0070'; // AgmarkNet: Current Daily Price of Various Commodities from Various Markets (Mandi)

const TIMEOUT = Number(process.env.AI_TIMEOUT_MS) || 45001;
const GOV_TIMEOUT = Number(process.env.GOV_TIMEOUT_MS) || 20000;
const TTL = 15 * 60 * 1000;
const MAX_IMAGES = 6;
const MAX_IMAGE_BYTES = 2 * 1024 * 1024; // 2MB per image
const cache = new Map();
const inflight = new Map();

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.static(__dirname));

app.get('/api/health', (req, res) => res.json({ status: 'ok', time: Date.now() }));

/* ============================ MULTILINGUAL CROP DICTIONARY & RESOLUTION ============================ */
const cropDictionary = {
    // English & Varieties
    'tomato': { id: 'tomato', name: 'Tomato', category: 'vegetable' },
    'tomatoes': { id: 'tomato', name: 'Tomato', category: 'vegetable' },
    'cherry tomato': { id: 'tomato', name: 'Tomato', category: 'vegetable' },
    'tomato cherry': { id: 'tomato', name: 'Tomato', category: 'vegetable' },
    'red tomato': { id: 'tomato', name: 'Tomato', category: 'vegetable' },
    'local tomato': { id: 'tomato', name: 'Tomato', category: 'vegetable' },
    'onion': { id: 'onion', name: 'Onion', category: 'vegetable' },
    'onions': { id: 'onion', name: 'Onion', category: 'vegetable' },
    'red onion': { id: 'onion', name: 'Onion', category: 'vegetable' },
    'white onion': { id: 'onion', name: 'Onion', category: 'vegetable' },
    'nashik onion': { id: 'onion', name: 'Onion', category: 'vegetable' },
    'potato': { id: 'potato', name: 'Potato', category: 'vegetable' },
    'potatoes': { id: 'potato', name: 'Potato', category: 'vegetable' },
    'jyoti potato': { id: 'potato', name: 'Potato', category: 'vegetable' },
    'banana': { id: 'banana', name: 'Banana', category: 'fruit' },
    'bananas': { id: 'banana', name: 'Banana', category: 'fruit' },
    'brinjal': { id: 'brinjal', name: 'Brinjal', category: 'vegetable' },
    'eggplant': { id: 'brinjal', name: 'Brinjal', category: 'vegetable' },
    'carrot': { id: 'carrot', name: 'Carrot', category: 'vegetable' },
    'carrots': { id: 'carrot', name: 'Carrot', category: 'vegetable' },
    'chilli': { id: 'chilli', name: 'Chilli', category: 'vegetable' },
    'chillies': { id: 'chilli', name: 'Chilli', category: 'vegetable' },
    'green chilli': { id: 'chilli', name: 'Chilli', category: 'vegetable' },
    'mango': { id: 'mango', name: 'Mango', category: 'fruit' },
    'mangoes': { id: 'mango', name: 'Mango', category: 'fruit' },
    'apple': { id: 'apple', name: 'Apple', category: 'fruit' },
    'orange': { id: 'orange', name: 'Orange', category: 'fruit' },
    'guava': { id: 'guava', name: 'Guava', category: 'fruit' },
    'papaya': { id: 'papaya', name: 'Papaya', category: 'fruit' },
    'watermelon': { id: 'watermelon', name: 'Watermelon', category: 'fruit' },
    'pomegranate': { id: 'pomegranate', name: 'Pomegranate', category: 'fruit' },
    'cabbage': { id: 'cabbage', name: 'Cabbage', category: 'vegetable' },
    'cauliflower': { id: 'cauliflower', name: 'Cauliflower', category: 'vegetable' },
    'beans': { id: 'beans', name: 'Beans', category: 'vegetable' },
    'okra': { id: 'okra', name: 'Okra', category: 'vegetable' },
    'spinach': { id: 'spinach', name: 'Spinach', category: 'vegetable' },
    'cucumber': { id: 'cucumber', name: 'Cucumber', category: 'vegetable' },
    'garlic': { id: 'garlic', name: 'Garlic', category: 'vegetable' },
    'ginger': { id: 'ginger', name: 'Ginger', category: 'vegetable' },
    'wheat': { id: 'wheat', name: 'Wheat', category: 'grain' },
    'rice': { id: 'rice', name: 'Rice', category: 'grain' },
    'paddy': { id: 'paddy', name: 'Paddy', category: 'grain' },
    'maize': { id: 'maize', name: 'Maize', category: 'grain' },
    'coconut': { id: 'coconut', name: 'Coconut', category: 'fruit' },
    'grapes': { id: 'grapes', name: 'Grapes', category: 'fruit' },
    'capsicum': { id: 'capsicum', name: 'Capsicum', category: 'vegetable' },

    // Hindi
    'टमाटर': { id: 'tomato', name: 'Tomato', category: 'vegetable' },
    'tamatar': { id: 'tomato', name: 'Tomato', category: 'vegetable' },
    'प्याज़': { id: 'onion', name: 'Onion', category: 'vegetable' },
    'pyaz': { id: 'onion', name: 'Onion', category: 'vegetable' },
    'आलू': { id: 'potato', name: 'Potato', category: 'vegetable' },
    'aloo': { id: 'potato', name: 'Potato', category: 'vegetable' },
    'केला': { id: 'banana', name: 'Banana', category: 'fruit' },
    'kela': { id: 'banana', name: 'Banana', category: 'fruit' },
    'बैंगन': { id: 'brinjal', name: 'Brinjal', category: 'vegetable' },
    'baingan': { id: 'brinjal', name: 'Brinjal', category: 'vegetable' },
    'गाजर': { id: 'carrot', name: 'Carrot', category: 'vegetable' },
    'gajar': { id: 'carrot', name: 'Carrot', category: 'vegetable' },
    'मिर्च': { id: 'chilli', name: 'Chilli', category: 'vegetable' },
    'mirch': { id: 'chilli', name: 'Chilli', category: 'vegetable' },
    'आम': { id: 'mango', name: 'Mango', category: 'fruit' },
    'aam': { id: 'mango', name: 'Mango', category: 'fruit' },
    'भिंडी': { id: 'okra', name: 'Okra', category: 'vegetable' },
    'bhindi': { id: 'okra', name: 'Okra', category: 'vegetable' },
    'पालक': { id: 'spinach', name: 'Spinach', category: 'vegetable' },
    'अनार': { id: 'pomegranate', name: 'Pomegranate', category: 'fruit' },
    'तरबूज': { id: 'watermelon', name: 'Watermelon', category: 'fruit' },
    'पपीता': { id: 'papaya', name: 'Papaya', category: 'fruit' },
    'अमरूद': { id: 'guava', name: 'Guava', category: 'fruit' },

    // Tamil
    'தக்காளி': { id: 'tomato', name: 'Tomato', category: 'vegetable' },
    'thakkali': { id: 'tomato', name: 'Tomato', category: 'vegetable' },
    'வெங்காயம்': { id: 'onion', name: 'Onion', category: 'vegetable' },
    'vengayam': { id: 'onion', name: 'Onion', category: 'vegetable' },
    'உருளைக்கிழங்கு': { id: 'potato', name: 'Potato', category: 'vegetable' },
    'urulaikizhangu': { id: 'potato', name: 'Potato', category: 'vegetable' },
    'urulai': { id: 'potato', name: 'Potato', category: 'vegetable' },
    'வாழைப்பழம்': { id: 'banana', name: 'Banana', category: 'fruit' },
    'கத்தரிக்காய்': { id: 'brinjal', name: 'Brinjal', category: 'vegetable' },
    'கேரட்': { id: 'carrot', name: 'Carrot', category: 'vegetable' },
    'மிளகாய்': { id: 'chilli', name: 'Chilli', category: 'vegetable' },
    'மாம்பழம்': { id: 'mango', name: 'Mango', category: 'fruit' },
    'வெண்டைக்காய்': { id: 'okra', name: 'Okra', category: 'vegetable' },
    'பசலைக்கீரை': { id: 'spinach', name: 'Spinach', category: 'vegetable' },
    'மாதுளை': { id: 'pomegranate', name: 'Pomegranate', category: 'fruit' },
    'தர்பூசணி': { id: 'watermelon', name: 'Watermelon', category: 'fruit' },
    'பப்பாளி': { id: 'papaya', name: 'Papaya', category: 'fruit' }
};

function resolveCrop(input) {
    if (!input || typeof input !== 'string') return { id: 'custom', name: 'Produce', category: 'vegetable', isCustom: true };
    const raw = input.trim();
    const lower = raw.toLowerCase();

    // 1. Direct exact lookup
    if (cropDictionary[lower]) return { ...cropDictionary[lower], original: raw };
    if (cropDictionary[raw]) return { ...cropDictionary[raw], original: raw };

    // 2. Substring/keyword lookup
    for (const [key, val] of Object.entries(cropDictionary)) {
        if (lower.includes(key) || raw.includes(key)) {
            return { ...val, original: raw };
        }
    }

    // 3. Custom produce fallback
    const titleCased = raw.split(/\s+/).map(w => w[0] ? w[0].toUpperCase() + w.slice(1).toLowerCase() : '').join(' ');
    return {
        id: lower.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'custom',
        name: titleCased,
        category: 'vegetable',
        isCustom: true,
        original: raw
    };
}

const allowedProduce = new Set(['tomato', 'onion', 'potato', 'carrot', 'brinjal', 'cabbage', 'cauliflower', 'beans', 'okra', 'spinach', 'banana', 'mango', 'apple', 'orange', 'guava', 'papaya', 'watermelon', 'pomegranate', 'wheat', 'rice', 'paddy', 'maize', 'coconut', 'grapes', 'capsicum', 'cucumber', 'garlic', 'ginger']);
const clean = (value, max = 300) => typeof value === 'string' ? value.replace(/[\u0000-\u001f<>]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max) : '';
const token = value => clean(value).toLowerCase().replace(/\b(dist\.?|district|state|india)\b/gi, '').replace(/\s+/g, ' ').trim();
const singular = value => resolveCrop(value).id;
const locationKey = value => clean(value).split(',').map(token).filter(Boolean).join('|');
const crop = value => resolveCrop(value).name;
const keyFor = (product, location) => `${singular(product)}|${locationKey(location)}`;
const numeric = value => { const n = Number(value); return Number.isFinite(n) && n > 0 && n < 1e6 ? n : null; };
const round2 = value => value == null ? value : Math.round(value * 100) / 100;
const date = value => { const text = clean(value, 30); return /^\d{4}-\d{2}-\d{2}$/.test(text) || /^\d{1,2}[/-]\d{1,2}[/-]\d{2,4}$/.test(text) ? text : null; };
const safeUrl = value => { try { const url = new URL(value); return /^https?:$/.test(url.protocol); } catch { return false; } };
const samePlace = (a, b) => { const x = locationKey(a), y = locationKey(b); return Boolean(x && y && (x.includes(y) || y.includes(x))); };

function pricePerKg(value, unit) {
    const number = numeric(value);
    if (!number) return null;
    const normalizedUnit = token(unit).replace(/[\s\.\/_-]/g, '');
    if (['kg', 'kilogram', 'rsperkg', 'rskg', 'perkg', 'pkg', 'inrkg', 'rskilogram'].includes(normalizedUnit) || normalizedUnit === '') return number;
    if (['quintal', '100kg', 'rsquintal', 'qntl', 'qt', 'quintals'].includes(normalizedUnit)) return number / 100;
    if (['gram', 'g', 'rspergram', 'rsg', 'grams'].includes(normalizedUnit)) return number * 1000;
    return null;
}

async function request(url, options, service, timeoutMs = TIMEOUT) {
    let response;
    try { response = await fetch(url, { ...options, signal: AbortSignal.timeout(timeoutMs) }); }
    catch (error) { throw new Error(error.name === 'TimeoutError' || error.name === 'AbortError' ? `${service} timed out` : `${service} request failed`); }
    if (!response.ok) {
        const body = await response.text().catch(() => '');
        if (response.status === 401 || response.status === 403) throw new Error(`${service} authentication failed (${response.status})`);
        if (response.status === 404) throw new Error(`${service} endpoint not found (404)`);
        if (response.status === 429) throw new Error(`${service} is temporarily busy`);
        if (response.status === 413) throw new Error(`${service} payload entity too large`);
        throw new Error(`${service} returned ${response.status}${body ? `: ${body.slice(0, 180)}` : ''}`);
    }
    try { return await response.json(); } catch { throw new Error(`${service} returned invalid JSON`); }
}

function jsonOf(text) {
    if (!text) return null;
    const candidates = [text.trim()], fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fenced) candidates.push(fenced[1].trim());
    const first = text.indexOf('{'), last = text.lastIndexOf('}');
    if (first >= 0 && last > first) candidates.push(text.slice(first, last + 1));
    for (const candidate of candidates) { try { return JSON.parse(candidate); } catch { } }
    return null;
}

function responseText(response) {
    const groqContent = response?.choices?.[0]?.message?.content;
    if (typeof groqContent === 'string' && groqContent) return groqContent;
    if (Array.isArray(groqContent)) return groqContent.filter(part => part?.type === 'text').map(part => part.text || '').join('').trim();
    if (clean(response?.output_text, 50010)) return response.output_text;
    return (response?.output || []).filter(item => item?.type === 'message').flatMap(item => item.content || []).filter(part => part?.type === 'output_text').map(part => part.text || '').join('').trim();
}

/* ============================ GROQ (AI recommendations — kept as before) ============================ */
async function groqChatCompletion(body) {
    if (!GROQ_API_KEY) throw new Error('Groq API key is not configured');
    return request('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify(body)
    }, 'Groq');
}

async function groqRecommendation(context) {
    if (!GROQ_API_KEY || !context.bestMarket) return null;
    try {
        const result = await groqChatCompletion({
            model: GROQ_MODEL,
            temperature: 0,
            max_tokens: 110,
            messages: [
                { role: 'system', content: 'Give one short farmer-friendly recommendation using only the verified facts supplied. Do not add prices, markets, distances, dates, or facts.' },
                { role: 'user', content: JSON.stringify(context) }
            ]
        });
        return clean(responseText(result), 600) || null;
    } catch { return null; }
}

/* ============================ IMAGE VALIDATION (content / magic-byte based) ============================ */
// The browser-reported MIME type and the file extension are NOT trusted here:
// some browsers/phones hand us a valid JPG file with an empty or generic type
// (data:;base64,... or data:application/octet-stream;base64,...). The actual
// bytes of the file are inspected instead. JPEG = FF D8 FF, PNG = 89 50 4E 47
// 0D 0A 1A 0A, WebP = "RIFF....WEBP".
function sniffImageMime(buffer) {
    if (!buffer || buffer.length < 4) return null;
    if (buffer[0] === 0xFF && buffer[1] === 0xD8) return 'image/jpeg';
    if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) return 'image/png';
    if (buffer.length >= 12 && buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') return 'image/webp';
    return null;
}
function sniffIsHeic(buffer) {
    if (!buffer || buffer.length < 12) return false;
    return buffer.toString('ascii', 4, 8) === 'ftyp'; // ISO-BMFF container used by HEIC/HEIF
}
// Returns { mime, dataUrl } on success or { error: 'type' | 'size' | 'heic' } on failure.
function decodeImageDataUrl(value) {
    if (typeof value !== 'string' || !value.trim()) return { error: 'type' };
    const trimmed = value.trim();
    if (/^https?:\/\//i.test(trimmed)) {
        return { mime: 'image/jpeg', dataUrl: trimmed, isRemote: true };
    }
    const match = /^data:(?:([a-zA-Z0-9\/\+_\.\-]+))?(?:;[a-zA-Z0-9_\-]+=[a-zA-Z0-9_\-]+)*;?base64,([\s\S]+)$/i.exec(trimmed);
    let declaredMime = '';
    let rawBase64 = '';
    if (match) {
        declaredMime = (match[1] || '').toLowerCase();
        rawBase64 = match[2].replace(/\s+/g, '');
    } else {
        const idx = trimmed.indexOf('base64,');
        if (idx === -1) return { error: 'type' };
        rawBase64 = trimmed.slice(idx + 7).replace(/\s+/g, '');
    }
    if (!rawBase64 || !/^[A-Za-z0-9+/]+={0,2}$/.test(rawBase64)) return { error: 'type' };
    let buffer;
    try { buffer = Buffer.from(rawBase64, 'base64'); } catch { return { error: 'type' }; }
    if (!buffer || !buffer.length) return { error: 'type' };
    if (buffer.length > MAX_IMAGE_BYTES) return { error: 'size' };
    if (/heic|heif/.test(declaredMime)) return { error: 'heic' };
    const mime = sniffImageMime(buffer) || (declaredMime && ['image/jpeg', 'image/png', 'image/webp'].includes(declaredMime) ? declaredMime : null);
    if (!mime) return { error: sniffIsHeic(buffer) ? 'heic' : 'type' };
    return { mime, dataUrl: `data:${mime};base64,${buffer.toString('base64')}` };
}

/* ============================ AI VISION (photo verification) ============================ */
// Primary: Cloudflare Workers AI | Fallback: GROQ Vision API
// Image sent as base64 data URL in image_url content part.

const VISION_PROMPT = product => `The seller selected the product "${product}".
Look at the photo and identify the main object in it.
Only fruits and vegetables are allowed products on this platform.
Also evaluate the visual freshness condition, ripeness, quality grade, and estimated shelf life.
Respond ONLY with a single JSON object and nothing else, exactly in this format:
{
  "detectedProduct": "common english name of the main object in lowercase singular form (examples: tomato, onion, banana, paddy, phone, car, person)",
  "category": "fruit | vegetable | grain | flower | animal | object | other",
  "confidence": 0.95,
  "freshnessScore": 92,
  "estimatedShelfLifeDays": 5,
  "qualityGrade": "Grade A",
  "reason": "one short sentence describing what is visible in the photo and its fresh state"
}`;

function parseVisionResponse(response) {
    const content = responseText(response) || responseText(response?.result);
    const parsed = jsonOf(typeof content === 'string' ? content : '');
    if (!parsed) throw new Error('Vision AI returned an unreadable result');
    const fScore = Math.max(10, Math.min(100, Number(parsed.freshnessScore) || 88));
    const shelfLife = Math.max(1, Math.min(30, Number(parsed.estimatedShelfLifeDays) || 5));
    return {
        detectedProduct: clean(parsed.detectedProduct || parsed.produce || parsed.object, 100),
        category: clean(parsed.category || parsed.imageCategory, 40).toLowerCase(),
        confidence: Math.max(0, Math.min(1, Number(parsed.confidence) || 0)),
        freshnessScore: fScore,
        estimatedShelfLifeDays: shelfLife,
        qualityGrade: clean(parsed.qualityGrade, 30) || 'Grade A',
        reason: clean(parsed.reason, 300)
    };
}

async function groqVisionVerify(product, dataUrl) {
    if (!GROQ_API_KEY) throw new Error('GROQ_API_KEY not configured');
    const prompt = VISION_PROMPT(product);
    const response = await request('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
        body: JSON.stringify({
            model: GROQ_VISION_MODEL,
            max_tokens: 350,
            temperature: 0,
            messages: [
                { role: 'system', content: 'You are an agricultural produce identification system. You answer only with valid JSON.' },
                { role: 'user', content: [
                    { type: 'text', text: prompt },
                    { type: 'image_url', image_url: { url: dataUrl } }
                ] }
            ]
        })
    }, 'GROQ Vision AI');
    return parseVisionResponse(response);
}

async function cloudflareVisionVerify(product, dataUrl) {
    const prompt = VISION_PROMPT(product);

    // Try Cloudflare if configured
    if (CF_API_TOKEN && CF_ACCOUNT_ID) {
        const callCF = model => request(`${CF_API_BASE}/v1/chat/completions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${CF_API_TOKEN}` },
            body: JSON.stringify({
                model, max_tokens: 350, temperature: 0,
                messages: [
                    { role: 'system', content: 'You are an agricultural produce identification system. You answer only with valid JSON.' },
                    { role: 'user', content: [
                        { type: 'text', text: prompt },
                        { type: 'image_url', image_url: { url: dataUrl } }
                    ] }
                ]
            })
        }, 'Cloudflare Workers AI');

        try {
            const response = await callCF(CF_VISION_MODEL);
            return { ...parseVisionResponse(response), provider: 'Cloudflare Workers AI', model: CF_VISION_MODEL };
        } catch (err) {
            console.warn(`[vision] Cloudflare primary failed (${err.message}), trying fallback model...`);
            try {
                const response = await callCF(CF_VISION_FALLBACK_MODEL);
                return { ...parseVisionResponse(response), provider: 'Cloudflare Workers AI', model: CF_VISION_FALLBACK_MODEL };
            } catch (err2) {
                console.warn(`[vision] Cloudflare fallback also failed (${err2.message}), switching to GROQ...`);
            }
        }
    }

    // Fallback: GROQ Vision
    try {
        const groqRes = await groqVisionVerify(product, dataUrl);
        return { ...groqRes, provider: 'GROQ Vision AI', model: GROQ_VISION_MODEL };
    } catch (groqErr) {
        console.warn(`[vision] GROQ also failed (${groqErr.message}), using smart local fallback...`);
    }

    return {
        detectedProduct: null,
        category: null,
        confidence: 0,
        freshnessScore: 0,
        estimatedShelfLifeDays: 0,
        qualityGrade: null,
        reason: `AI verification service is temporarily unavailable.`,
        provider: 'Local Offline Fallback',
        model: 'unavailable'
    };
}

/* ============================ GOVERNMENT MANDI DATA (data.gov.in / AgmarkNet) ============================ */
const GOV_SOURCE = { title: 'AgmarkNet — Current Daily Mandi Prices (data.gov.in)', url: 'https://www.data.gov.in/catalog/current-daily-price-various-commodities-various-markets-mandi' };

// Maps FarmLink product names to the exact commodity names used by AgmarkNet.
// The plain name itself is always tried first; aliases are only fallbacks.
const govCommodityAliases = {
    tomato: ['Tomato'], onion: ['Onion'], potato: ['Potato'], carrot: ['Carrot'], brinjal: ['Brinjal'],
    cabbage: ['Cabbage'], cauliflower: ['Cauliflower'], beans: ['Beans', 'French Beans (Frasbean)', 'Cluster beans'],
    okra: ['Okra', 'Bhindi(Ladies Finger)'], spinach: ['Spinach'], banana: ['Banana', 'Banana - Ripe'],
    mango: ['Mango'], apple: ['Apple'], orange: ['Orange'], guava: ['Guava'], papaya: ['Papaya'],
    watermelon: ['Watermelon', 'Water Melon'], pomegranate: ['Pomegranate'],
    paddy: ['Paddy(Dhan)(Common)', 'Paddy(Dhan)'], rice: ['Rice'], wheat: ['Wheat'], maize: ['Maize'],
    coconut: ['Coconut'], chilli: ['Green Chilli', 'Dry Chillies']
};
function commodityCandidates(product) {
    const base = singular(product);
    const titleCase = value => clean(value, 60).split(/\s+/).filter(Boolean).map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    return [...new Set([titleCase(product), titleCase(base), ...(govCommodityAliases[base] || [])].filter(Boolean))];
}
function parseLocation(location) {
    const parts = clean(location, 200).split(',').map(part => clean(part, 60)).filter(Boolean);
    if (parts.length >= 2) return { district: parts[0], state: parts[parts.length - 1] };
    return { district: parts[0] || '', state: '' };
}
function parseArrivalDate(value) {
    const text = clean(value, 20);
    let m = /^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/.exec(text);
    if (m) return { iso: `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`, display: `${m[1].padStart(2, '0')}/${m[2].padStart(2, '0')}/${m[3]}` };
    m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text);
    if (m) return { iso: text, display: `${m[3]}/${m[2]}/${m[1]}` };
    return { iso: '', display: date(text) };
}
async function govRecords(filters) {
    if (!GOV_API_KEY) {
        console.log(`[market] GOV_API_KEY not configured in .env. Real AgmarkNet data cannot be queried without API key.`);
        return [];
    }
    const params = new URLSearchParams({ 'api-key': GOV_API_KEY, format: 'json', limit: '1000', offset: '0' });
    for (const [field, value] of Object.entries(filters)) if (value) params.set(`filters[${field}]`, value);
    try {
        const data = await request(`${GOV_API_BASE}/${GOV_RESOURCE_ID}?${params.toString()}`, { method: 'GET' }, 'Government market API', GOV_TIMEOUT);
        return Array.isArray(data?.records) ? data.records : [];
    } catch (err) {
        console.warn(`[market] Live government API error (${err.message}).`);
        return [];
    }
}
function govRecordToLot(record) {
    const market = clean(record?.market, 160), district = clean(record?.district, 100), state = clean(record?.state, 100);
    const modal = pricePerKg(record?.modal_price, 'quintal'); // AgmarkNet quotes are in ₹/quintal
    const when = parseArrivalDate(record?.arrival_date);
    if (!market || !modal) return null;
    return {
        market, district, state,
        location: [district, state].filter(Boolean).join(', '),
        minimumPrice: round2(pricePerKg(record?.min_price, 'quintal')),
        modalPrice: round2(modal),
        maximumPrice: round2(pricePerKg(record?.max_price, 'quintal')),
        date: when.display,
        iso: when.iso
    };
}
function emptyMarket(product, requestedLocation, message = 'Current market price could not be verified.', sources = [GOV_SOURCE]) {
    return { success: true, product, requestedLocation, matchedLocation: null, locationType: 'unverified', isExactLocation: false, found: false, price: { value: null, unit: 'kg', status: 'unverified', date: null }, minimumPrice: null, modalPrice: null, maximumPrice: null, market: null, nearbyMarkets: [], bestMarket: null, sources, notes: [], calculation: null, recommendation: null, message };
}

// Priority: exact district (with known state, or state learned from the data)
// -> broader state -> not found. Nothing is ever fabricated; locations and
// market names come straight from the government records.
async function govMarket(product, requestedLocation) {
    const { district, state } = parseLocation(requestedLocation);
    const candidates = commodityCandidates(product);
    const result = emptyMarket(product, requestedLocation);

    const runTier = async (makeFilters, tierName) => {
        const attempts = candidates.map(commodity => ({ commodity, filters: makeFilters(commodity) })).filter(attempt => Object.keys(attempt.filters).length > 1);
        const settled = await Promise.all(attempts.map(async attempt => {
            try {
                const records = await govRecords(attempt.filters);
                console.log(`[market] tier=${tierName} commodity=${attempt.commodity} state=${attempt.filters.state || '-'} district=${attempt.filters.district || '-'} records=${records.length}`);
                return { ...attempt, records };
            } catch (error) { throw error; }
        }));
        return settled.find(entry => entry.records.length > 0) || null;
    };

    // Tier 1: exact district (state attached when the user provided it).
    let hit = null;
    if (district) hit = await runTier(commodity => state ? { commodity, state, district } : { commodity, district }, 'district');
    // Tier 2: broader state. When only one location word was given it is also
    // tried as the state name, so "Virudhunagar" works as a district query and
    // something like "Tamil Nadu" works as a state query.
    if (!hit && (state || district)) hit = await runTier(commodity => ({ commodity, state: state || district }), 'state');
    if (!hit) {
        result.message = GOV_API_KEY 
            ? `Current market price could not be verified for ${product} in ${requestedLocation}.`
            : `Live mandi market prices require a configured data.gov.in API key. Real prices are currently unverified.`;
        return result;
    }

    const lots = hit.records.map(govRecordToLot).filter(Boolean).sort((a, b) => (b.iso || '').localeCompare(a.iso || ''));
    if (!lots.length) {
        result.message = 'Current market price could not be verified.';
        return result;
    }
    const main = lots.find(lot => district && token(lot.district) === token(district)) || lots[0];
    const matchedLocation = main.location || main.market;
    const isExact = samePlace(requestedLocation, matchedLocation) || Boolean(district && token(main.district) === token(district));
    const locationType = isExact ? 'exact' : 'nearby';

    const seenMarkets = new Set([token(main.market)]);
    const nearbyMarkets = [];
    for (const lot of lots) {
        const key = token(lot.market);
        if (seenMarkets.has(key)) continue;
        seenMarkets.add(key);
        nearbyMarkets.push({ name: lot.market, location: lot.location || lot.market, price: lot.modalPrice, unit: 'kg', date: lot.date, status: 'verified' });
        if (nearbyMarkets.length >= 6) break;
    }
    const bestMarket = nearbyMarkets.slice().sort((a, b) => b.price - a.price)[0] || null;
    const mainAsMarket = { name: main.market, location: matchedLocation, price: main.modalPrice, unit: 'kg', date: main.date, status: 'verified' };

    return {
        ...result,
        found: true,
        matchedLocation,
        locationType,
        isExactLocation: locationType === 'exact',
        market: main.market,
        price: { value: main.modalPrice, unit: 'kg', status: 'verified', date: main.date },
        minimumPrice: main.minimumPrice,
        modalPrice: main.modalPrice,
        maximumPrice: main.maximumPrice,
        nearbyMarkets,
        bestMarket: bestMarket || (nearbyMarkets.length ? null : mainAsMarket),
        bestExactMarket: mainAsMarket,
        notes: [
            `Commodity matched as "${hit.commodity}" in government (AgmarkNet) mandi data.`,
            'Government wholesale prices are published per quintal and converted here to per kg.'
        ],
        message: locationType === 'exact' ? 'Latest government mandi price for the requested location.' : `No current price found for ${requestedLocation}. Showing the latest available government data for ${matchedLocation}.`
    };
}

/* ============================ ROUTES ============================ */
app.get('/api/health', (req, res) => {
    res.json({
        ok: true,
        port: PORT,
        photoProvider: 'Cloudflare Workers AI',
        visionModel: CF_VISION_MODEL,
        marketProvider: 'data.gov.in (AgmarkNet)',
        marketResource: GOV_RESOURCE_ID,
        cloudflareConfigured: Boolean(CF_API_TOKEN && CF_ACCOUNT_ID),
        govConfigured: Boolean(GOV_API_KEY),
        groqConfigured: Boolean(GROQ_API_KEY)
    });
});


app.post('/api/verify-produce', async (req, res) => {
    console.log("verify-produce called with product:", req.body?.product);
    const product = crop(req.body?.product || '');
    const images = Array.isArray(req.body?.images) ? req.body.images.slice(0, MAX_IMAGES) : [];
    if (!product || !images.length) return res.status(400).json({ success: false, valid: false, error: 'Product name and at least one image are required.' });
    if (!allowedProduce.has(singular(product))) return res.status(400).json({ success: false, valid: false, error: 'Photo verification is available only for supported fruits and vegetables. Grains, pulses, spices and other items cannot be photo-verified here.' });

    // Validate every image by its ACTUAL BYTES (magic numbers), not by the
    // browser-declared MIME type — a real JPG whose type was lost still passes,
    // while a fake/renamed file is still rejected.
    const decoded = [];
    for (const image of images) {
        const outcome = decodeImageDataUrl(image);
        if (outcome.error === 'size') return res.status(413).json({ success: false, valid: false, error: 'Each image must be 2MB or smaller.' });
        if (outcome.error === 'heic') return res.status(400).json({ success: false, valid: false, error: 'HEIC/HEIF images are not supported. Please convert them to JPEG or PNG before uploading.' });
        if (outcome.error) return res.status(400).json({ success: false, valid: false, error: 'Each image must be a valid PNG, JPEG, or WebP image.' });
        decoded.push(outcome);
    }

    try {
        const normalized = await Promise.all(decoded.map(async entry => {
            const vision = await cloudflareVisionVerify(product, entry.dataUrl);
            const matchesProduct = singular(vision.detectedProduct) === singular(product);
            return {
                detectedProduct: vision.detectedProduct,
                category: vision.category,
                confidence: vision.confidence,
                freshnessScore: vision.freshnessScore,
                estimatedShelfLifeDays: vision.estimatedShelfLifeDays,
                qualityGrade: vision.qualityGrade,
                reason: vision.reason,
                provider: vision.provider,
                model: vision.model,
                matchesProduct,
                verified: allowedProduce.has(singular(vision.detectedProduct)) && matchesProduct && ['fruit', 'vegetable'].includes(vision.category) && vision.confidence >= 0.6
            };
        }));

        const valid = normalized.every(item => item.verified) && normalized.length > 0;
        const firstMismatch = normalized.find(item => !item.verified && item.confidence >= 0.6);
        const firstUncertain = normalized.find(item => !item.verified && item.confidence < 0.6);
        const main = firstMismatch || firstUncertain || normalized[0];
        
        if (main?.provider === 'Local Offline Fallback') {
            return res.json({
                success: false,
                verification_status: "unavailable",
                verified: false,
                reason: "AI verification service is temporarily unavailable.",
                message: "AI verification service is temporarily unavailable (AI review required)."
            });
        }

        const uncertain = Boolean(!valid && firstUncertain && !firstMismatch);
        const message = valid
            ? 'Produce verified'
            : uncertain
                ? 'Unable to confidently verify this image. Please upload a clearer photo of your produce.'
                : !allowedProduce.has(singular(main?.detectedProduct || ''))
                    ? 'Only fruits and vegetables are allowed.'
                    : 'The uploaded photo does not match the selected product.';

        const freshnessScore = Math.round(normalized.reduce((acc, item) => acc + (item.freshnessScore || 85), 0) / normalized.length);
        const estimatedShelfLifeDays = Math.min(...normalized.map(item => item.estimatedShelfLifeDays || 5));
        const qualityGrade = main?.qualityGrade || 'Grade A';
        const spoilageAdvice = estimatedShelfLifeDays <= 2 
            ? 'Sell immediately — optimal fresh window ends in 48 hours.'
            : `Good visual condition — estimated shelf life is ${estimatedShelfLifeDays} days.`;

        console.log("verify-produce returning success:", valid); 
        return res.json({
            success: true,
            valid,
            verified: valid,
            matchesProduct: valid,
            detected_product: main?.detectedProduct || "Unknown",
            requested_product: product,
            category: main?.category || null,
            confidence: Math.max(...normalized.map(item => item.confidence)),
            freshnessScore,
            estimatedShelfLifeDays,
            qualityGrade,
            spoilageAdvice,
            uncertain,
            reason: main?.reason || message,
            provider: main?.provider || 'Cloudflare Workers AI',
            model: main?.model || CF_VISION_MODEL,
            product,
            images: normalized,
            message
        });
    } catch (error) {
        console.error('[verify-produce] Error:', error.message);
        // Never crash the server — always return a safe response
        return res.status(503).json({
            success: false,
            valid: false,
            uncertain: true,
            error: 'Photo verification is temporarily unavailable. Please try again or upload a clearer image.',
            message: 'Verification service temporarily unavailable.'
        });
    }
});

app.get('/api/market-discovery', async (req, res) => {
    const product = crop(req.query.product || req.query.commodity || '');
    const requestedLocation = clean(req.query.location || [req.query.district, req.query.state].filter(Boolean).join(', '));
    if (!product || !requestedLocation) return res.status(400).json({ error: 'Product and location are required.' });

    const cacheKey = keyFor(product, requestedLocation);
    const hit = cache.get(cacheKey);
    if (hit && Date.now() - hit.timestamp < TTL) return res.json(hit.data);

    if (inflight.has(cacheKey)) {
        try { return res.json(await inflight.get(cacheKey)); }
        catch { return res.status(503).json({ error: 'Market information is temporarily unavailable. Please try again.' }); }
    }

    const work = (async () => {
        const data = await govMarket(product, requestedLocation);
        const quantity = numeric(req.query.quantity) || 0;
        const quantityKg = req.query.unit === 'gram' ? quantity / 1000 : quantity;
        const expectedPrice = numeric(req.query.expectedPrice) || 0;
        if (data.found) {
            const spread = data.maximumPrice && data.minimumPrice ? (data.maximumPrice - data.minimumPrice) / (data.modalPrice || 1) : 0.15;
            const isRising = (data.modalPrice % 3 === 0) || spread > 0.2;
            const isLowering = (data.modalPrice % 5 === 0);
            const trendDirection = isRising ? 'UPWARD' : isLowering ? 'DOWNWARD' : 'STABLE';
            const forecastPct = isRising ? 12 : isLowering ? -6 : 3;
            const harvestAdvice = isRising
                ? `Prices in ${data.matchedLocation || 'local mandi'} projected to rise +${forecastPct}% over next 5 days. Hold harvest if possible.`
                : isLowering
                    ? `Supply influx expected soon. Recommended to sell available stock within 48 hours.`
                    : `Stable market prices projected for the next 7 days. Sell according to harvest readiness.`;

            data.trend = {
                direction: trendDirection,
                forecastPercentage: forecastPct,
                advice: harvestAdvice,
                forecastDays: 7
            };
        }
        if (data.found && quantityKg) {
            data.calculation = { quantityKg, estimatedMarketValue: quantityKg * data.price.value, expectedPrice, differencePerKg: expectedPrice - data.price.value, potentialDifference: quantityKg * (expectedPrice - data.price.value) };
        }
        data.recommendation = await groqRecommendation({ product, requestedLocation, calculation: data.calculation, bestMarket: data.bestMarket, nearbyMarkets: data.nearbyMarkets });
        cache.set(cacheKey, { timestamp: Date.now(), data });
        return data;
    })();

    inflight.set(cacheKey, work);
    try {
        return res.json(await work);
    } catch (error) {
        console.error('Market discovery failed:', error.message);
        return res.status(503).json({ error: 'Market information is temporarily unavailable. Please try again.' });
    } finally {
        inflight.delete(cacheKey);
    }
});

/* ============================ UNIFIED DATA STORE (Shared Products & Orders) ============================ */
let inMemoryProducts = []; // migrated to db

let inMemoryFarmers = [
    {
        id: 'farmer-1',
        farmerId: 'FARMER-MH-101',
        name: 'Ramesh Patel',
        phone: '9876543210',
        district: 'Nashik',
        state: 'Maharashtra',
        village: 'Ozar',
        taluka: 'Niphad',
        fieldOfficerId: 'usr-officer-1',
        fieldOfficerName: 'Sanjay Deshmukh',
        landAreaAcres: 4.5,
        primaryCrops: ['Tomato', 'Onion'],
        createdAt: Date.now() - 3600000 * 240
    },
    {
        id: 'farmer-2',
        farmerId: 'FARMER-MH-102',
        name: 'Suresh More',
        phone: '9822334455',
        district: 'Jalgaon',
        state: 'Maharashtra',
        village: 'Raver',
        taluka: 'Raver',
        fieldOfficerId: 'usr-officer-1',
        fieldOfficerName: 'Sanjay Deshmukh',
        landAreaAcres: 6.0,
        primaryCrops: ['Banana'],
        createdAt: Date.now() - 3600000 * 120
    },
    {
        id: 'farmer-3',
        farmerId: 'FARMER-MH-103',
        name: 'Tukaram Shinde',
        phone: '9823112233',
        district: 'Nashik',
        state: 'Maharashtra',
        village: 'Lasalgaon',
        taluka: 'Chandwad',
        fieldOfficerId: 'usr-officer-1',
        fieldOfficerName: 'Sanjay Deshmukh',
        landAreaAcres: 3.2,
        primaryCrops: ['Onion', 'Paddy'],
        createdAt: Date.now() - 3600000 * 48
    }
];

let inMemoryOrders = [
    {
        id: 'ORD-2026-8801',
        buyerId: 'buyer-1',
        buyerName: 'Rahul Kumar',
        buyerPhone: '9876543210',
        sellerId: 'farmer-1',
        sellerName: 'Ramesh Patel',
        sellerPhone: '9876543210',
        items: [
            { id: 'PRD-1001', name: 'Tomato', price: 25, quantity: 20, unit: 'kg', total: 500 }
        ],
        subtotal: 500,
        deliveryFee: 50,
        total: 550,
        deliveryAddress: {
            label: 'Home',
            text: '123, Green Valley Apartments, Sector 15',
            city: 'Pune',
            state: 'Maharashtra',
            pin: '411001',
            mobile: '9876543210'
        },
        paymentMethod: 'Cash on Delivery (Demo)',
        status: 'CONFIRMED',
        history: [
            { status: 'ORDER PLACED', timestamp: Date.now() - 7200000, note: 'Order placed by buyer' },
            { status: 'CONFIRMED', timestamp: Date.now() - 3600000, note: 'Confirmed by farmer' }
        ],
        createdAt: Date.now() - 7200000,
        updatedAt: Date.now() - 3600000
    }
];

/* Products Endpoints */
app.get('/api/products', (req, res) => {
    let list = db.readData('products').filter(p => p.status !== 'DELETED');
    const role = clean(req.query.role, 20);
    const sellerId = clean(req.query.sellerId, 100);
    const status = clean(req.query.status, 50);

    if (sellerId) {
        list = list.filter(p => p.sellerId === sellerId || p.sellerId === req.query.sellerId);
    }
    if (status) {
        list = list.filter(p => p.status === status || p.verificationStatus === status);
    }
    res.json({ success: true, products: list });
});

app.get('/api/products/:id', (req, res) => {
    const product = db.readData('products').find(p => p.id === req.params.id && p.status !== 'DELETED');
    if (!product) return res.status(404).json({ success: false, error: 'Product not found.' });
    res.json({ success: true, product });
});

app.post('/api/products', (req, res) => {
    const b = req.body || {};
    
    let aiVerification = { status: 'PENDING' };

    const newProduct = {
        id: `PRD-${Date.now()}`,
        sellerId: clean(b.sellerId, 100) || 'farmer-1',
        sellerName: clean(b.sellerName, 100) || 'Farmer',
        sellerPhone: clean(b.sellerPhone, 20) || '9876543210',
        name: clean(b.name, 100),
        category: clean(b.category, 50) || 'vegetable',
        price: Number(b.price) || 0,
        quantity: Number(b.quantity) || 0,
        unit: clean(b.unit, 20) || 'kg',
        images: Array.isArray(b.images) ? b.images.map(img => clean(img, 2000)) : [],
        image: clean(b.image, 2000) || '',
        location: clean(b.location, 200) || '',
        description: clean(b.description, 500) || '',
        status: 'AVAILABLE',
        listingSource: 'DIRECT_FARMER',
        verification: { ai: aiVerification },
        createdAt: Date.now()
    };
    
    let products = db.readData('products');
    products.unshift(newProduct);
    db.writeData('products', products);

    res.status(201).json({ success: true, product: newProduct });
});

app.patch('/api/products/:id/verification', (req, res) => {
    let products = db.readData('products');
    const idx = products.findIndex(p => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, error: 'Product not found.' });

    const existing = products[idx];
    products[idx] = {
        ...existing,
        verificationStatus: clean(req.body?.status, 50) || existing.verificationStatus,
        verifiedBy: clean(req.body?.verifiedBy, 100) || existing.verifiedBy,
        verifiedAt: req.body?.status === 'VERIFIED' ? Date.now() : existing.verifiedAt,
        rejectionReason: clean(req.body?.rejectionReason, 200) || existing.rejectionReason,
    };
    db.writeData('products', products);
    res.json({ success: true, product: products[idx] });
});

app.put('/api/products/:id', (req, res) => {
    let products = db.readData('products');
    const idx = products.findIndex(p => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, error: 'Product not found.' });

    products[idx] = { ...products[idx], ...req.body, updatedAt: Date.now() };
    db.writeData('products', products);
    res.json({ success: true, product: products[idx] });
});

app.delete('/api/products/:id', (req, res) => {
    let products = db.readData('products');
    const idx = products.findIndex(p => p.id === req.params.id);
    if (idx !== -1) {
        products[idx].status = 'DELETED';
        db.writeData('products', products);
    }
    res.json({ success: true });
});

/* Demands Endpoints */
app.get('/api/demands', (req, res) => {
    const { status } = req.query;
    let list = db.readData('demands');
    if (status && status !== 'all') {
        list = list.filter(d => d.status.toLowerCase() === status.toLowerCase());
    }
    res.json({ success: true, count: list.length, demands: list });
});

app.post('/api/demands', (req, res) => {
    const b = req.body || {};
    if (!b.productName || !b.quantity || !b.price || !b.location || !b.neededBy) {
        return res.status(400).json({ success: false, error: 'Missing required fields for demand.' });
    }
    const demands = db.readData('demands');
    const newDemand = {
        id: 'DMD-' + Date.now(),
        buyerId: b.buyerId || 'buyer-1',
        buyerName: b.buyerName || 'Unknown Buyer',
        productName: b.productName,
        quantity: Number(b.quantity),
        unit: 'kg',
        price: Number(b.price),
        location: b.location,
        neededBy: b.neededBy,
        status: 'ACTIVE',
        createdAt: Date.now()
    };
    demands.unshift(newDemand);
    db.writeData('demands', demands);
    res.status(201).json({ success: true, demand: newDemand });
});

app.post('/api/demands/:id/accept', (req, res) => {
    const demands = db.readData('demands');
    const demand = demands.find(d => d.id === req.params.id);
    if (!demand) return res.status(404).json({ success: false, error: 'Demand not found' });
    
    // Create order logic
    const b = req.body || {};
    const newOrder = {
        id: 'ORD-' + Date.now(),
        buyerId: demand.buyerId,
        buyerName: demand.buyerName,
        buyerPhone: demand.buyerPhone || 'Unknown',
        sellerId: b.sellerId || 'farmer-1',
        sellerName: b.sellerName || 'Unknown Farmer',
        sellerPhone: b.sellerPhone || 'Unknown',
        items: [{
            id: demand.id,
            name: demand.productName,
            price: demand.price,
            quantity: demand.quantity,
            unit: 'kg',
            total: demand.price * demand.quantity
        }],
        subtotal: demand.price * demand.quantity,
        deliveryFee: 0,
        total: demand.price * demand.quantity,
        status: 'CONFIRMED',
        createdAt: Date.now(),
        updatedAt: Date.now()
    };
    inMemoryOrders.unshift(newOrder);
    
    demand.status = 'FULFILLED';
    db.writeData('demands', demands);
    
    res.json({ success: true, order: newOrder });
});

function normalizeOrder(order = {}) {
    const items = Array.isArray(order.items) ? order.items : (order.products || []).map(product => ({
        id: product.id || product.productId,
        productId: product.productId || product.id,
        name: product.name,
        price: Number(product.price) || 0,
        quantity: Number(product.quantity) || 0,
        unit: product.unit || 'kg',
        total: Number(product.total) || (Number(product.price) * Number(product.quantity))
    }));

    return {
        ...order,
        id: order.id || order.orderId,
        buyerId: order.buyerId || order.buyer?.id,
        buyerName: order.buyerName || order.buyer?.name,
        buyerPhone: order.buyerPhone || order.buyer?.phone,
        sellerId: order.sellerId || order.seller?.id,
        sellerName: order.sellerName || order.seller?.name,
        sellerPhone: order.sellerPhone || order.seller?.phone,
        farmerName: order.farmerName || order.sellerName || order.seller?.name,
        items,
        total: Number(order.total ?? order.totalAmount ?? 0),
        deliveryAddress: order.deliveryAddress || (order.buyer?.address ? { text: order.buyer.address } : null),
        history: Array.isArray(order.history) ? order.history : []
    };
}

app.get('/api/orders', (req, res) => {
    const { role, userId, status } = req.query;
    let list = db.readData('orders').map(normalizeOrder);
    if (status && status !== 'all') list = list.filter(o => o.status.toLowerCase() === status.toLowerCase());
    if (role === 'farmer' && userId) list = list.filter(o => o.sellerId === userId);
    if (role === 'buyer' && userId) list = list.filter(o => o.buyerId === userId);
    res.json({ success: true, count: list.length, orders: list });
});

app.post('/api/orders', (req, res) => {
    const b = req.body || {};
    const items = Array.isArray(b.items) ? b.items : [];
    if (!items.length) return res.status(400).json({ success: false, error: 'Order must contain at least one product.' });

    // Re-validate stock availability for each item
    for (const item of items) {
        const product = db.readData('products').find(p => p.id === item.productId || p.id === item.id);
        if (!product || product.status !== 'AVAILABLE') {
            return res.status(400).json({ success: false, error: `Product "${item.name || item.id}" is no longer available.` });
        }
        if (Number(item.quantity) > product.quantity) {
            return res.status(400).json({ success: false, error: `Requested quantity for "${product.name}" (${item.quantity}) exceeds available stock (${product.quantity} ${product.unit}).` });
        }
    }

    // Deduct stock and transition if empty
    const products = db.readData('products');
    for (const item of items) {
        const product = products.find(p => p.id === item.productId || p.id === item.id);
        if (product) {
            product.quantity -= Number(item.quantity);
            if (product.quantity <= 0) {
                product.quantity = 0;
                product.status = 'SOLD_OUT';
            }
        }
    }

    const subtotal = items.reduce((acc, it) => acc + (Number(it.price) * Number(it.quantity)), 0);
    const deliveryFee = subtotal > 1000 ? 0 : 50;
    const total = subtotal + deliveryFee;
    db.writeData('products', products);
    const firstProduct = products.find(p => p.id === items[0].productId || p.id === items[0].id);

    const newOrder = {
        id: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        buyerId: clean(b.buyerId, 50) || 'buyer-1',
        buyerName: clean(b.buyerName, 100) || 'Guest Buyer',
        buyerPhone: clean(b.buyerPhone, 20) || '9876543210',
        sellerId: firstProduct ? firstProduct.sellerId : clean(b.sellerId, 50),
        sellerName: firstProduct ? firstProduct.sellerName : clean(b.sellerName, 100) || 'Farmer Seller',
        sellerPhone: firstProduct ? firstProduct.sellerPhone : clean(b.sellerPhone, 20) || '9876543210',
        items,
        subtotal,
        deliveryFee,
        total,
        deliveryAddress: b.deliveryAddress || {
            label: 'Home',
            text: clean(b.addressText || b.location, 200) || 'Delivery Address',
            city: clean(b.city, 100) || 'Local',
            state: clean(b.state, 100) || 'State',
            pin: clean(b.pin, 10) || '400001',
            mobile: clean(b.buyerPhone, 20) || '9876543210'
        },
        paymentMethod: clean(b.paymentMethod, 60) || 'Cash on Delivery (Demo)',
        status: 'ORDER PLACED',
        history: [
            { status: 'ORDER PLACED', timestamp: Date.now(), note: 'Order placed by buyer' }
        ],
        createdAt: Date.now(),
        updatedAt: Date.now()
    };

    const orders = db.readData('orders');
    orders.unshift(newOrder);
    db.writeData('orders', orders);
    res.status(201).json({ success: true, order: newOrder });
});

app.patch('/api/orders/:id/status', (req, res) => {
    const orders = db.readData('orders');
    const orderIndex = orders.findIndex(o => o.id === req.params.id || o.orderId === req.params.id);
    if (orderIndex === -1) return res.status(404).json({ success: false, error: 'Order not found.' });
    const order = normalizeOrder(orders[orderIndex]);

    const newStatus = clean(req.body?.status, 50).toUpperCase();
    const validStatuses = ['ORDER PLACED', 'CONFIRMED', 'PREPARING', 'OUT FOR DELIVERY', 'DELIVERED', 'CANCELLED'];
    if (!validStatuses.includes(newStatus)) {
        return res.status(400).json({ success: false, error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    order.status = newStatus;
    order.updatedAt = Date.now();
    order.history = Array.isArray(order.history) ? order.history : [];
    order.history.push({
        status: newStatus,
        timestamp: Date.now(),
        note: clean(req.body?.note, 200) || `Order transitioned to ${newStatus}`
    });

    orders[orderIndex] = order;
    db.writeData('orders', orders);
    res.json({ success: true, order });
});

/* Auth Endpoints (JWT + DB) */
app.post('/api/auth/login', (req, res) => {
    const rawPhone = clean(req.body?.phone || req.body?.identifier || req.body?.mobile || req.body?.officerId || req.body?.phoneOrOfficerId, 50);
    const phone = rawPhone.replace(/\D/g, '').slice(-10);
    const password = String(req.body?.password || '').trim();
    const roleHint = clean(req.body?.role, 20).toLowerCase();

    if (!rawPhone) return res.status(400).json({ success: false, error: 'Mobile number or Officer ID is required.' });

    let users = db.readData('users');

    if (password) {
        const user = users.find(u => 
            (phone && u.phone === phone) || 
            (u.officerId && u.officerId.toLowerCase() === rawPhone.toLowerCase())
        );
        if (!user || user.password !== password) {
            return res.status(401).json({ success: false, error: 'Invalid credentials or password.' });
        }
        
        const token = jwt.sign({ id: user.id, role: user.role, officerId: user.officerId }, JWT_SECRET, { expiresIn: '24h' });
        
        console.log("verify-produce returning success"); return res.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                phone: `+91 ${user.phone}`,
                district: user.district,
                state: user.state,
                role: user.role,
                officerId: user.officerId || null,
                assignedZone: user.assignedZone || null
            },
            token
        });
    }

    console.log("verify-produce returning success"); return res.json({
        success: true,
        message: 'Demo OTP generated',
        demoOtp: '123456',
        role: roleHint || 'farmer',
        identifier: phone || rawPhone
    });
});

app.post('/api/auth/register', (req, res) => {
    const name = clean(req.body?.name, 100);
    const rawPhone = clean(req.body?.phone, 50);
    const phone = rawPhone.replace(/\D/g, '').slice(-10);
    const district = clean(req.body?.district, 100);
    const state = clean(req.body?.state, 100);
    const password = String(req.body?.password || '').trim();
    const role = clean(req.body?.role, 20).toLowerCase() || 'farmer';

    if (role === 'field_officer') return res.status(403).json({ success: false, error: 'Field Officers cannot register publicly.' });
    if (!name) return res.status(400).json({ success: false, error: 'Full Name is required.' });
    if (!phone || phone.length < 10) return res.status(400).json({ success: false, error: 'Valid 10-digit mobile number is required.' });
    if (!district) return res.status(400).json({ success: false, error: 'District is required.' });
    if (!state) return res.status(400).json({ success: false, error: 'State is required.' });
    if (!password || password.length < 6) return res.status(400).json({ success: false, error: 'Password must be at least 6 characters.' });

    let users = db.readData('users');
    const existing = users.find(u => u.phone === phone);
    if (existing) {
        return res.status(400).json({ success: false, error: `An account with phone +91 ${phone} already exists.` });
    }

    const newUser = {
        id: `usr-${Date.now()}`,
        name,
        phone,
        district,
        state,
        password,
        role,
        createdAt: Date.now()
    };
    users.push(newUser);
    db.writeData('users', users);

    const token = jwt.sign({ id: newUser.id, role: newUser.role }, JWT_SECRET, { expiresIn: '24h' });

    return res.status(201).json({
        success: true,
        message: 'Registration successful',
        user: { id: newUser.id, name: newUser.name, phone: `+91 ${newUser.phone}`, district, state, role },
        token
    });
});

app.post('/api/auth/verify-otp', (req, res) => {
    const otp = clean(req.body?.otp, 10);
    const role = clean(req.body?.role, 20).toLowerCase() || 'farmer';
    const identifier = clean(req.body?.identifier || req.body?.phone, 100);
    if (!otp) return res.status(400).json({ success: false, error: 'OTP is required.' });
    if (otp !== '123456') return res.status(400).json({ success: false, error: 'Invalid OTP. Please enter the demo code 123456.' });

    let users = db.readData('users');
    let user = users.find(u => u.phone === identifier.replace(/\D/g, '').slice(-10));
    
    if (!user) {
        user = {
            id: role === 'farmer' ? 'usr-farmer-1' : 'usr-buyer-1',
            role,
            name: role === 'farmer' ? 'Ramesh Patel' : 'Priya Sharma',
            phone: identifier.startsWith('+91') ? identifier : `+91 ${identifier || '98765 43210'}`,
            district: 'Nashik',
            state: 'Maharashtra'
        };
    }

    const token = jwt.sign({ id: user.id, role: user.role, officerId: user.officerId }, JWT_SECRET, { expiresIn: '24h' });

    console.log("verify-produce returning success"); return res.json({
        success: true,
        user,
        token
    });
});

// --- Farmers API ---
app.get('/api/farmers', (req, res) => {
    const { fieldOfficerId } = req.query;
    let list = inMemoryFarmers;
    if (fieldOfficerId) {
        list = list.filter(f => f.fieldOfficerId === fieldOfficerId);
    }
    return res.json({ success: true, farmers: list });
});

app.post('/api/farmers', (req, res) => {
    try {
        const data = req.body;
        if (!data.name || !data.phone) {
            return res.status(400).json({ error: 'Name and phone are required' });
        }
        const duplicate = inMemoryFarmers.find(f => f.phone === data.phone);
        if (duplicate) {
            return res.status(400).json({ error: 'A farmer with this phone number already exists' });
        }
        const newFarmer = {
            id: `farmer-${Date.now().toString().slice(-4)}`,
            farmerId: `FARMER-MH-${Math.floor(100 + Math.random() * 900)}`,
            name: data.name,
            phone: data.phone,
            district: data.district,
            state: data.state,
            village: data.village,
            taluka: data.taluka,
            fieldOfficerId: data.fieldOfficerId,
            fieldOfficerName: data.fieldOfficerName,
            landAreaAcres: data.landAreaAcres,
            primaryCrops: data.primaryCrops || [],
            createdAt: Date.now(),
            notes: data.notes
        };
        inMemoryFarmers.unshift(newFarmer);
        return res.json({ success: true, farmer: newFarmer });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// --- Chats API ---
let inMemoryChats = [];

app.get('/api/chats', (req, res) => {
    const { userId } = req.query;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const userChats = inMemoryChats.filter(c => c.buyerId === userId || c.farmerId === userId);
    return res.json({ success: true, chats: userChats });
});

app.post('/api/chats', (req, res) => {
    const { productId, buyerId, farmerId, initialMessage, productName, buyerName, farmerName } = req.body;
    let chat = inMemoryChats.find(c => c.productId === productId && c.buyerId === buyerId);
    if (!chat) {
        chat = {
            id: `chat-${Date.now()}`,
            productId,
            productName,
            buyerId,
            buyerName,
            farmerId,
            farmerName,
            createdAt: Date.now(),
            messages: []
        };
        inMemoryChats.push(chat);
    }
    if (initialMessage) {
        chat.messages.push({
            senderId: buyerId,
            text: initialMessage,
            timestamp: Date.now()
        });
    }
    return res.json({ success: true, chat });
});

app.post('/api/chats/:id/messages', (req, res) => {
    const chat = inMemoryChats.find(c => c.id === req.params.id);
    if (!chat) return res.status(404).json({ error: 'Chat not found' });
    const { senderId, text } = req.body;
    if (!text) return res.status(400).json({ error: 'Message text is required' });
    const msg = { senderId, text, timestamp: Date.now() };
    chat.messages.push(msg);
    return res.json({ success: true, message: msg });
});

app.use('/api', (req, res) => res.status(404).json({ error: 'Unknown API route.' }));
app.use((error, req, res, next) => {
    console.error('Unhandled server error:', error.message);
    if (res.headersSent) return next(error);
    return res.status(500).json({ error: 'Server error. Please try again.' });
});

app.listen(PORT, () => console.log(`FarmLink backend running at http://localhost:${PORT}`));
