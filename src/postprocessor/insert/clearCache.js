try {
    window._just_Manifest.forEach(item => {
        const url = `${window.location.protocol}//${window.location.hostname}/${item}`;
        if (caches) {
            caches.keys().then(cacheNames => {
                cacheNames.forEach(cacheName => {
                    caches.open(cacheName).then(cache => {
                        cache.match(url).then(response => {
                            if (response) {
                                cache.delete(url);
                            }
                        });
                    });
                });
            });
        }
    });
} catch {
    document.body.innerHTML = `<iframe src="/_just/e"></iframe>`;
    console.error('_just error: it looks like your website\'s scripts override window._just_Manifest.')
}