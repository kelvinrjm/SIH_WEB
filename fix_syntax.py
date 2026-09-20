with open('/var/www/html/html_bkp/SIH_main/sih-k/server.js', 'r') as f:
    content = f.read()

import re
bad_code = r"let aiVerification = \{ status: 'PENDING' \};;\n\s*verificationCache\.delete\(b\.verificationToken\); // single use\n\s*\}"
content = re.sub(bad_code, "let aiVerification = { status: 'PENDING' };", content, flags=re.MULTILINE)

with open('/var/www/html/html_bkp/SIH_main/sih-k/server.js', 'w') as f:
    f.write(content)
