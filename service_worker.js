self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        '/index.html',
        '/images/icon-192x192.jpg',
        '/images/icon-512x512.jpg',
        '/button.png',
        '/hazure.png',
        '/atari.mp4',
        // 他に必要なファイルを追加
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated.');
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
