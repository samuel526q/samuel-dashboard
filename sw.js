const CACHE = 'samuel-v2';
const ASSETS = ['/samuel-dashboard/', '/samuel-dashboard/index.html', '/samuel-dashboard/manifest.json', '/samuel-dashboard/sw.js', '/samuel-dashboard/icon.svg'];

self.addEventListener('install', e =>
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)))
);

self.addEventListener('activate', e =>
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ))
);

self.addEventListener('fetch', e =>
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('/samuel-dashboard/index.html'))))
);
