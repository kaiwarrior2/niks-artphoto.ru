// Service Worker для кэширования ресурсов
const CACHE_NAME = 'niks-photo-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/portfolio.html',
    '/about.html',
    '/blog.html',
    '/contact.html',
    '/global-styles.css',
    '/responsive.css',
    '/effects.css',
    '/performance.js',
    '/images/niks.png',
    '/fonts/fonts.css',
    '/fonts/Inter-Regular.woff2',
    '/fonts/Inter-Medium.woff2',
    '/fonts/Montserrat-Regular.woff2',
    '/fonts/Montserrat-SemiBold.woff2',
    '/fonts/PlayfairDisplay-Regular.woff2',
    '/fonts/RussoOne-Regular.ttf'
];

// Установка Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Обработка запросов
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Возвращаем кэшированную версию или загружаем из сети
                if (response) {
                    return response;
                }
                
                return fetch(event.request).then(response => {
                    // Проверяем валидность ответа
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Клонируем ответ для кэширования
                    const responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                });
            })
    );
});

// Обновление Service Worker
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});