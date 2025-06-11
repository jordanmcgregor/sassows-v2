import admin from "firebase-admin";
import { MulticastMessage } from "firebase-admin/messaging";
import { NextRequest, NextResponse } from "next/server";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    const serviceAccount = JSON.parse(process.env.GOOGLE_CREDENTIALS!);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json();
        console.log(token)
        // const tokens = [token,"d3Gziidv0hutCkNJJlBqJB:APA91bGW_czD8yAV3WJPizWevFbaumhNq7yb-_kTkDwdzzcIlb7lLjxKYR0Fkwty8fdzFOfzw8RljnyYhtX8N_s9yiGyhZuoM4IpcsX-3YD4STM5G0EDPSY"]
        const tokens = [token,"cCOqIQDEqfWqiWlRmkkuIG:APA91bHXREz2k3eqwGEGlwsXl76UfeKf22oYTq7ldKJbrgVIc1yeDOFj9ANCFFiUdEc2ZcxhSMHWmzoo4y60Bn0Ninx-fCAwOd44RtXqIRRzoij28bABBsw"]


        // Validate required fields
        // if (!tokens || !Array.isArray(tokens) || tokens.length === 0) {

        //     return NextResponse.json({
        //         success: false,
        //         error: "Tokens array is required and must not be empty"
        //     });
        // }

        // Create message WITH notification property for automatic display
        const message: MulticastMessage = {
            notification: {
                title: "Default Title",
                body: "Default Body",
            },
            // Optional data for custom handling
            data: {
                link: "",
                timestamp: new Date().toISOString(),
                // Any other custom data you want to pass
            },
            tokens: tokens,
            // Web-specific options
            webpush: {
                // This handles the click action for web notifications
                fcmOptions: {
                    link: "/" // Where to navigate when notification is clicked
                },
                notification: {
                    icon: "./logo.png",
                    badge: "./logo.png",
                    requireInteraction: false, // Auto-hide after a few seconds
                    tag: "notification-" + Date.now(), // Prevent grouping
                    // You can add more web notification options here
                    actions: undefined,
                    // actions: link ? [
                    //     {
                    //         action: "open",
                    //         title: "Open",
                    //     }
                    // ] : undefined
                },
                headers: {
                    Urgency: 'high',
                }
            }
        };

        console.log("Sending FCM message:", message);

        const response = await admin.messaging().sendEachForMulticast(message);

        console.log("FCM Response:", {
            successCount: response.successCount,
            failureCount: response.failureCount
        });

        // Handle partial failures
        if (response.failureCount > 0) {
            const failedTokens: string[] = [];
            response.responses.forEach((resp, idx) => {
                if (!resp.success) {
                    failedTokens.push(tokens[idx]);
                    console.error(`Failed to send to token ${tokens[idx]}:`, resp.error);
                }
            });

            return NextResponse.json({
                success: true,
                message: `Sent to ${response.successCount}/${tokens.length} devices`,
                successCount: response.successCount,
                failureCount: response.failureCount,
                failedTokens: failedTokens
            });
        }

        return NextResponse.json({
            success: true,
            message: `Notification sent to all ${response.successCount} devices!`,
            successCount: response.successCount
        });

    } catch (error) {
        console.error("FCM Send Error:", error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Unknown error occurred"
        });
    }
}