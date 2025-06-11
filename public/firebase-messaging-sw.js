importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Replace these with your own Firebase config keys...
const firebaseConfig = {
  apiKey: "AIzaSyCOwd_xZvGDFNEielVfFyJXW8iOIGyVZ_E",
  authDomain: "sassows-9bfed.firebaseapp.com",
  projectId: "sassows-9bfed",
  storageBucket: "sassows-9bfed.firebasestorage.app",
  messagingSenderId: "749062938352",
  appId: "1:749062938352:web:bf34d415cf029c0056ec35",
  measurementId: "G-ZDYR2WWKY3"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // payload.fcmOptions?.link comes from our backend API route handle
  // payload.data.link comes from the Firebase Console where link is the 'key'
  const link = payload.fcmOptions?.link || payload.data?.link;

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./logo.png",
    data: { url: link },
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  console.log("[firebase-messaging-sw.js] Notification click received.");

  event.notification.close();

  // This checks if the client is already open and if it is, it focuses on the tab. If it is not open, it opens a new tab with the URL passed in the notification payload
  event.waitUntil(
    clients
      // https://developer.mozilla.org/en-US/docs/Web/API/Clients/matchAll
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(function (clientList) {
        const url = event.notification.data.url;

        if (!url) return;

        // If relative URL is passed in firebase console or API route handler, it may open a new window as the client.url is the full URL i.e. https://example.com/ and the url is /about whereas if we passed in the full URL, it will focus on the existing tab i.e. https://example.com/about
        for (const client of clientList) {
          if (client.url === url && "focus" in client) {
            return client.focus();
          }
        }

        if (clients.openWindow) {
          console.log("OPENWINDOW ON CLIENT");
          return clients.openWindow(url);
        }
      })
  );
});

// importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
// importScripts(
//   "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
// );

// const firebaseConfig = {
//   apiKey: "AIzaSyCOwd_xZvGDFNEielVfFyJXW8iOIGyVZ_E",
//   authDomain: "sassows-9bfed.firebaseapp.com",
//   projectId: "sassows-9bfed",
//   storageBucket: "sassows-9bfed.firebasestorage.app",
//   messagingSenderId: "749062938352",
//   appId: "1:749062938352:web:bf34d415cf029c0056ec35",
//   measurementId: "G-ZDYR2WWKY3"
// };

// firebase.initializeApp(firebaseConfig);
// const messaging = firebase.messaging();

// // Handle background messages - but DON'T show notifications
// // Firebase will automatically show them because we included the notification property
// messaging.onBackgroundMessage((payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
//   // You can still do other things here like:
//   // - Store data in IndexedDB
//   // - Update app state
//   // - Send analytics events
//   // - etc.
  
//   // But DO NOT call self.registration.showNotification() 
//   // Firebase handles this automatically when notification property is present
// });

// // Handle notification clicks - this will still work for Firebase's automatic notifications
// self.addEventListener("notificationclick", function (event) {
//   console.log("[firebase-messaging-sw.js] Notification click received.");
  
//   event.notification.close();

//   // Firebase automatically handles navigation if you set webpush.fcmOptions.link
//   // But you can still add custom logic here if needed
//   event.waitUntil(
//     clients
//       .matchAll({ type: "window", includeUncontrolled: true })
//       .then(function (clientList) {
//         // Get the URL from the notification data or fcmOptions
//         const url = event.notification.data?.FCM_MSG?.fcmOptions?.link || 
//                    event.notification.data?.link ||
//                    '/'; // fallback URL

//         // Check if the app is already open with this URL
//         for (const client of clientList) {
//           if (client.url.includes(url) && "focus" in client) {
//             return client.focus();
//           }
//         }

//         // Open new window if not already open
//         if (clients.openWindow) {
//           console.log("Opening new window:", url);
//           return clients.openWindow(url);
//         }
//       })
//   );
// });