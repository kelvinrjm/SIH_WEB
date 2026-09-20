const assert = require('assert');

async function runTests() {
    console.log('=== STARTING CROP DIRECT TEXT INPUT TESTS ===');

    const testCrops = [
        'Tomato',
        'Onion',
        'Red Chilli',
        'Sweet Potato',
        'Coconut',
        'Drumstick',
        'Rice',
        'Groundnut',
        'தக்காளி',
        'வெங்காயம்',
        'टमाटर',
        'प्याज़'
    ];

    let passed = 0;
    let failed = 0;

    for (const cropName of testCrops) {
        try {
            console.log(`\nTesting crop: "${cropName}"`);

            // 1. Test POST /api/products creates product with exact name
            const createRes = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: cropName,
                    category: 'vegetable',
                    price: 35,
                    quantity: 200,
                    unit: 'kg',
                    location: 'Nashik, Maharashtra',
                    sellerId: 'farmer-test',
                    sellerName: 'Ramesh Patel'
                })
            });

            assert.strictEqual(createRes.status, 201, `Expected 201 Created for "${cropName}", got ${createRes.status}`);
            const createData = await createRes.json();
            assert(createData.success, `Create failed for "${cropName}"`);
            assert.strictEqual(createData.product.name, cropName, `Expected product.name to be exactly "${cropName}", got "${createData.product.name}"`);
            console.log(`  ✓ Product created successfully with exact name: "${createData.product.name}" (ID: ${createData.product.id})`);

            // 2. Test GET /api/products returns the created product
            const listRes = await fetch(`http://localhost:5000/api/products?search=${encodeURIComponent(cropName)}`);
            assert.strictEqual(listRes.status, 200);
            const listData = await listRes.json();
            assert(listData.products.some(p => p.name === cropName), `Could not find "${cropName}" in products search results`);
            console.log(`  ✓ Product found in search query for "${cropName}"`);

            // 3. Test POST /api/verify-produce resolves cropName without 400
            // Sending a 1x1 test image
            const dummyBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
            const verifyRes = await fetch('http://localhost:5000/api/verify-produce', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product: cropName,
                    images: [dummyBase64]
                })
            });

            assert.notStrictEqual(verifyRes.status, 400, `POST /api/verify-produce rejected crop "${cropName}" with 400 Bad Request`);
            const verifyData = await verifyRes.json();
            assert(verifyData.success !== undefined, `verifyProduce response missing success flag for "${cropName}"`);
            console.log(`  ✓ Photo verification handled "${cropName}" successfully (Status: ${verifyRes.status}, valid: ${verifyData.valid})`);

            passed++;
        } catch (err) {
            console.error(`  ✗ FAILED for "${cropName}":`, err.message);
            failed++;
        }
    }

    console.log(`\n========================================`);
    console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED (Total: ${testCrops.length})`);
    console.log(`========================================`);

    if (failed > 0) process.exit(1);
}

runTests();
