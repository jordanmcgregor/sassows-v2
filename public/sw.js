self.addEventListener('push', function (event) {
    if (event.data) {
      const data = event.data.json()
      const options = {
        body: data.body,
        icon: data.icon || '/icon.png',
        badge: '/badge.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: '2',
        },
      }
      event.waitUntil(self.registration.showNotification(data.title, options))
    }
  })
   
  self.addEventListener('notificationclick', function (event) {
    console.log('Notification click received.')
    event.notification.close()
    event.waitUntil(clients.openWindow('<https://sassows.vercel.app>'))
  })

  self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installed');
    self.skipWaiting(); // Optional: take control immediately
  });
  
  self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activated');
  });
  
  self.addEventListener('fetch', (event) => {
    // Optional: handle caching here
  });