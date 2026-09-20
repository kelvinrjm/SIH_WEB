import re

with open('/var/www/html/html_bkp/SIH_main/sih-k/server.js', 'r') as f:
    content = f.read()

# Extract cloudflareVisionVerify
cf_match = re.search(r'/\* ============================ CLOUDFLARE WORKERS AI.*?^}', content, re.MULTILINE | re.DOTALL)
if cf_match:
    with open('/tmp/cf_vision_k.js', 'w') as f:
        f.write(cf_match.group(0))

# Extract verificationCache + app.post('/api/verify-produce'
verify_match = re.search(r"^const crypto = require\('crypto'\);.*?^app\.post\('/api/verify-produce',.*?^}\);", content, re.MULTILINE | re.DOTALL)
if verify_match:
    with open('/tmp/verify_produce_k.js', 'w') as f:
        f.write(verify_match.group(0))
