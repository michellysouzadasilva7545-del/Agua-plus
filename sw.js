const CACHE_NAME = "agua-plus-v1";

const ARQUIVOS = [
    "./",
    "./index.html",
    "./manifest.json",
    "./icon-512.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ARQUIVOS))
    );

    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(chaves =>
            Promise.all(
                chaves
                    .filter(chave => chave !== CACHE_NAME)
                    .map(chave => caches.delete(chave))
            )
        )
    );

    self.clients.claim();
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(resposta => resposta || fetch(event.request))
    );
});
