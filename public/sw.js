const CACHE_NAME = 'bread-of-life-v2';
const OFFLINE_FALLBACKS = ['/offline', '/en/offline', '/yo/offline'];
const PRECACHE_URLS = [
  '/',
  '/en',
  '/yo',
  '/manifest.webmanifest',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/apple-touch-icon.png',
  ...OFFLINE_FALLBACKS,
];

function isSameOriginGet(request) {
  return request.method === 'GET' && request.url.startsWith(self.location.origin);
}

async function cacheResponse(request, response) {
  if (!response || response.status !== 200 || response.type === 'opaque') {
    return response;
  }

  const cache = await caches.open(CACHE_NAME);
  cache.put(request, response.clone());
  return response;
}

async function offlineResponseFor(request) {
  const url = new URL(request.url);
  const segments = url.pathname.split('/').filter(Boolean);
  const locale = segments[0];
  const localizedFallback = locale ? `/${locale}/offline` : null;

  if (localizedFallback) {
    const localizedResponse = await caches.match(localizedFallback);
    if (localizedResponse) {
      return localizedResponse;
    }
  }

  for (const fallback of OFFLINE_FALLBACKS) {
    const response = await caches.match(fallback);
    if (response) {
      return response;
    }
  }

  return Response.error();
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
          return undefined;
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (!isSameOriginGet(request)) {
    return;
  }

  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((response) => cacheResponse(request, response))
        .catch(async () => {
          const cached = await caches.match(request);
          return cached || offlineResponseFor(request);
        })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(request)
        .then((response) => cacheResponse(request, response))
        .catch(() => {
          if (request.destination === 'image') {
            return caches.match('/icon-192x192.png');
          }

          return Response.error();
        });
    })
  );
});
