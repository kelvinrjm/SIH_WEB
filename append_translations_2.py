import json

file_path = '/var/www/html/html_bkp/SIH_main/sih-k/js/language.js'
with open('/var/www/html/html_bkp/SIH_main/sih-k/translations_to_add_2.json', 'r', encoding='utf-8') as f:
    translations = json.load(f)

en_add = "\n"
ta_add = "\n"
hi_add = "\n"

for t in translations:
    en_key = t["en"].replace('"', '\\"')
    en_val = t["en"].replace('"', '\\"')
    ta_val = t["ta"].replace('"', '\\"')
    hi_val = t["hi"].replace('"', '\\"')
    
    en_add += f'        "{en_key}": "{en_val}",\n'
    ta_add += f'        "{en_key}": "{ta_val}",\n'
    hi_add += f'        "{en_key}": "{hi_val}",\n'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("en: {", "en: {" + en_add, 1)
content = content.replace("ta: {", "ta: {" + ta_add, 1)
content = content.replace("hi: {", "hi: {" + hi_add, 1)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated js/language.js successfully!")
