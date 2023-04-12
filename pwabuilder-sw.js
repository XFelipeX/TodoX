// This is the "Offline page" service worker

importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js',
);

const CACHE = 'pwabuilder-page';

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = 'offline.html';

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) =>
        cache.addAll([
          offlineFallbackPage,
          'index.html',
          './js/file.js',
          './js/main.js',
          './js/storage.js',
          './js/task.js',
          './js/topic.js',
          './js/util.js',
          './css/style.css',
          './css/modal.css',
        ]),
      ),
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  // if (event.request.mode === 'navigate') {
  //   event.respondWith(
  //     (async () => {
  //       try {
  //         const preloadResp = await event.preloadResponse;

  //         if (preloadResp) {
  //           return preloadResp;
  //         }

  //         const networkResp = await fetch(event.request);
  //         return networkResp;
  //       } catch (error) {
  //         const cache = await caches.open(CACHE);
  //         const cachedResp = await cache.match(offlineFallbackPage);
  //         return cachedResp;
  //       }
  //     })(),
  //   );
  // }

  // event.respondWith(
  //   caches.match(event.request).then(function (response) {
  //     // get cache
  //     if (response) {
  //       return response;
  //     }

  //     // return cache
  //     return fetch(event.request).then(function (response) {
  //       return caches.open(CACHE).then(function (cache) {
  //         cache.put(event.request.url, response.clone());
  //         return response;
  //       });
  //     });
  //   }),
  // );

  event.respondWith(
    (async function () {
      try {
        var res = await fetch(event.request);
        var cache = await caches.open(CACHE);
        cache.put(event.request.url, res.clone());
        return res;
      } catch (error) {
        return caches.match(event.request);
      }
    })(),
  );
});
