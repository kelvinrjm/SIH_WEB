import os
import re

html_dir = '/var/www/html/html_bkp/SIH_main/sih-k'
html_files = []

for root, dirs, files in os.walk(html_dir):
    if 'node_modules' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            html_files.append(os.path.join(root, file))

results = []
for file in html_files:
    with open(file, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    has_language_js = 'language.js' in content
    has_lang_selector = 'lang-select' in content
    has_chatbot_js = 'chatbot.js' in content
    
    if not (has_language_js and has_lang_selector and has_chatbot_js):
        results.append({
            'file': file.replace(html_dir + '/', ''),
            'lang_js': has_language_js,
            'lang_sel': has_lang_selector,
            'chat_js': has_chatbot_js
        })

print(f"Total HTML files checked: {len(html_files)}")
print(f"Files missing components: {len(results)}")
for r in sorted(results, key=lambda x: x['file']):
    print(f"{r['file']} - lang_js: {r['lang_js']}, lang_sel: {r['lang_sel']}, chat_js: {r['chat_js']}")

