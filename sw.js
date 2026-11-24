const CACHE_NAME = 'salli-app-v1';
const ASSETS = [
  '/salli-ala-nabi4/',
  '/salli-ala-nabi4/index.html',
  '/salli-ala-nabi4/manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => {
      return cached || fetch(e.request).then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, response.clone());
          return response;
        });
      });
    }).catch(() => caches.match('/salli-ala-nabi4/index.html'))
  );
});
