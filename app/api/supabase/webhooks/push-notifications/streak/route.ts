import admin from "firebase-admin";
import { Message, MulticastMessage } from "firebase-admin/messaging";
import { NextRequest, NextResponse } from "next/server";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    const serviceAccount = JSON.parse(process.env.FCM_GOOGLE_CREDENTIALS!);
    //   const serviceAccount = require("@/service_key.json");
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

export async function POST(request: NextRequest) {
    // const { token, title, message, link } = await request.json();
    const base = await request.json();


    // const payload: Message = {
    //     token: base.token,
    //     notification: {
    //         title: "Yo",
    //         body: "Hey",
    //     },
    //     // webpush: link && {
    //     //     fcmOptions: {
    //     //         link,
    //     //     },
    //     // },
    // };

    // const message = {
    //     data: {
    //         title: "Yo",
    //         body: "hey"
    //     },
    //     tokens: [base.token, "d3Gziidv0hutCkNJJlBqJB:APA91bGW_czD8yAV3WJPizWevFbaumhNq7yb-_kTkDwdzzcIlb7lLjxKYR0Fkwty8fdzFOfzw8RljnyYhtX8N_s9yiGyhZuoM4IpcsX-3YD4STM5G0EDPSY"]
    // }
    // console.log(message)

    const message: MulticastMessage = {
        data: {
            title: "Default Title",
            body: "Default Body",
            link: "", // Optional link
            icon: "./logo.png", // Optional custom icon
            timestamp: new Date().toISOString(), // Optional timestamp
        },
        tokens: [base.token, "d3Gziidv0hutCkNJJlBqJB:APA91bGW_czD8yAV3WJPizWevFbaumhNq7yb-_kTkDwdzzcIlb7lLjxKYR0Fkwty8fdzFOfzw8RljnyYhtX8N_s9yiGyhZuoM4IpcsX-3YD4STM5G0EDPSY"], // Array of FCM tokens
        // Optional: Add platform-specific options
        webpush: {
            headers: {
                Urgency: 'high',
            },
            notification: {
                requireInteraction: true, // Keeps notification visible until user interacts
            }
        }
    };

    console.log(message)

    try {
        // await admin.messaging().send(payload);
        await admin.messaging().sendEachForMulticast(message)

        return NextResponse.json({ success: true, message: "Notification sent!" });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, error });
    }
}