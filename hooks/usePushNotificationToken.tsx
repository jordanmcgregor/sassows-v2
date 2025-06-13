'use client';

import { useEffect, useRef, useState } from "react";
import { getToken, onMessage, Unsubscribe } from "firebase/messaging";
import { fetchToken, messaging } from "@/firebase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient } from '@/utils/supabase/client';
import { useUser } from "@/context/selected-child";

async function getNotificationPermissionAndFCMToken() {
    // Step 1: Check if Notifications are supported in the browser.
    if (!("Notification" in window)) {
        console.info("This browser does not support desktop notification");
        return null;
    }

    // Step 2: Check if permission is already granted.
    if (Notification.permission === "granted") {
        alert("20")
        return await fetchToken(); // Fetch the token
    }

    // Step 3: If permission is not denied, request permission from the user.
    if (Notification.permission !== "denied") {
        alert("26")
        const permission = await Notification.requestPermission();
        alert("28")
        if (permission === "granted") {
            return await fetchToken(); // Fetch the token
        }
    }

    alert("Notification permission not granted.");
    return null;
}

const useFcmToken = () => {
    const router = useRouter();
    const [notificationPermissionStatus, setNotificationPermissionStatus] =
        useState<NotificationPermission | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const retryLoadToken = useRef(0);
    const isLoading = useRef(false);
    const supabase = createClient();


    const loadToken = async () => {
        if (isLoading.current) return;

        isLoading.current = true;
        const fetchedToken = await getNotificationPermissionAndFCMToken();

        if (Notification.permission === "denied") {
            setNotificationPermissionStatus("denied");
            setToken(null);
        } else if (fetchedToken) {
            setNotificationPermissionStatus("granted");
            setToken(fetchedToken);
            // Store the token in Supabase
            const { data, error } = await supabase.auth.getUser()
            if (data?.user) {
                const { error } = await supabase
                    .from('users') // Replace with your table name
                    .update({ fcm_token: fetchedToken }) // Replace 'your_user_id'
                    .eq('user_id', data.user.id)
                return fetchedToken
            }
            if (error) {
                console.error('Error storing FCM token:', error.message);
            }
        } else {
            setNotificationPermissionStatus(Notification.permission as NotificationPermission);
            setToken(null);
        }

        isLoading.current = false;
    };

    // Removed useEffect to automatically call loadToken on mount

    // You might still want to set up onMessage here to handle foreground messages
    //   useEffect(() => {
    //     if (messaging) {
    //       const unsubscribe = onMessage(messaging, (payload) => {
    //         console.log('Message received. ', payload);
    //         toast(payload.notification?.title || 'New Notification', {
    //           description: payload.notification?.body || 'You have a new message.',
    //         });
    //       });

    //       return () => unsubscribe(); // Cleanup the subscription on unmount
    //     }
    //   }, [messaging]); // Add messaging to dependency array

    return { notificationPermissionStatus, token, loadToken }; // Return loadToken
};

export default useFcmToken;
