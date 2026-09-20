import os
import re

html_dir = '/var/www/html/html_bkp/SIH_main/sih-k'

language_select_html = """
                <div class="topbar-right">
                    <!-- Language Selector -->
                    <div class="language-selector">
                        <i data-lucide="globe" style="width:16px;height:16px;"></i>
                        <select class="lang-select-input" aria-label="Language selector">
                            <option value="en">English</option>
                            <option value="ta">தமிழ்</option>
                            <option value="hi">हिन्दी</option>
                        </select>
                    </div>
                </div>
"""

for root, dirs, files in os.walk(html_dir):
    if 'node_modules' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            
            # calculate depth for ../
            rel_path = os.path.relpath(filepath, html_dir)
            depth = rel_path.count(os.sep)
            prefix = '../' * depth if depth > 0 else ''
            
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            modified = False
            
            # Inject language.js if missing
            if 'language.js' not in content:
                # Find <script src=".../config.js"></script> and insert after it, or before </body>
                if 'config.js' in content:
                    content = re.sub(r'(<script src="[^"]*config\.js"></script>)', r'\1\n    <script src="' + prefix + 'js/language.js"></script>', content)
                else:
                    content = content.replace('</body>', f'    <script src="{prefix}js/config.js"></script>\n    <script src="{prefix}js/language.js"></script>\n</body>')
                modified = True

            # Inject chatbot.js for farmer and buyer/merchant if missing
            is_farmer_or_buyer = 'pages/farmer' in rel_path or 'pages/buyer' in rel_path
            if is_farmer_or_buyer and 'chatbot.js' not in content:
                content = content.replace('</body>', f'    <script src="{prefix}js/chatbot.js"></script>\n</body>')
                modified = True
                
            # Inject language selector if missing
            if 'lang-select-input' not in content:
                if '<header class="topbar">' in content:
                    # try to insert before </header>
                    # check if topbar-right exists
                    if 'topbar-right' in content:
                        content = content.replace('<div class="topbar-right">', '<div class="topbar-right">\n                    <div class="language-selector">\n                        <i data-lucide="globe" style="width:16px;height:16px;"></i>\n                        <select class="lang-select-input" aria-label="Language selector">\n                            <option value="en">English</option>\n                            <option value="ta">தமிழ்</option>\n                            <option value="hi">हिन्दी</option>\n                        </select>\n                    </div>')
                    else:
                        content = content.replace('</header>', language_select_html + '            </header>')
                    modified = True
                elif 'auth-card' in content:
                    auth_lang = """
        <div class="auth-lang-bar">
            <div class="language-selector">
                <i data-lucide="globe" style="width:16px;height:16px;"></i>
                <select class="lang-select-input" id="authLangSelect" aria-label="Language selector">
                    <option value="en">English</option>
                    <option value="ta">தமிழ்</option>
                    <option value="hi">हिन्दी</option>
                </select>
            </div>
        </div>"""
                    content = content.replace('<div class="auth-card"', '<div class="auth-card"' + auth_lang)
                    modified = True

            if modified:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Fixed: {rel_path}")

