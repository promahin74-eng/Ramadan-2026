self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
});

self.addEventListener('fetch', (e) => {
    // এটি অফলাইন সাপোর্টের জন্য, আপাতত বেসিক অবস্থায় রাখা হলো
    e.respondWith(fetch(e.request).catch(() => console.log('Offline')));
});
