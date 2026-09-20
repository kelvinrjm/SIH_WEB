import os
import glob

buyer_files = glob.glob('/var/www/html/html_bkp/SIH_main/sih-k/pages/buyer/*.html')
farmer_files = glob.glob('/var/www/html/html_bkp/SIH_main/sih-k/pages/farmer/*.html')

for fpath in buyer_files + farmer_files:
    # Skip if we already added it in chats.html which we just created
    if 'chats.html' in fpath:
        continue
    
    with open(fpath, 'r') as f:
        content = f.read()
    
    # Check if already present
    if 'href="chats.html"' in content:
        continue
        
    # Find orders.html link and inject chats.html right after
    # We will do a simple string replacement
    
    # We will look for </a> after orders.html
    import re
    # Using regex to find the orders.html nav item
    pattern = r'(<a href="orders.html"[^>]*>.*?</a>)'
    
    replacement = r'\1\n                <a href="chats.html" class="nav-item"><i data-lucide="message-square"></i><span data-i18n="Chats">Chats</span></a>'
    
    new_content = re.sub(pattern, replacement, content, count=1, flags=re.DOTALL)
    
    if content != new_content:
        with open(fpath, 'w') as f:
            f.write(new_content)
        print(f"Updated {fpath}")

