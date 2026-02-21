const CACHE_NAME = 'ramadan-app-v1';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './icon-192.jpg',
    'https://www.islamcan.com/audio/adhan/azan1.mp3'
];

// Service Worker ইন্সটল এবং ফাইল ক্যাশ করা
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// অফলাইনে থাকার সময় ক্যাশ থেকে ডাটা লোড করা
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // ক্যাশে থাকলে সেটা রিটার্ন করবে, না থাকলে নেটওয়ার্ক থেকে আনবে
                return response || fetch(event.request);
            })
    );
});

// পুরোনো ক্যাশ ডিলিট করে নতুন ভার্সন আপডেট করা
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
