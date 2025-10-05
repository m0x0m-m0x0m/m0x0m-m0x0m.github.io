var CACHE_NAME = 'pwa-sample-cache-v1';
var urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/images/icon-192x192.jpg',
    '/images/icon-512x512.jpg',
    '/atari.mp4',
    '/hazure.png',
    '/button.png'
];

// インストール処理
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // キャッシュがあればそれを返し、なければネットワークから取得
                return response || fetch(event.request);
            })
    );
});
