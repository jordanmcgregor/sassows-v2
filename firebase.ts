// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCOwd_xZvGDFNEielVfFyJXW8iOIGyVZ_E",
//   authDomain: "sassows-9bfed.firebaseapp.com",
//   projectId: "sassows-9bfed",
//   storageBucket: "sassows-9bfed.firebasestorage.app",
//   messagingSenderId: "749062938352",
//   appId: "1:749062938352:web:bf34d415cf029c0056ec35",
//   measurementId: "G-ZDYR2WWKY3"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCOwd_xZvGDFNEielVfFyJXW8iOIGyVZ_E",
    authDomain: "sassows-9bfed.firebaseapp.com",
    projectId: "sassows-9bfed",
    storageBucket: "sassows-9bfed.firebasestorage.app",
    messagingSenderId: "749062938352",
    appId: "1:749062938352:web:bf34d415cf029c0056635",
    measurementId: "G-ZDYR2WWKY3",
}


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
    const supported = await isSupported();
    return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
    try {
        const fcmMessaging = await messaging();
        if (fcmMessaging) {
            const token = await getToken(fcmMessaging, {
                vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
            });
            return token;
        }
        return null;
    } catch (err) {
        console.error("An error occurred while fetching the token:", err);
        return null;
    }
};

export { app, messaging };