// Service worker mínimo — solo existe para que Chrome/Android permita instalar la app
// en la pantalla de inicio. No guarda nada offline (el sistema necesita internet para
// funcionar, ya que todo se guarda en Supabase), así que siempre deja pasar los pedidos
// directo a la red.
self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(fetch(event.request));
});
