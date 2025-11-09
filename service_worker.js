const CACHE_NAME = 'lottery-app-cache-v1';
// オフラインで動作させるためにキャッシュするすべてのファイル
const urlsToCache = [
  '/',
  '/index.html',
  // HTMLに埋め込まれているCSSは不要ですが、画像や動画は必須
  '/hazure.png',
  '/button.png',
  '/atari.mp4',
  '/icon.png', // PWAアイコン
  '/manifest.json' // マニフェストファイル自体もキャッシュ
];

// インストールイベント: Service Workerがインストールされたとき
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // すべてのファイルをキャッシュに追加
        return cache.addAll(urlsToCache);
      })
  );
});

// フェッチイベント: ネットワークリクエストが発生したとき
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // キャッシュにデータがあれば、キャッシュから返す
        if (response) {
          return response;
        }
        // キャッシュになければ、通常通りネットワークから取得する
        return fetch(event.request);
      })
  );
});

// アクティベートイベント: 古いキャッシュの削除 (オプション)
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // 新しいCACHE_NAMEに含まれない古いキャッシュを削除
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
