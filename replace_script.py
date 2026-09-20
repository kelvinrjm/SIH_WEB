with open('/tmp/cf_vision.js', 'r') as f:
    cf_vision_sih = f.read()

with open('/tmp/cf_vision_k.js', 'r') as f:
    cf_vision_k = f.read()

with open('/tmp/verify_produce.js', 'r') as f:
    verify_sih = f.read()

with open('/tmp/verify_produce_k.js', 'r') as f:
    verify_k = f.read()

with open('/var/www/html/html_bkp/SIH_main/sih-k/server.js', 'r') as f:
    server_content = f.read()

server_content = server_content.replace(cf_vision_k, cf_vision_sih)
server_content = server_content.replace(verify_k, verify_sih)

import re
products_match = re.search(r"let aiVerification = \{\s*status: 'PENDING'\s*\};\s*if \(b\.verificationToken && verificationCache\.has\(b\.verificationToken\)\) \{.*?\n\s*\}", server_content, re.MULTILINE | re.DOTALL)
if products_match:
    server_content = server_content.replace(products_match.group(0), "let aiVerification = { status: 'PENDING' };")

with open('/var/www/html/html_bkp/SIH_main/sih-k/server.js', 'w') as f:
    f.write(server_content)
