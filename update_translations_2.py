import re

file_path = '/var/www/html/html_bkp/SIH_main/sih-k/js/language.js'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

en_add = """
        "FarmLink Assistant": "FarmLink Assistant",
"""
ta_add = """
        "FarmLink Assistant": "ஃபார்ம்லிங்க் உதவியாளர்",
"""
hi_add = """
        "FarmLink Assistant": "फार्मलिंक सहायक",
"""

content = content.replace("'en': {", "'en': {" + en_add, 1)
content = content.replace("'ta': {", "'ta': {" + ta_add, 1)
content = content.replace("'hi': {", "'hi': {" + hi_add, 1)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated js/language.js")
