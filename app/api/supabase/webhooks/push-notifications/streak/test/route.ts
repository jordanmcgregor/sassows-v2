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
        const tokens = [token,"cCOqIQDEqfWqiWlRmkkuIG:APA91bHgkvcR3Vk8skAo3pW-vDh-ZYsfWstHjgckSHYHQ1HyGqFVjjmJYs5Js15Wzkf8d_TjLbQBkQHGsTqAjhpDZAFF0rogc88hAx-yGl5PwYREUjEF_0E"]

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
                title:"Yeah",
                body:"yeet"
            },
            tokens: tokens,
            // Web-specific options for persistent notifications
            webpush: {
                fcmOptions: {
                    link: "/" // Where to navigate when notification is clicked
                },
                notification: {
                    icon: "./logo.png",
                    badge: "./logo.png",
                    // KEY CHANGES FOR PERSISTENCE:
                    requireInteraction: true, // Keeps notification visible until user interacts
                    persistent: true, // Explicit persistence flag
                    sticky: true, // Prevents auto-dismissal (browser dependent)
                    tag: "persistent-notification-" + Date.now(), // Unique tag to prevent replacement
                    
                    // Additional options that can help with persistence
                    silent: false, // Ensures notification is noticeable
                    renotify: true, // Re-alerts user if same tag is used
                    
                    // Vibration pattern for mobile PWAs (optional)
                    vibrate: [200, 100, 200],
                    
                    // Remove actions if not needed, as they can interfere
                    actions: undefined,
                },
                headers: {
                    Urgency: 'high',
                    TTL: '86400' // Time to live in seconds (24 hours)
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