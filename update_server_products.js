const fs = require('fs');

let content = fs.readFileSync('server.js', 'utf8');

// Replace product endpoints
// Since they use inMemoryProducts heavily, let's just replace the string "inMemoryProducts" with "db.readData('products')" and write back.

// First, find let inMemoryProducts = [ ... ]; and remove it or empty it, actually no, let's comment it out.
const startStr = "let inMemoryProducts = [";
const startIdx = content.indexOf(startStr);
if (startIdx !== -1) {
    let endIdx = content.indexOf("];", startIdx);
    content = content.substring(0, startIdx) + "let inMemoryProducts = []; // migrated to db" + content.substring(endIdx + 2);
}

// In the API endpoints:
// Instead of patching every line, we can just redefine the endpoints completely.
const productsStart = content.indexOf("app.get('/api/products', (req, res) => {");
const productsEnd = content.indexOf("app.get('/api/orders', (req, res) => {");

if (productsStart !== -1 && productsEnd !== -1) {
    const newEndpoints = `app.get('/api/products', (req, res) => {
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
    const newProduct = {
        id: \`PRD-\${Date.now()}\`,
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
        verificationStatus: 'PENDING',
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
});\n\n`;

    content = content.substring(0, productsStart) + newEndpoints + content.substring(productsEnd);
}

fs.writeFileSync('server.js', content, 'utf8');
console.log("Updated products in server.js");
