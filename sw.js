// バージョンを上げるたびに古いキャッシュが自動削除される
const CACHE = 'mastershelf-v1';

self.addEventListener('install', e => {
  // 即座に新しいSWを有効化（待機しない）
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => {
        console.log('Deleting cache:', k);
        return caches.delete(k);
      }))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // 全リクエストを常にネットワーク優先で取得
  // キャッシュは使わない（常に最新を取得）
  e.respondWith(
    fetch(e.request).catch(() => {
      // オフライン時のみキャッシュから返す
      return caches.match(e.request);
    })
  );
});
