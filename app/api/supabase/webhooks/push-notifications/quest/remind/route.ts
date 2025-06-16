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
        const randomReminder = sassowsDailyQuestReminders[Math.floor(Math.random() * sassowsDailyQuestReminders.length)];

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


const sassowsDailyQuestReminders = [
  { title: "Almost bedtime 💤", body: "Your daily quest is still waiting. One memory, one tap!" },
  { title: "Today’s daily prompt is getting sleepy 😴", body: "Tuck it in with a quick journal entry." },
  { title: "Still time to finish your daily quest! ⏳", body: "That sweet moment deserves a spot in Sassows." },
  { title: "You're one daily quest away from feeling amazing 🎯", body: "Write now, thank yourself forever." },
  { title: "Tiny quest. Big impact. 🧸", body: "Complete today’s daily prompt before the day slips away." },
  { title: "That giggle? That look? 📸", body: "They belong in today’s daily quest. You’re so close!" },
  { title: "Don't let today’s memories disappear 💨", body: "Complete your daily prompt before it resets!" },
  { title: "You’ve got a Sassows quest to finish ✍️", body: "A few words now = a badge later 🏅" },
  { title: "Your daily quest is pouting 🥺", body: "Cheer it up with a little toddler memory." },
  { title: "That prompt isn’t gonna journal itself 😬", body: "Wrap up your daily quest before the clock does." },
  { title: "You’re building something beautiful 💖", body: "Today’s quest is one piece of the story." },
  { title: "Your daily prompt waved 👋", body: "Still time to turn that moment into magic." },
  { title: "Today’s daily quest is still doable 💪", body: "Quick entry = one step closer to your badge!" },
  { title: "Future You will love this memory 📖", body: "Finish your daily quest. Save the moment." },
  { title: "Last call for today's quest! 🕛", body: "Don’t let it slip away like that pacifier under the couch." },
  { title: "The badge is calling… 📣", body: "Complete today’s daily prompt and get one step closer!" },
  { title: "You’re almost there! 🫣", body: "Today’s quest is your moment to capture something special." },
  { title: "That quote from earlier? The funny one? 😂", body: "It’s perfect for your daily prompt." },
  { title: "Hey, memory maker 👋", body: "Don’t forget to log your daily quest today!" },
  { title: "One more quest closer to that monthly badge 🏅", body: "You’re building something precious." },
  { title: "The daily quest is your bedtime story 💤", body: "Write it before the day’s done." },
  { title: "So close to your badge, it’s unreal ✨", body: "Just need today’s prompt to keep the magic going." },
  { title: "Turn the chaos into a keepsake 🍼", body: "Your daily quest is waiting." },
  { title: "Tiny fingers, big feelings 💕", body: "Capture one in today’s daily prompt." },
  { title: "Journal your quest before your brain forgets 🧠", body: "It was adorable. You know it was." },
  { title: "The clock is whispering… 🕰️", body: "‘Hey, finish that daily quest.’" },
  { title: "You’re a daily quest hero in the making 🦸", body: "Today’s memory = tomorrow’s treasure." },
  { title: "Still time to snag that monthly badge! 🎉", body: "But only if you do today’s prompt!" },
  { title: "Cuteness doesn’t last forever 😭", body: "Today’s daily prompt can." },
  { title: "Daily quest deadline: now-ish ⌛", body: "You’ve got the moment—just write it down!" },
  { title: "Just one Sassows quest away from greatness 🌟", body: "Today’s memory is calling your name." },
  { title: "One moment = one memory saved ✍️", body: "Your daily quest is ready when you are." },
  { title: "Capture today before it becomes a blur 🌀", body: "Wrap up your daily prompt now!" },
  { title: "That baby babble? That sleepy snuggle? 🥹", body: "Perfect quest material. Don’t miss it." },
  { title: "You’re on a questing roll 🛼", body: "Don’t stop now—today’s is still open!" },
  { title: "You’re journaling your way to a badge 💫", body: "One prompt at a time. Start with today’s!" },
  { title: "Almost tomorrow! 😱", body: "You’ve still got time to finish your daily Sassows quest." },
  { title: "One quest, one cuddle, one memory 🐻", body: "Complete your daily prompt before it fades!" },
  { title: "The daily quest is your time machine ⏳", body: "Capture the little stuff while it's still little." },
  { title: "Sassows quest check-in! ✅", body: "Still time to journal something beautiful." },
  { title: "You’re 1 journal away from a parenting win 🙌", body: "Complete today’s Sassows quest!" },
  { title: "Don’t miss your shot at the badge 🥇", body: "One entry a day keeps regret away!" },
  { title: "Today’s quest = a gift to future you 🎁", body: "Write it down while it's fresh!" },
  { title: "Time to write your ‘remember when’ ❤️", body: "Today’s prompt is perfect for it." },
  { title: "Your Sassows prompt is lonely 😢", body: "Say hi with a memory—it’ll love you for it." },
  { title: "The badge is so close we can taste it 🍪", body: "Don’t miss today’s daily quest!" },
  { title: "Memory magic starts with the daily quest ✨", body: "Make today unforgettable." },
  { title: "Your Sassows quest is doing the baby bounce 🐣", body: "Catch it before it bounces off your radar!" },
  { title: "Don't snooze on the snuggles 😴", body: "Complete your daily quest and seal today in your heart." },
  { title: "Today only happens once 📅", body: "Answer your daily prompt while it’s still here." }
];
