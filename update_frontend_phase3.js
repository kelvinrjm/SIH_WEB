const fs = require('fs');

const files = [
    'pages/buyer/marketplace.html',
    'pages/buyer/product-details.html'
];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        const oldLogic = `(p.listingSource === 'FIELD_OFFICER' || p.verificationStatus === 'VERIFIED')`;
        const newLogic = `(p.verification?.ai?.status === 'VERIFIED')
                                        ? \`<span class="badge" style="background:#E8F5E9; color:#1B5E20; border:1px solid #A5D6A7; font-size:0.7rem; font-weight:700; padding:2px 7px; border-radius:10px;"><i data-lucide="shield-check" style="width:11px;height:11px;display:inline;margin-right:2px;"></i>AI VERIFIED</span>\`
                                        : (p.listingSource === 'FIELD_OFFICER' || p.verificationStatus === 'VERIFIED')`;
        
        content = content.replaceAll(oldLogic, newLogic);
        
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
}
