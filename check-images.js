const https = require('https');
const images = {
  anxious: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=800&q=80", // stormy waves
  lost: "https://images.unsplash.com/photo-1442850473887-0fb77ce0bc86?auto=format&fit=crop&w=800&q=80", // foggy forest path
  hopeful: "https://images.unsplash.com/photo-1465408953385-7c4627c29435?auto=format&fit=crop&w=1200&q=80", // beautiful sunrise / light rays
  grieving: "https://images.unsplash.com/photo-1438283173091-5dbf5c5a3206?auto=format&fit=crop&w=1200&q=80", // raindrop window / moody
  lonely: "https://images.unsplash.com/photo-1498677231914-50edd6bdbfe2?auto=format&fit=crop&w=800&q=80", // single person silhouette or vast empty 
  thankful: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80", // glowing sunset fields or warm leaves
  searching: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" // starry sky or compass
};

async function check() {
  for (const [key, url] of Object.entries(images)) {
    await new Promise(r => {
      https.get(url, res => {
         console.log(key, res.statusCode);
         // discard data
         res.on('data', () => {});
         res.on('end', () => r());
      }).on('error', () => {
         console.log(key, 'ERROR');
         r();
      })
    })
  }
}
check();
