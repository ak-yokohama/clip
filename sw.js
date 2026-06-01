// Service Worker - キャッシュ完全無効版
// インストール時に即座に有効化
self.addEventListener('install', () => {
  self.skipWaiting();
});

// 有効化時に古いキャッシュをすべて削除
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// fetchは常にネットワーク優先、キャッシュ一切使わない
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request, { cache: 'no-store' })
      .catch(() => new Response('オフライン中です', { status: 503 }))
  );
});
