// Bump this version every time you push new code → triggers update notification
const VERSION = 'blx-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable.png',
];

// Install: pre-cache all assets, then wait (don't skipWaiting yet — let the page decide)
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VERSION).then(c => c.addAll(ASSETS))
  );
});

// Activate: delete old caches, take control
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== VERSION).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: stale-while-revalidate for index.html, cache-first for everything else
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);
  const isPage = url.pathname.endsWith('/') || url.pathname.endsWith('.html');

  if (isPage) {
    // Stale-while-revalidate: serve cache immediately, update in background
    e.respondWith(
      caches.open(VERSION).then(cache =>
        cache.match(e.request).then(cached => {
          const fetchPromise = fetch(e.request).then(res => {
            if (res && res.status === 200) cache.put(e.request, res.clone());
            return res;
          }).catch(() => null);
          return cached || fetchPromise;
        })
      )
    );
  } else {
    // Cache-first for icons, manifest
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(res => {
          if (res && res.status === 200 && res.type !== 'opaque') {
            caches.open(VERSION).then(c => c.put(e.request, res.clone()));
          }
          return res;
        });
      })
    );
  }
});

// Receive skip-waiting message from the page
self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});
