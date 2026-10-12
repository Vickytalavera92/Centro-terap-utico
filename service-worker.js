// Service worker mínimo — solo existe para que Chrome/Android permita instalar la app
// en la pantalla de inicio. No guarda nada offline (el sistema necesita internet para
// funcionar, ya que todo se guarda en Supabase). Siempre pide la versión más nueva a la
// red (sin usar copias guardadas), así las actualizaciones llegan apenas se publican.
self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    (self.caches ? caches.keys().then(function(keys) { return Promise.all(keys.map(function(k) { return caches.delete(k); })); }) : Promise.resolve())
      .then(function() { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(event) {
  var req = event.request;
  if (req.method !== 'GET') { event.respondWith(fetch(req)); return; }
  var esPagina = req.mode === 'navigate' || (req.headers.get('accept') || '').indexOf('text/html') !== -1;
  event.respondWith(fetch(req, esPagina ? { cache: 'no-store' } : undefined).catch(function() { return fetch(req); }));
});
