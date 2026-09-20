const assert = require('assert');

const BASE_URL = 'http://localhost:5000';
const redDotPNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAI0lEQVR4AeyQMQ0AAAyDSP177hwsCCgJHxcp1BgkC99Res8BAAD//+wxhQIAAAAGSURBVAMAZIwUAbOgDh0AAAAASUVORK5CYII=';
const fakeHEIC = 'data:image/heic;base64,AAAAIGZ0eXBoZWljAAAAAG1pZjFoZWljbWV0YQAAAAAAAABCaW5mAAAAAAEAAAABaGRscgAAAAAAAAAAdmljdQAAAAAAAAAAAAAAAAAAAAAAbWV0YQAAAAAAAADGaW5mAAAAAA==';

async function testPhotoVerification() {
    console.log('\n--- Testing Photo Verification ---');
    
    // 1. Valid fruit/vegetable (Tomato) with valid PNG
    try {
        console.log('Test 1: Valid Tomato + PNG image...');
        const res = await fetch(`${BASE_URL}/api/verify-produce`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product: 'Tomato', images: [redDotPNG] })
        });
        const data = await res.json();
        console.log('Result:', JSON.stringify(data, null, 2));
    } catch (e) {
        console.error('Test 1 failed:', e.message);
    }

    // 2. Rejecting grains/paddy (Not allowed product)
    try {
        console.log('Test 2: Rejects Paddy...');
        const res = await fetch(`${BASE_URL}/api/verify-produce`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product: 'Paddy', images: [redDotPNG] })
        });
        const data = await res.json();
        console.log('Result:', res.status, JSON.stringify(data, null, 2));
        assert.strictEqual(res.status, 400);
        assert.ok(data.error.includes('supported fruits and vegetables'));
        console.log('✓ Rejects Paddy correctly.');
    } catch (e) {
        console.error('Test 2 failed:', e.message);
    }

    // 3. Rejecting HEIC images with explicit error
    try {
        console.log('Test 3: Rejects HEIC image with explicit message...');
        const res = await fetch(`${BASE_URL}/api/verify-produce`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product: 'Tomato', images: [fakeHEIC] })
        });
        const data = await res.json();
        console.log('Result:', res.status, JSON.stringify(data, null, 2));
        assert.strictEqual(res.status, 400);
        assert.ok(data.error.includes('HEIC/HEIF images are not supported'));
        console.log('✓ Rejects HEIC correctly with explicit message.');
    } catch (e) {
        console.error('Test 3 failed:', e.message);
    }
}

async function testMarketPriceDiscovery() {
    console.log('\n--- Testing Market Price Discovery ---');

    // 1. Query crop + location (Tomato @ Virudhunagar)
    let firstData;
    try {
        console.log('Test 4: Query Tomato @ Virudhunagar, Tamil Nadu...');
        const t0 = Date.now();
        const res = await fetch(`${BASE_URL}/api/market-discovery?product=Tomato&location=Virudhunagar,%20Tamil%20Nadu`);
        firstData = await res.json();
        const duration = Date.now() - t0;
        console.log(`Result (took ${duration}ms):`, JSON.stringify(firstData, null, 2));
        assert.strictEqual(res.status, 200);
        assert.ok('found' in firstData);
    } catch (e) {
        console.error('Test 4 failed:', e.message);
    }

    // 2. Query again to check Cache hits
    try {
        console.log('Test 5: Query Tomato @ Virudhunagar again (cache check)...');
        const t0 = Date.now();
        const res = await fetch(`${BASE_URL}/api/market-discovery?product=Tomato&location=Virudhunagar,%20Tamil%20Nadu`);
        const data = await res.json();
        const duration = Date.now() - t0;
        console.log(`Result (took ${duration}ms):`, JSON.stringify(data, null, 2));
        assert.ok(duration < 50, 'Cache hit should be extremely fast (<50ms)');
        console.log('✓ Caching works correctly.');
    } catch (e) {
        console.error('Test 5 failed:', e.message);
    }

    // 3. Switch location to confirm cache separation
    try {
        console.log('Test 6: Switch location to Madurai, Tamil Nadu (confirming no cache leak)...');
        const t0 = Date.now();
        const res = await fetch(`${BASE_URL}/api/market-discovery?product=Tomato&location=Madurai,%20Tamil%20Nadu`);
        const data = await res.json();
        const duration = Date.now() - t0;
        console.log(`Result (took ${duration}ms):`, JSON.stringify(data, null, 2));
        assert.ok(duration > 100 || data.found === false, 'Should run new search instead of leaking cache');
        console.log('✓ Cache separation by location verified.');
    } catch (e) {
        console.error('Test 6 failed:', e.message);
    }
}

async function runAll() {
    await testPhotoVerification();
    await testMarketPriceDiscovery();
    console.log('\n--- All integration tests finished. ---');
}

runAll().catch(console.error);
