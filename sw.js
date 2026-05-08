const CACHE_NAME = 'second-show-v7';
const ASSETS = [
  '/',
  '/index.html',
  '/site.webmanifest',
  '/images/logo/final-app-logo.png?v=7'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
