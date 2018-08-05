let staticCacheName='restaurant-app-v1';

self.addEventListener('install', function(event){
    let urlsToCache=[
        '/',
        '/restaurant.html',
        '/css/styles.css',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        'https://cdnjs.cloudflare.com/ajax/libs/blazy/1.8.2/blazy.min.js',
        '/js/idb.js',
        '/images/'
    ];

    event.waitUntil(
        caches.open(staticCacheName).then(function(cache){
            return cache.addAll(urlsToCache);
        })
    )
})

self.addEventListener('activate', function(event){
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.filter(function(cacheName){
                    return cacheName.startsWith('restaurant-app-') && cacheName != staticCacheName;
                }).map(function(cacheName){
                    return caches.delete(cacheName);
                })
            )
        })
    )
})

self.addEventListener('fetch', function(event){
    /* console.log(event.request); */
   /*  event.respondWith(
        fetch(event.request).catch(function() {
            return caches.match(event.request);
        })
    ) */
    const requestUrlSplit = event.request.url.split(/[?#]/);
    const requestUrl = requestUrlSplit[0];

    if (requestUrl.startsWith(self.location.origin)) {
        event.respondWith(
            caches.match(requestUrl).then(cacheFound => {
                if (cacheFound) {
                    return cacheFound;
                }

                return caches.open(staticCacheName).then(function (cache) {
                    return fetch(event.request).then(function (response) {
                        return cache.put(requestUrl, response.clone())
                        .then(function() {
                            return response;
                        });
                    });
                });
            })
        );
    };
})