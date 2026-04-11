const https = require('https');

const refs = [
  'Lamentations 3:22-23', 'Matthew 11:28', 'Proverbs 3:5', 
  'Matthew 6:33', 'John 14:27', 'Ephesians 2:8-9', 
  'Ecclesiastes 3:11', 'Ephesians 1:7', 'Hebrews 11:1',
  'Isaiah 59:2', 'John 3:16', '1 Peter 2:24', 'Revelation 3:20',
  'Genesis 1:31', 'Romans 3:23', 'Romans 6:23', 'Romans 5:8', 'John 11:25', 'Ephesians 2:8'
];

async function fetchVerse(ref) {
  return new Promise((resolve, reject) => {
    const url = `https://www.biblegateway.com/passage/?search=${encodeURIComponent(ref)}&version=NIV`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // extract <meta property="og:description" content="..." />
        const match = data.match(/<meta property="?og:description"? content="([^"]+)"/);
        if (match) {
          // Clean up HTML entities
          let text = match[1]
            .replace(/&#8220;/g, '"')
            .replace(/&#8221;/g, '"')
            .replace(/&#8216;/g, "'")
            .replace(/&#8217;/g, "'")
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'");
          // Remove trailing " - Read..." if present
          text = text.replace(/\s*-\s*Read.+$/, '');
          resolve({ ref, text });
        } else {
          resolve({ ref, text: "NOT FOUND" });
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const ref of refs) {
    const res = await fetchVerse(ref);
    console.log(`[${res.ref}] ${res.text}`);
    // Wait a brief moment to be polite to the server
    await new Promise(r => setTimeout(r, 200));
  }
}

run();
