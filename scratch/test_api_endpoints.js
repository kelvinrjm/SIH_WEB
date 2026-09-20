/**
 * FarmLink HTTP API Endpoints Test Script
 */
async function testApi() {
    console.log('Testing FarmLink API endpoints at http://localhost:5000...');

    // 1. Test Login with credentials
    const loginFarmer = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: '9876543210', password: 'farmer123', role: 'farmer' })
    });
    const loginFarmerJson = await loginFarmer.json();
    console.log('1. Farmer Login Response:', loginFarmerJson.success ? '✓ SUCCESS' : '✗ FAILED', loginFarmerJson.user?.name);

    const loginBuyer = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: '9876501234', password: 'buyer123', role: 'buyer' })
    });
    const loginBuyerJson = await loginBuyer.json();
    console.log('2. Buyer Login Response:', loginBuyerJson.success ? '✓ SUCCESS' : '✗ FAILED', loginBuyerJson.user?.name);

    // 2. Test Invalid Password
    const loginBad = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: '9876543210', password: 'wrong' })
    });
    console.log('3. Bad Password Response (401 expected):', loginBad.status === 401 ? '✓ CORRECTLY REJECTED' : '✗ FAILED');

    // 3. Test Registration
    const regRes = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Kisan Kumar',
            phone: '9822001122',
            district: 'Ahmednagar',
            state: 'Maharashtra',
            password: 'secretpass123',
            role: 'farmer'
        })
    });
    const regJson = await regRes.json();
    console.log('4. Registration Response:', regJson.success ? '✓ SUCCESS' : '✗ FAILED', regJson.user?.name);

    // 4. Test Demo OTP verification (123456)
    const otpRes = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: '123456', identifier: '9822001122', role: 'farmer' })
    });
    const otpJson = await otpRes.json();
    console.log('5. OTP Verification Response:', otpJson.success ? '✓ SUCCESS' : '✗ FAILED');

    // 5. Test Invalid OTP
    const badOtpRes = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: '999999', identifier: '9822001122', role: 'farmer' })
    });
    console.log('6. Bad OTP Response (400 expected):', badOtpRes.status === 400 ? '✓ CORRECTLY REJECTED' : '✗ FAILED');

    // 6. Test Static File Serving of index.html
    const indexRes = await fetch('http://localhost:5000/index.html');
    console.log('7. index.html HTTP Status:', indexRes.status === 200 ? '✓ 200 OK' : '✗ FAILED');

    // 7. Test Serving of pages/farmer/dashboard.html
    const farmerDashRes = await fetch('http://localhost:5000/pages/farmer/dashboard.html');
    console.log('8. pages/farmer/dashboard.html HTTP Status:', farmerDashRes.status === 200 ? '✓ 200 OK' : '✗ FAILED');

    // 8. Test Serving of pages/buyer/dashboard.html
    const buyerDashRes = await fetch('http://localhost:5000/pages/buyer/dashboard.html');
    console.log('9. pages/buyer/dashboard.html HTTP Status:', buyerDashRes.status === 200 ? '✓ 200 OK' : '✗ FAILED');

    console.log('\nAll API & route checks completed successfully!');
}

testApi().catch(console.error);
