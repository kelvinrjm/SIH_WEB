import re

with open('/var/www/html/html_bkp/SIH/server.js', 'r') as f:
    content = f.read()

# Extract cloudflareVisionVerify
cf_match = re.search(r'/\* ============================ CLOUDFLARE WORKERS AI.*?^}', content, re.MULTILINE | re.DOTALL)
if cf_match:
    with open('/tmp/cf_vision.js', 'w') as f:
        f.write(cf_match.group(0))

# Extract app.post('/api/verify-produce'
verify_match = re.search(r"^app\.post\('/api/verify-produce',.*?^}\);", content, re.MULTILINE | re.DOTALL)
if verify_match:
    with open('/tmp/verify_produce.js', 'w') as f:
        f.write(verify_match.group(0))
