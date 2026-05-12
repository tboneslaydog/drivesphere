// Bump this any time you want every installed client to discard their cached
// HTML and re-fetch from Netlify on the next page load.
const CACHE_NAME = 'drivesphere-v2026-05-11-light-theme-nogforce';

// Static assets that are safe to cache aggressively (third-party CDN resources
// whose URLs are versioned).
const STATIC_ASSETS = [
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

self.addEventListener('install', (event) => {
    // Activate the new SW immediately instead of waiting for all old tabs to
    // close. Combined with clients.claim() below, this means the next page
    // load picks up the new fetch strategy without the user having to fully
    // restart the PWA.
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil((async () => {
        const names = await caches.keys();
        await Promise.all(
            names
                .filter((name) => name !== CACHE_NAME)
                .map((name) => caches.delete(name))
        );
        await self.clients.claim();
    })());
});

// Network-first for navigations and same-origin requests so a fresh deploy is
// picked up on the next load. The cache is only used as an offline fallback.
// Cache-first for the third-party CDN assets above.
self.addEventListener('fetch', (event) => {
    const request = event.request;

    if (request.method !== 'GET') {
        return;
    }

    const url = new URL(request.url);
    const isNavigation =
        request.mode === 'navigate' ||
        (request.destination === 'document');
    const isSameOrigin = url.origin === self.location.origin;

    if (isNavigation || isSameOrigin) {
        event.respondWith((async () => {
            try {
                const fresh = await fetch(request, { cache: 'no-store' });
                if (fresh && fresh.ok && isSameOrigin) {
                    const cache = await caches.open(CACHE_NAME);
                    cache.put(request, fresh.clone()).catch(() => {});
                }
                return fresh;
            } catch (err) {
                const cached = await caches.match(request);
                if (cached) return cached;
                if (isNavigation) {
                    const offlineHtml = await caches.match('/index.html');
                    if (offlineHtml) return offlineHtml;
                }
                throw err;
            }
        })());
        return;
    }

    event.respondWith((async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        const fresh = await fetch(request);
        if (fresh && fresh.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, fresh.clone()).catch(() => {});
        }
        return fresh;
    })());
});

self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

function doBackgroundSync() {
    return new Promise((resolve) => {
        console.log('Background sync completed');
        resolve();
    });
}

self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'New driving data available',
        icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFlMjkzYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMzIiIGZpbGw9IiMzYjgyZjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5EPC90ZXh0Pjwvc3ZnPg==',
        badge: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFlMjkzYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMzIiIGZpbGw9IiMzYjgyZjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5EPC90ZXh0Pjwvc3ZnPg==',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            { action: 'explore', title: 'View Routes' },
            { action: 'close', title: 'Close' }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('DriveSphere', options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    if (event.action === 'explore') {
        event.waitUntil(clients.openWindow('/?page=routes'));
    }
});

// Allow pages to ask the SW to skip waiting (useful if you wire a "new version
// available, tap to reload" banner later).
self.addEventListener('message', (event) => {
    if (event.data === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
