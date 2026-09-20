import os
import re

def walk_dir(d):
    files_list = []
    for root, dirs, files in os.walk(d):
        if 'node_modules' in root: continue
        for f in files:
            if f.endswith('.html'):
                files_list.append(os.path.join(root, f))
    return files_list

html_files = walk_dir('.')

# Tags we want to check for pure text content
valid_tags = {'h1','h2','h3','h4','h5','h6','p','span','a','button','label','th','strong','b','div','li'}

# Regex looks for <tag ...> Text </tag>
# It must not already have data-i18n
pattern = re.compile(r'<([a-zA-Z1-6]+)([^>]*)>\s*([^<]+?)\s*</\1>')

total_replaced = 0
extracted_keys = set()

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    def replacer(match):
        global total_replaced
        tag = match.group(1).lower()
        attrs = match.group(2)
        text = match.group(3).strip()
        
        if tag not in valid_tags:
            return match.group(0)
            
        if 'data-i18n' in attrs:
            return match.group(0)
            
        # exclude scripts, styles, numeric, too short
        if len(text) < 3 or text.isdigit():
            return match.group(0)
            
        # exclude mostly non-alphabetic
        alpha_count = sum(c.isalpha() for c in text)
        if alpha_count < len(text) * 0.5:
            return match.group(0)
            
        # Must contain at least one uppercase letter to be a UI string (naive but works well)
        if not re.search(r'[A-Z]', text):
            return match.group(0)

        # Build replacement
        extracted_keys.add(text)
        total_replaced += 1
        
        # Replace newlines in text to space for data-i18n if any
        attr_text = text.replace('\n', ' ').replace('\r', '').replace('"', '&quot;')
        
        return f'<{tag}{attrs} data-i18n="{attr_text}">{match.group(3)}</{match.group(1)}>'
        
    new_content = pattern.sub(replacer, content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

print(f"Added data-i18n to {total_replaced} elements.")
print(f"Extracted {len(extracted_keys)} unique strings.")

# Append to language.js en block
lang_path = 'js/language.js'
with open(lang_path, 'r', encoding='utf-8') as f:
    lang_content = f.read()

en_add = "\\n".join([f"        \"{k.replace('\"', '\\\"')}\": \"{k.replace('\"', '\\\"')}\"," for k in extracted_keys])

match = re.search(r"('en'\s*:\s*\{.*?)(?=\s*\},)", lang_content, re.DOTALL)
if match:
    new_lang_content = lang_content[:match.end()] + ",\n" + en_add + lang_content[match.end():]
    with open(lang_path, 'w', encoding='utf-8') as f:
        f.write(new_lang_content)
    print("Appended keys to js/language.js")
else:
    print("Failed to append to language.js")

