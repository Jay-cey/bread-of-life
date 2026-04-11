import json
import urllib.request
import re
import os

def fetch_verse(ref):
    url = f"https://www.biblegateway.com/passage/?search={urllib.parse.quote(ref)}&version=NIV"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        match = re.search(r'<meta property="?og:description"? content="([^"]+)"', html)
        if match:
            text = match.group(1)
            # Unescape html entities
            text = text.replace('&#8220;', '"').replace('&#8221;', '"')
            text = text.replace('&#8216;', "'").replace('&#8217;', "'")
            text = text.replace('&quot;', '"').replace('&#39;', "'")
            # Clear end trail
            text = re.sub(r'\s*-\s*Read.+$', '', text)
            # Clean up leading/trailing quotes sometimes added by BG
            text = text.strip()
            return text
    except Exception as e:
        print(f"Error fetching {ref}: {e}")
    return None

# files to check: lib/verses.json
with open('lib/verses.json', 'r') as f:
    data = json.load(f)

for category in data:
    for item in data[category]:
        fetched = fetch_verse(item['reference'])
        if fetched:
            print(f"[{item['reference']}]  {fetched}")
            item['verse'] = fetched
            
with open('lib/verses.json', 'w') as f:
    json.dump(data, f, indent=2)
    
print("verses.json updated")
