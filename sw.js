// KOLASE KERJA - service worker (v6)
// Satu file index.html berisi menu, Kolase, dan Edit Poto, jadi cukup cache index.html.
const V = 'kolase-v6';
const SHELL = ['./', 'index.html', 'manifest.json', 'icon-192.png'];
const CDN = /(^|\.)(fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|unpkg\.com)$/;

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(V)
      .then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);

  // Font & library dari CDN: cache dulu, kalau belum ada baru ambil dari jaringan
  if (CDN.test(u.hostname)) {
    e.respondWith(
      caches.open(V).then(c =>
        c.match(r).then(hit => hit || fetch(r).then(res => {
          if (res && (res.ok || res.type === 'opaque')) c.put(r, res.clone());
          return res;
        }))
      )
    );
    return;
  }

  // File aplikasi sendiri: jaringan dulu (selalu versi terbaru), cache jika offline
  if (u.origin === location.origin) {
    e.respondWith(
      fetch(r)
        .then(res => {
          if (res.ok) {
            const cp = res.clone();
            caches.open(V).then(c => c.put(r, cp));
          }
          return res;
        })
        .catch(() =>
          caches.match(r, { ignoreSearch: true }).then(hit => hit || caches.match('index.html'))
        )
    );
  }
});
