const CACHE_NAME = 'fst-cache-v1';
const urlsToCache = [
  './alumnos.html',
  './manifest.json',
  './logo chico.png'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar peticiones para el modo Offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve del caché si lo encuentra, sino va a la red
        return response || fetch(event.request);
      })
  );
});