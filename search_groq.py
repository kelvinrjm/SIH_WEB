import urllib.request
import urllib.parse
import json

url = "https://html.duckduckgo.com/html/?q=" + urllib.parse.quote("site:groq.com vision models current llama")
req = urllib.request.Request(
    url, 
    data=None, 
    headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
)

try:
    response = urllib.request.urlopen(req)
    html = response.read().decode('utf-8')
    print("Found HTML, length:", len(html))
    import re
    # Extract just text snippets
    snippets = re.findall(r'<a class="result__snippet[^>]*>(.*?)</a>', html, re.IGNORECASE | re.DOTALL)
    for i, s in enumerate(snippets):
        print(f"Result {i+1}:", re.sub('<[^<]+>', '', s).strip())
except Exception as e:
    print(e)
