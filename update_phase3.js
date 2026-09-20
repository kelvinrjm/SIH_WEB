const fs = require('fs');

let content = fs.readFileSync('server.js', 'utf8');

// 1. Add verificationCache above app.post('/api/verify-produce', ...
const cacheDeclaration = `
const crypto = require('crypto');
const verificationCache = new Map();
// Cleanup old cache entries every hour
setInterval(() => {
    const now = Date.now();
    for (const [token, data] of verificationCache.entries()) {
        if (now - data.timestamp > 3600000) verificationCache.delete(token);
    }
}, 3600000);
`;

content = content.replace("app.post('/api/verify-produce', async (req, res) => {", cacheDeclaration + "\napp.post('/api/verify-produce', async (req, res) => {");

// 2. Add token generation at the end of verify-produce
const origReturn = "return res.json({\n            success: true,\n            valid,\n            verified: valid,\n            matchesProduct: valid,\n            detectedProduct: main?.detectedProduct || null,\n            category: main?.category || null,\n            confidence: Math.max(...normalized.map(item => item.confidence)),\n            freshnessScore,\n            estimatedShelfLifeDays,\n            qualityGrade,\n            spoilageAdvice,\n            reason: main?.reason || 'Verified via AI',\n            details: normalized\n        });";

if (content.includes(origReturn)) {
    const newReturn = `
        let verificationToken = null;
        if (valid) {
            verificationToken = crypto.randomUUID();
            verificationCache.set(verificationToken, {
                status: 'VERIFIED',
                verifiedAt: Date.now(),
                result: {
                    freshnessScore,
                    estimatedShelfLifeDays,
                    qualityGrade,
                    confidence: Math.max(...normalized.map(item => item.confidence)),
                    category: main?.category || null,
                    detectedProduct: main?.detectedProduct || null,
                },
                timestamp: Date.now()
            });
        }
        
        return res.json({
            success: true,
            valid,
            verified: valid,
            verificationToken,
            matchesProduct: valid,
            detectedProduct: main?.detectedProduct || null,
            category: main?.category || null,
            confidence: Math.max(...normalized.map(item => item.confidence)),
            freshnessScore,
            estimatedShelfLifeDays,
            qualityGrade,
            spoilageAdvice,
            reason: main?.reason || 'Verified via AI',
            details: normalized
        });`;
    content = content.replace(origReturn, newReturn);
}

// 3. Update app.post('/api/products')
// We need to inject the verification logic inside.
const postProductStart = `const b = req.body || {};`;
const postProductInjection = `const b = req.body || {};
    
    let aiVerification = {
        status: 'PENDING'
    };
    if (b.verificationToken && verificationCache.has(b.verificationToken)) {
        const cached = verificationCache.get(b.verificationToken);
        aiVerification = {
            status: cached.status,
            verifiedAt: cached.verifiedAt,
            result: cached.result
        };
        verificationCache.delete(b.verificationToken); // single use
    }
`;

content = content.replace(postProductStart, postProductInjection);

// Replace verificationStatus: 'PENDING' in the newProduct object with verification object
content = content.replace("verificationStatus: 'PENDING',", "verification: { ai: aiVerification },");


fs.writeFileSync('server.js', content, 'utf8');
console.log("Updated server.js for Phase 3");
