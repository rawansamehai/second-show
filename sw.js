const CACHE_NAME = 'second-show-v9';
const ASSETS = [
  '/second-show/',
  '/second-show/index.html',
  '/second-show/site.webmanifest',
  '/second-show/images/logo/secondshowlogo.jpg?v=9'
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
