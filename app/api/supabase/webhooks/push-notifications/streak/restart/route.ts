import admin from "firebase-admin";
import { MulticastMessage } from "firebase-admin/messaging";
import { NextRequest, NextResponse } from "next/server";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    const serviceAccount = JSON.parse(process.env.FCM_GOOGLE_CREDENTIALS!);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

export async function POST(request: NextRequest) {
    try {
        const { tokens } = await request.json();
        console.log(tokens)
        // const tokensa = [tokens, "cCOqIQDEqfWqiWlRmkkuIG:APA91bHgkvcR3Vk8skAo3pW-vDh-ZYsfWstHjgckSHYHQ1HyGqFVjjmJYs5Js15Wzkf8d_TjLbQBkQHGsTqAjhpDZAFF0rogc88hAx-yGl5PwYREUjEF_0E"]
        const randomReminder = streakRebuildReminders[Math.floor(Math.random() * streakRebuildReminders.length)];

        // Create message WITH notification property for automatic display
        const message: MulticastMessage = {
            notification: {
                title: randomReminder.title,
                body: randomReminder.body,
            },
            // Optional data for custom handling
            data: {
                link: "",
                timestamp: new Date().toISOString(),
                title: "Yeah",
                body: "yeet"
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


const streakRebuildReminders = [
  { title: "Oof. The streak is gone 😢", body: "But hey—today’s a great day to start fresh!" },
  { title: "RIP streak... 👼", body: "Resurrect it with one sweet entry today!" },
  { title: "Fell off the journaling wagon?", body: "Hop back on. It’s still warm." },
  { title: "Wipe those tears 😭", body: "New streak, who dis? Start again today!" },
  { title: "Streak reset = fresh start 🔁", body: "Rebuild time. You’ve got this!" },
  { title: "Broken streak? No biggie.", body: "Legends restart stronger. Let’s go!" },
  { title: "Okay… we slipped 😬", body: "Now let’s bounce back. Entry time!" },
  { title: "Clean slate vibes ✨", body: "Start a new streak today—no regrets!" },
  { title: "Your streak got a haircut 💇", body: "Short. But growing again soon!" },
  { title: "Day 1 never looked so good 😎", body: "Let’s start building again!" },
  { title: "New streak, same awesome you", body: "Show up today. That’s all that matters!" },
  { title: "Yesterday’s streak is history", body: "Let’s write a better one today." },
  { title: "Down? Yes. Out? Never. 🥊", body: "Let’s journal and rebuild!" },
  { title: "Like a phoenix 🔥", body: "Rise from the ashes with today’s entry!" },
  { title: "Hey, nobody’s perfect 🙃", body: "But new streaks? Totally achievable." },
  { title: "Zero is just the new one 💫", body: "Start your comeback now!" },
  { title: "Forget the fall", body: "Celebrate the rise. New streak starts today!" },
  { title: "Oops! We blinked!", body: "Let’s not miss another one. Journal now." },
  { title: "You’ve reset the clock 🕰️", body: "Let’s start a beautiful new streak!" },
  { title: "Bounced? Bounce back! 🏀", body: "You know the drill. Tap and go." },
  { title: "We’re back to square one 🔢", body: "But hey, square one has cookies 🍪" },
  { title: "Fresh streak smell 🤌", body: "Breathe it in. Log an entry to begin." },
  { title: "Okay, we’re rebuilding 🧱", body: "One entry at a time. Let’s go!" },
  { title: "This is your redemption arc 🎬", body: "Chapter one: journal entry." },
  { title: "The streak crumbled…", body: "Time to build a stronger one!" },
  { title: "No streak? No problem.", body: "Everyone loves a comeback!" },
  { title: "All streaks fall someday", body: "Heroes rise. Start again today." },
  { title: "Let’s turn that 0 into a 1 🔢", body: "Just write something. Anything!" },
  { title: "Your streak’s in a better place ☁️", body: "Let’s make a new one together." },
  { title: "The streak is dead. Long live the streak!", body: "Start your new reign today." },
  { title: "Today = Day One 🚀", body: "What will you log to kick it off?" },
  { title: "The streak is gone… for now", body: "Ready to build a new one?" },
  { title: "Time to rise again 🌅", body: "Start your next streak with one memory." },
  { title: "New streak, new story 📖", body: "What’s page 1 going to say?" },
  { title: "Even champions restart", body: "Let’s write the comeback!" },
  { title: "Begin again. Better this time 🌱", body: "One journal to restart your momentum." },
  { title: "Goodbye guilt 👋", body: "Hello fresh start!" },
  { title: "Reset = Opportunity 💡", body: "Let’s grow your streak anew." },
  { title: "Rebuild mode: activated 🛠️", body: "It starts with today’s journal!" },
  { title: "The streak slipped", body: "But you? Still solid. Let’s go again!" },
  { title: "Streak 2.0 incoming 📈", body: "Open the app and get it going!" },
  { title: "We’ve reset the streak counter", body: "Time to stack those days again!" },
  { title: "Don’t mourn the old streak", body: "Celebrate a new beginning!" },
  { title: "Zero XP? Zero problem", body: "It only goes up from here!" },
  { title: "Tiny step. Big comeback 🚶", body: "Start your rebuild with one entry." },
  { title: "Day One energy 🔥", body: "Let’s bring it!" },
  { title: "The streak is gone but not forgotten", body: "Let’s make a new one worth remembering." },
  { title: "Hey streak, we meet again", body: "This time, let’s go even longer." },
  { title: "Revenge of the streak 🧟", body: "It’s coming back. You in?" },
  { title: "Even the best stumble", body: "But they don’t stay down long!" },
  { title: "Streak who?", body: "New day. New streak. Let’s go!" }
];

