// service worker
const CACHE_NAME = 'just-gha-gm-pages'; /* Just an Ultimate Site Tool - GitHub Action - Generator Mode - pages */
const URLsToCache = 'REPLACE_PAGES';

const CACHE_ID_URLS = [
    '/_just/',
    '/_just/index.json'
];

let currentCacheId = null;
const defaultCacheId = 'default';

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        getCacheId().then(cacheId => {
            currentCacheId = cacheId;
            return caches.open(CACHE_NAME)
                .then(cache => {
                    return cache.addAll(URLsToCache);
                })
                .then(()=>{});
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        checkAndUpdateCache().then(()=>{})
    );
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
        return;
    };
    
    const requestUrl = new URL(event.request.url);
    
    const shouldCache = URLsToCache.some(url => {
        return requestUrl.pathname === url;
    });
    
    if (shouldCache) {
        event.respondWith(
            caches.open(CACHE_NAME).then(cache => {
                return cache.match(event.request).then(response => {
                    if (response) {
                        return response;
                    };
                    
                    return fetch(event.request).then(networkResponse => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
        );
    }
});

const getCacheId=async()=>{
    for (const url of CACHE_ID_URLS) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                return data.cache || defaultCacheId;
            }
        }catch(error){}
    }
    return defaultCacheId;
};

const checkAndUpdateCache=async()=>{
    try {
        const newCacheId = await getCacheId();
        
        if (currentCacheId !== newCacheId) {
            currentCacheId = newCacheId;
            
            const keys = await caches.keys();
            await Promise.all(
                keys.map(key => {
                    if (key === CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
            
            const cache = await caches.open(CACHE_NAME);
            await cache.addAll(URLsToCache);
        }else{}
    }catch(error){}
};

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'CHECK_CACHE') {
        checkAndUpdateCache().then(() => {
            event.ports[0].postMessage({result: 'Done'});
        });
    }
});
