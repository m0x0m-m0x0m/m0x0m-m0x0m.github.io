self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');  // サービスワーカーがインストール中であることを確認
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      console.log('Caching resources...');  // リソースがキャッシュに追加されていることを確認
      return cache.addAll([
        './',
        '/index.html',
        '/button.png',
        '/hazure.png',
        '/atari.mp4',
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated.');  // サービスワーカーがアクティベートされた時
});

self.addEventListener('fetch', (event) => {
  console.log('Fetching: ', event.request.url);  // どのリクエストがキャッシュされているか、またはネットワークから取得されているか
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log('Returning from cache: ', event.request.url);  // キャッシュからデータを返す
        return response;
      }
      console.log('Fetching from network: ', event.request.url);  // ネットワークからデータを取得
      return fetch(event.request);
    })
  );
});
