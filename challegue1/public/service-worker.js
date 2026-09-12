const CACHE_NAME = 'contactos-pwa-v1';

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: instalado');

  self.skipWaiting();
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: activado');

  event.waitUntil(self.clients.claim());
});

// Interceptar solicitudes
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // HTML → Network First
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  // JS y CSS → Cache First
  if (
    request.destination === 'script' ||
    request.destination === 'style'
  ) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Imágenes → Stale While Revalidate
  if (request.destination === 'image') {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // APIs → Network First
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request));
    return;
  }
});

// Network First
async function networkFirst(request) {
  try {
    const response = await fetch(request);

    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());

    return response;
  } catch (error) {
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    throw error;
  }
}

// Cache First
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  const response = await fetch(request);

  const cache = await caches.open(CACHE_NAME);
  cache.put(request, response.clone());

  return response;
}

// Stale While Revalidate
async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);

  const networkResponse = fetch(request)
    .then(async (response) => {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());

      return response;
    })
    .catch(() => null);

  return cachedResponse || await networkResponse;
}