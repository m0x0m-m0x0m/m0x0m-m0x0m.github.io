self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      console.log('Caching resources...');
      return cache.addAll([
        '/index.html', // インデックスファイル
        '/button.png',  // ボタン画像
        '/hazure.png',  // ハズレ画像
        '/atari.mp4',   // アタリ動画
        '/manifest.json' // マニフェストファイル
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
            return caches.delete(cacheName); // 古いキャッシュを削除
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
        console.log('Returning from cache: ', event.request.url); // キャッシュから返す
        return response;
      }
      console.log('Fetching from network: ', event.request.url); // ネットワークから取得
      return fetch(event.request);
    })
  );
});
