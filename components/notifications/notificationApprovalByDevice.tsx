'use client'
import { Button } from '@/components/ui/button'
import { IconArrowUp } from '@tabler/icons-react'
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation'
import useFcmToken from '@/hooks/usePushNotificationToken'

import Overlay from '@/components/submitting/overlay'
import { useEffect, useRef, useState } from "react";
import { getToken, onMessage, Unsubscribe } from "firebase/messaging";
import { fetchToken, messaging } from "@/firebase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient } from '@/utils/supabase/client';
import { useUser } from "@/context/selected-child";

async function getNotificationPermissionAndToken() {
    // Step 1: Check if Notifications are supported in the browser.
    if (!("Notification" in window)) {
        console.info("This browser does not support desktop notification");
        return null;
    }

    // Step 2: Check if permission is already granted.
    if (Notification.permission === "granted") {
        return await fetchToken();
    }

    // Step 3: If permission is not denied, request permission from the user.
    if (Notification.permission !== "denied") {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            return await fetchToken();
        }
    }

    console.log("Notification permission not granted.");
    return null;
}


export default function NotificationApprovalByDevice({ os, browser }: { os: any, browser: any }) {
    // const { notificationPermissionStatus, token, loadToken } = useFcmToken()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [notificationPermissionStatus, setNotificationPermissionStatus] = useState<NotificationPermission | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const retryLoadToken = useRef(0);
    const isLoading = useRef(false);
    const supabase = createClient();
    const router = useRouter();

    const loadToken = async () => {
        // Step 4: Prevent multiple fetches if already fetched or in progress.
        if (isLoading.current) return;

        isLoading.current = true; // Mark loading as in progress.
        setIsSubmitting(true)
        const token = await getNotificationPermissionAndToken(); // Fetch the token.

        // Step 5: Handle the case where permission is denied.
        if (Notification.permission === "denied") {
            setNotificationPermissionStatus("denied");
            console.info(
                "%cPush Notifications issue - permission denied",
                "color: green; background: #c7c7c7; padding: 8px; font-size: 20px"
            );
            isLoading.current = false;
            return;
        }

        // Step 6: Retry fetching the token if necessary. (up to 3 times)
        // This step is typical initially as the service worker may not be ready/installed yet.
        if (!token) {
            if (retryLoadToken.current >= 3) {
                alert("Unable to load token, refresh the browser");
                console.info(
                    "%cPush Notifications issue - unable to load token after 3 retries",
                    "color: green; background: #c7c7c7; padding: 8px; font-size: 20px"
                );
                isLoading.current = false;
                return;
            }

            retryLoadToken.current += 1;
            console.error("An error occurred while retrieving token. Retrying...");
            isLoading.current = false;
            await loadToken();
            return;
        }

        // Step 7: Set the fetched token and mark as fetched.
        setNotificationPermissionStatus(Notification.permission);
        setToken(token);
        // ---------------------------------------------------------------------
        // --------------------- Add The Token To Supabase ---------------------
        // ---------------------------------------------------------------------
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            const { data: tokenData, error: tokenError } = await supabase
                .from('users')
                .update({ fcm_token: token })  // You must include user id to update existing user
                .eq('user_id', user.id)
                .select();
            if (tokenError) {
                // handle error
                console.error('Error updating token:', tokenError);
            }
        }
        isLoading.current = false;
    };

    // useEffect(() => {
    //     // Step 8: Initialize token loading when the component mounts.
    //     if ("Notification" in window) {
    //         loadToken();
    //     }
    // }, []);

    useEffect(() => {
        const setupListener = async () => {
            if (!token) return; // Exit if no token is available.

            console.log(`onMessage registered with token ${token}`);
            const m = await messaging();
            if (!m) return;

            // Step 9: Register a listener for incoming FCM messages.
            const unsubscribe = onMessage(m, (payload) => {
                if (Notification.permission !== "granted") return;

                console.log("Foreground push notification received:", payload);
                const link = payload.fcmOptions?.link || payload.data?.link;

                if (link) {
                    toast.info(
                        `${payload.notification?.title}: ${payload.notification?.body}`,
                        {
                            action: {
                                label: "Visit",
                                onClick: () => {
                                    const link = payload.fcmOptions?.link || payload.data?.link;
                                    if (link) {
                                        router.push(link);
                                    }
                                },
                            },
                        }
                    );
                } else {
                    toast.info(
                        `${payload.notification?.title}: ${payload.notification?.body}`
                    );
                }

                // --------------------------------------------
                // Disable this if you only want toast notifications.
                const n = new Notification(
                    payload.notification?.title || "New message",
                    {
                        body: payload.notification?.body || "This is a new message",
                        data: link ? { url: link } : undefined,
                    }
                );

                // Step 10: Handle notification click event to navigate to a link if present.
                n.onclick = (event) => {
                    event.preventDefault();
                    const link = (event.target as any)?.data?.url;
                    if (link) {
                        router.push(link);
                    } else {
                        console.log("No link found in the notification payload");
                    }
                };
                // --------------------------------------------
            });

            return unsubscribe;
        };

        let unsubscribe: Unsubscribe | null = null;

        setupListener().then((unsub) => {
            if (unsub) {
                unsubscribe = unsub;
            }
        });

        // Step 11: Cleanup the listener when the component unmounts.
        return () => unsubscribe?.();
    }, [token, router, toast]);
    return (
        // <div className="bg-[url('/notificationpositioning.png')] bg-cover bg-center">
        <>
            <div className={isSubmitting ? '' : 'hidden'}>
                <Overlay />
            </div>
            <div className="w-full h-dvh min-h-2.5 flex flex-col justify-between items-between relative p-12">
                <div className="flex-1"> {/* Adjust positioning as needed */}
                    <TypeAnimation
                        sequence={[
                            "The sweetest moments often slip by unnoticed. I’ll gently remind you to catch them before they’re gone.",
                            // ... (rest of your sequence)
                        ]}
                        wrapper="span"
                        speed={50}
                        style={{ display: 'inline-block' }} // Added display: inline-block for proper sizing
                        repeat={0}
                    />
                </div>
                {os == 'iOS' ? <Apple loadToken={loadToken} /> : null}
                {os == 'Android' ? <Android loadToken={loadToken} /> : null}
                {/* <Android loadToken={loadToken} /> */}
                <div className="flex-1 flex items-end">
                    <Button onClick={loadToken} variant={"default"} className="w-full h-12">
                        Help me remember the magic
                    </Button>
                </div>
            </div >
        </>
        // </div >

    )
}

function Apple({ loadToken }: { loadToken: () => void }) {
    return (
        <div className="flex-1 flex items-center absolute top-48/100 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[69vw]">
            <button onClick={loadToken}>
                <div className="relative">
                    <Image width={500} height={500} className="" alt="" src="/notificationrequestgrayscale.png"></Image>
                    <IconArrowUp className="absolute left-[75%] -translate-x-1/2 bounce-down text-blue-400 size-8" />
                </div>
            </button>
        </div>
    )
}

function Android({ loadToken }: { loadToken: () => void }) {
    return (
        <div className="flex-1 flex items-center absolute top-50/100 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw]">
            <button onClick={loadToken}>
                <div className="relative">
                    <Image width={500} height={500} className="" alt="" src="/notificationrequestandroid.png"></Image>
                    <IconArrowUp className="absolute left-[85%] -translate-x-1/2 bounce-down text-[#2E4B82] size-8" />
                </div>
            </button>
        </div>
    )
}