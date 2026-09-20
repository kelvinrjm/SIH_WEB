import re
lang_path = 'js/language.js'
with open(lang_path, 'r', encoding='utf-8') as f:
    lang_content = f.read()

# get extracted_keys from the previous run
# We didn't save them, so let's just parse the HTMLs again quickly
import os
def walk_dir(d):
    files_list = []
    for root, dirs, files in os.walk(d):
        if 'node_modules' in root: continue
        for f in files:
            if f.endswith('.html'):
                files_list.append(os.path.join(root, f))
    return files_list

html_files = walk_dir('.')
extracted_keys = set()
pattern = re.compile(r'data-i18n="([^"]+)"')
for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    for match in pattern.finditer(content):
        extracted_keys.add(match.group(1))

en_add = "\\n".join([f"        \"{k.replace('\"', '\\\"')}\": \"{k.replace('\"', '\\\"')}\"," for k in extracted_keys])

# match en: { ... }
match = re.search(r"(en\s*:\s*\{.*?)(?=\s*\},)", lang_content, re.DOTALL)
if match:
    new_lang_content = lang_content[:match.end()] + ",\n" + en_add + lang_content[match.end():]
    with open(lang_path, 'w', encoding='utf-8') as f:
        f.write(new_lang_content)
    print("Appended keys to js/language.js")
else:
    print("Failed to append to language.js")
