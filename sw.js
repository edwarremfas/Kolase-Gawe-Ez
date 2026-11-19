// Service Worker - Pembuat Kolase Kerja (v3)
// Setiap kali index.html diperbarui, naikkan angka versi (v4, v5, ...) agar cache lama terhapus.
const CACHE = 'kolase-v3';
const ASSETS = ['./', './index.html', './manifest.json', './icon-192.png'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.allSettled(ASSETS.map(a => c.add(a))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // Biarkan permintaan ke situs lain (mis. library HEIC dari CDN) langsung lewat
  if (url.origin !== self.location.origin) return;

  // Halaman utama: ambil dari internet dulu agar update langsung terlihat, cache sebagai cadangan offline
  if (req.mode === 'navigate' || req.destination === 'document') {
    e.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // File lain (ikon, manifest): pakai cache dulu, sambil diperbarui di belakang layar
  e.respondWith(
    caches.match(req).then(cached => {
      const net = fetch(req)
        .then(res => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || net;
    })
  );
});
