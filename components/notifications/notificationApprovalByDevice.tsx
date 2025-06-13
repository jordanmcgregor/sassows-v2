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

async function getNotificationPermissionAndFCMToken() {
    // Step 1: Check if Notifications are supported in the browser.
    if (!("Notification" in window)) {
        console.info("This browser does not support desktop notification");
        return null;
    }

    // Step 2: Check if permission is already granted.
    if (Notification.permission === "granted") {
        return await fetchToken(); // Fetch the token
    }

    // Step 3: If permission is not denied, request permission from the user.
    if (Notification.permission !== "denied") {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            return await fetchToken(); // Fetch the token
        }
    }
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
        if (isLoading.current) return;
        isLoading.current = true;
        setIsSubmitting(true)
        const fetchedToken = await getNotificationPermissionAndFCMToken();



        if (Notification.permission === "denied") {
            setNotificationPermissionStatus("denied");
            setToken(null);
        } else if (fetchedToken) {
            setNotificationPermissionStatus("granted");
            setToken(fetchedToken);
            // // Store the token in Supabase
            // const { data, error } = await supabase.auth.getUser()
            // if (data?.user) {
            //     const { error } = await supabase
            //         .from('users') // Replace with your table name
            //         .update({ fcm_token: fetchedToken }) // Replace 'your_user_id'
            //         .eq('user_id', data.user.id)
            //     return fetchedToken
            // }
            // if (error) {
            //     console.error('Error storing FCM token:', error.message);
            // }
        } else {
            setNotificationPermissionStatus(Notification.permission as NotificationPermission);
            setToken(null);
        }
    };

    const handleApproveNotifications = async () => {
        const token = await loadToken(); // This waits for the user's permission action
        // Check if the user granted permission
        const supabase = createClient();
        const { data: auth } = await supabase.auth.getUser();
        if (auth?.user) {
            await supabase
                .from('users')
                .update({ onboarded: true, fcm_token: token })
                .eq('user_id', auth.user.id);
        }
        router.push('/home');
        // if (Notification.permission === "granted" && token) {
        //     const supabase = createClient();
        //     const { data: auth } = await supabase.auth.getUser();

        //     if (auth?.user) {
        //         await supabase
        //             .from('users')
        //             .update({ onboarded: true })
        //             .eq('user_id', auth.user.id);
        //     }
        //     isLoading.current = false;
        //     router.push('/home');
        // } else {
        //     // Optionally show a message/toast if denied
        //     router.push('/home');
        //     console.warn("Notification permission not granted.");
        // }
    };

    // useEffect(() => {
    //     const markOnboardingComplete = async () => {
    //         if (notificationPermissionStatus) {
    //             const supabase = createClient();

    //             const { data: auth, error: authError } = await supabase.auth.getUser()
    //             if (auth && auth.user) {
    //                 const { error } = await supabase
    //                     .from('users') // Replace with your table name
    //                     .update({ onboarded: true }) // Replace 'your_user_id'
    //                     .eq('user_id', auth.user.id)
    //             }
    //             router.push('/home')
    //         }
    //     }
    //     markOnboardingComplete()
    // }, [notificationPermissionStatus])
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
                {os == 'iOS' ? <Apple loadToken={handleApproveNotifications} /> : null}
                {os == 'Android' ? <Android loadToken={handleApproveNotifications} /> : null}
                {/* <Android loadToken={loadToken} /> */}
                <div className="flex-1 flex items-end">
                    <Button onClick={handleApproveNotifications} variant={"default"} className="w-full h-12">
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