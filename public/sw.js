
const CACHE_NAME = 'python-maze-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192x192.png',
  './icon-512x512.png',
  './favicon.ico',
  'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js',
  'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.asm.js',
  'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.asm.wasm',
  'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/python_stdlib.zip',
  'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=Press+Start+2P&display=swap'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interceptação de requisições (Cache First Strategy)
self.addEventListener('fetch', (event) => {
  // Ignorar chamadas da API do Google GenAI (exigem internet)
  if (event.request.url.includes('generativelanguage.googleapis.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retorna do cache se existir, caso contrário busca na rede e armazena no cache
      return response || fetch(event.request).then((fetchResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          // Apenas faz cache de requisições bem-sucedidas e recursos estáticos/CDNs
          if (event.request.method === 'GET') {
            cache.put(event.request, fetchResponse.clone());
          }
          return fetchResponse;
        });
      });
    }).catch(() => {
      // Se falhar a rede e o cache (offline e item não cacheado)
      if (event.request.mode === 'navigate') {
        return caches.match('./index.html');
      }
    })
  );
});
