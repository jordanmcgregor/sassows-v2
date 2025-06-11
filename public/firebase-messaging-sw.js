// --- Modular SDK for Service Worker ---
// Use the modular SDK for service worker
// import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging/sw"; // <-- IMPORTANT: Note the '/sw'
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Replace these with your own Firebase config object.
const firebaseConfig = {
  apiKey: process.env.FCM_CONFIG_API_KEY,
  authDomain: process.env.FCM_CONFIG_AUTH_DOMAIN,
  projectId: process.env.FCM_CONFIG_PROJECT_ID,
  storageBucket: process.env.FCM_CONFIG_STORAGE_BUCKET,
  messagingSenderId: process.env.FCM_CONFIG_MESSAGING_SENDER_ID,
  appId: process.env.FCM_CONFIG_APP_ID,
  measurementId: process.env.FCM_CONFIG_MEASUREMENT_ID
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

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: "./logo.png",
    data: { url: link },
    requireInteraction: true,
  };
  // self.registration.showNotification(notificationTitle, notificationOptions);
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