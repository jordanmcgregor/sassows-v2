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
        const randomReminder = streakReminders[Math.floor(Math.random() * streakReminders.length)];

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


const streakReminders = [
    { title: "Uh-oh! Your streak’s in danger 😱", body: "One journal away from losing it. Don’t break the chain!" },
    { title: "Streak shield? You wish.", body: "Time’s ticking. Open the app and save your streak!" },
    { title: "Your streak is crying 🥺", body: "Only you can stop the tears. Write something sweet!" },
    { title: "A streak is a terrible thing to waste", body: "One journal today keeps regret away." },
    { title: "We're on thin ice ❄️", body: "Log your moment before the streak cracks!" },
    { title: "Your streak believed in you", body: "Don’t let it down now. One entry and we’re good!" },
    { title: "Streak status: gasping for air 😮‍💨", body: "CPR = one cute journal entry. You got this." },
    { title: "Save your streak, save your legacy", body: "Future You will thank you. Probably." },
    { title: "Breaking up with your streak?", body: "Don’t do it. You’re better together." },
    { title: "Just one more for greatness 💪", body: "Your streak is one tap away from living!" },
    { title: "3... 2... 1... Streak gone!", body: "Unless you stop the clock with a journal NOW." },
    { title: "You’re so close to a streak badge 🏅", body: "One journal away. Don’t miss it!" },
    { title: "Don’t stop your streak now 🔥", body: "This is how legends are made. Log that moment." },
    { title: "The streak gods are watching 👀", body: "Give them a reason to smile today." },
    { title: "Your streak made you cookies", body: "🍪 Don’t ghost it now. Write something sweet." },
    { title: "Your streak sent a hug", body: "But it needs one back—log that memory!" },
    { title: "Your streak is pacing", body: "Nervously. Please calm it down with an entry." },
    { title: "Baby streak needs nurturing 🍼", body: "Don’t abandon it in its hour of need." },
    { title: "Help! I'm just a streak, standing in front of a user...", body: "Asking you to open the app." },
    { title: "Oh so you're done journaling now?", body: "That’s bold. Streak says otherwise." },
    { title: "You really gonna ghost your streak?", body: "It deserves better." },
    { title: "Streak sent a “?”", body: "It’s confused. So are we. Open the app!" },
    { title: "We were rooting for you!", body: "Don’t Tyra Banks this. Save your streak." },
    { title: "👀 Still time to do the right thing", body: "One tap. Streak saved. Let’s go." },
    { title: "Emergency streak alert 🚨", body: "One journal entry could save everything!" },
    { title: "Is this the end? 😢", body: "Your streak needs a hero. Is it you?" },
    { title: "Your streak needs you", body: "Like, *right now*. One journal saves the day!" },
    { title: "You forgot something...", body: "Yep. Your streak. Fix it before bedtime!" },
    { title: "Streak check!", body: "Still breathing... barely. One journal = life support." },
    { title: "Tiny effort, big reward!", body: "Log one little moment and keep the streak going!" },
    { title: "Big XP energy 🔋", body: "Don't waste it. Your streak awaits!" },
    { title: "You’re so close 🫣", body: "So close to streak greatness. Just one journal left!" },
    { title: "Tick tock... ⏳", body: "That’s the sound of your streak fading away." },
    { title: "A journal a day keeps guilt away", body: "Tap in. Save your streak. Feel good." },
    { title: "It’s streak o’clock ⏰", body: "Only one thing on the agenda: journaling!" },
    { title: "Remember your why 💡", body: "Your streak sure does. Write for it!" },
    { title: "Can’t stop, won’t stop 💥", body: "Unless you... don’t journal. So don’t not journal!" },
    { title: "Not like this 😭", body: "We’re watching your streak slip away. Stop it!" },
    { title: "Don’t ghost your streak 👻", body: "Tiny action. Huge payoff. You know what to do." },
    { title: "Don't leave your streak on read", body: "It sent you 3 heart emojis and a tear." },
    { title: "Journal gods are watching 👁️", body: "They'll be sad if you break your streak." },
    { title: "Still time to be a hero 🦸", body: "Rescue your streak with one journal!" },
    { title: "You were doing so well 😩", body: "Let’s not ruin a shiny streak. Keep going!" },
    { title: "Let’s keep the fire alive 🔥", body: "Your streak is your spark. Don’t snuff it out." },
    { title: "SOS from your streak!", body: "Come back! It’s lonely in here!" },
    { title: "Don't streak and ditch!", body: "Show up for the streak that loves you." },
    { title: "One tap from glory ✨", body: "Your XP and your streak are waiting." },
    { title: "Show up for your streak 🫡", body: "You made a promise. Time to honor it." },
    { title: "It's not over yet!", body: "Clock’s ticking, but you’ve got time to save your streak." },
    { title: "Your streak baked a cake 🎂", body: "It’s your streakiversary. Show up for it!" },
    { title: "Don't let your streak ghost you 👻", body: "It’ll vanish if you don’t write soon." },
    { title: "Streak: hanging by a thread 🪡", body: "Snip or save? You decide." },
    { title: "You’re a streak machine 💪", body: "Don’t break now. Keep journaling!" },
    { title: "Oops! Almost missed it!", body: "Let’s not ruin a perfectly good streak." },
    { title: "Be the hero of your timeline 🕒", body: "Save your streak from extinction!" },
    { title: "A wild streak appears!", body: "Catch it with a journal entry!" },
    { title: "Your streak vs. The clock", body: "Only one can win. Hint: it’s your streak if you journal." },
    { title: "Trust the process 🔁", body: "Open. Journal. Save streak. Repeat." },
    { title: "Make today count!", body: "Your streak’s fate is in your hands." },
    { title: "Don’t let a perfect streak go bad", body: "You’ve worked too hard to miss this." },
    { title: "Say yes to your streak", body: "It’s asking nicely. Just one journal!" },
    { title: "You've come too far", body: "Don't stop now. One tap and your streak lives on." },
    { title: "Red alert 🚨", body: "Your streak is at DEFCON 1. Log now!" },
    { title: "Small action, big legacy 📝", body: "Tiny entry. Lasting impact. Save your streak!" },
    { title: "Can we count on you?", body: "The streak's looking at you with puppy eyes 🐶." },
    { title: "Don't start from zero 😭", body: "You're *this* close to greatness!" },
    { title: "Dramatic pause…", body: "For you to open the app and save your streak." },
    { title: "The streak wants to hang out", body: "Don't leave it hanging!" },
    { title: "One last chance...", body: "To save your streak and be the journal hero you were meant to be." }
];
