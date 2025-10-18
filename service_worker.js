self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      console.log('Caching resources...');
      return cache.addAll([
        '/.', 
        '/index.html'// パスを絶対にする
        '/style.css',
        '/button.png',
        '/hazure.png',
        '/atari.mp4',
        '/manifest.json'  // マニフェストもキャッシュに追加
      ]).catch((error) => {
        console.error('キャッシュの追加中にエラーが発生しました:', error);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated.');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== 'my-cache') {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('Fetching: ', event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log('Returning from cache: ', event.request.url);
        return response;
      }
      console.log('Fetching from network: ', event.request.url);
      return fetch(event.request);
    })
  );
});
