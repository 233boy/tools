(function () {
    self.importScripts("https://cdn.jsdelivr.net/npm/sw-toolbox@3.6.0/sw-toolbox.min.js");
    // self.importScripts("/v2ray/sw-toolbox.js");
    self.toolbox.router.get('/(.*)', self.toolbox.networkFirst, {
        cache: {
            name: 'sw'
        }
    });
    self.toolbox.router.get('/(.*)', self.toolbox.cacheFirst, {
        origin: /cdnjs\.cloudflare\.com/,
        cache: {
            name: 'static'
        }
    });
    self.addEventListener('install', function (event) {
        return event.waitUntil(self.skipWaiting())
    });
    self.addEventListener('activate', function (event) {
        // return event.waitUntil(self.clients.claim())
        var cacheWhitelist = ['sw','static'];

        event.waitUntil(
            caches.keys().then(function (keyList) {
                return Promise.all(keyList.map(function (key) {
                    if (cacheWhitelist.indexOf(key) === -1) {
                        return caches.delete(key);
                    }
                }));
            })
        );
    })
})();