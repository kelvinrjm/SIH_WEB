const fs = require('fs');

let content = fs.readFileSync('server.js', 'utf8');

// Insert at top
content = content.replace(
  "const cors = require('cors');",
  `const cors = require('cors');\nconst jwt = require('jsonwebtoken');\nconst db = require('./backend/db');\n\nconst JWT_SECRET = process.env.JWT_SECRET || 'farmlink-secret-2026';\n\nconst authenticateToken = (req, res, next) => {\n    const authHeader = req.headers['authorization'];\n    const token = authHeader && authHeader.split(' ')[1];\n    if (!token) return res.status(401).json({ success: false, error: 'Unauthorized' });\n    jwt.verify(token, JWT_SECRET, (err, user) => {\n        if (err) return res.status(403).json({ success: false, error: 'Forbidden' });\n        req.user = user;\n        next();\n    });\n};\n\nconst authorizeRole = (...allowedRoles) => {\n    return (req, res, next) => {\n        if (!req.user || !allowedRoles.includes(req.user.role)) {\n            return res.status(403).json({ success: false, error: 'Access denied' });\n        }\n        next();\n    };\n};`
);

// We need to replace the entire auth section
const authStart = content.indexOf('/* Auth Endpoints (Phone + Password & Demo OTP 123456) */');
const authEnd = content.indexOf("app.use('/api', (req, res) => res.status(404).json({ error: 'Unknown API route.' }));");

if (authStart === -1 || authEnd === -1) {
    console.error("Could not find auth markers.");
    process.exit(1);
}

const newAuthCode = `/* Auth Endpoints (JWT + DB) */
app.post('/api/auth/login', (req, res) => {
    const rawPhone = clean(req.body?.phone || req.body?.identifier || req.body?.mobile || req.body?.officerId || req.body?.phoneOrOfficerId, 50);
    const phone = rawPhone.replace(/\\D/g, '').slice(-10);
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
        
        return res.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                phone: \`+91 \${user.phone}\`,
                district: user.district,
                state: user.state,
                role: user.role,
                officerId: user.officerId || null,
                assignedZone: user.assignedZone || null
            },
            token
        });
    }

    return res.json({
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
    const phone = rawPhone.replace(/\\D/g, '').slice(-10);
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
        return res.status(400).json({ success: false, error: \`An account with phone +91 \${phone} already exists.\` });
    }

    const newUser = {
        id: \`usr-\${Date.now()}\`,
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
        user: { id: newUser.id, name: newUser.name, phone: \`+91 \${newUser.phone}\`, district, state, role },
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
    let user = users.find(u => u.phone === identifier.replace(/\\D/g, '').slice(-10));
    
    if (!user) {
        user = {
            id: role === 'farmer' ? 'usr-farmer-1' : 'usr-buyer-1',
            role,
            name: role === 'farmer' ? 'Ramesh Patel' : 'Priya Sharma',
            phone: identifier.startsWith('+91') ? identifier : \`+91 \${identifier || '98765 43210'}\`,
            district: 'Nashik',
            state: 'Maharashtra'
        };
    }

    const token = jwt.sign({ id: user.id, role: user.role, officerId: user.officerId }, JWT_SECRET, { expiresIn: '24h' });

    return res.json({
        success: true,
        user,
        token
    });
});\n\n`;

content = content.substring(0, authStart) + newAuthCode + content.substring(authEnd);

fs.writeFileSync('server.js', content, 'utf8');
console.log("Updated server.js");
