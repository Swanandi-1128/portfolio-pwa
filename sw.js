self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('portfolio-cache-v1').then(cache => {
      return cache.addAll([
        '/Portfolio.html',
        '/Portfolio.css',
        '/manifest.json',
        '/portfimg1.jpeg',
        '/portfimg2.jpg',
        '/portfimg3.jpg'
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
