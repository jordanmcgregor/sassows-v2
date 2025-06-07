'use client'
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState, useRef } from "react"
import { spring, animate, motion, useMotionValue, useTransform } from "motion/react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Fireworks } from 'fireworks-js'
import confetti from 'canvas-confetti'
import { FireIcon } from "@heroicons/react/20/solid"
import { TreasureChestAnimationFull } from "@/app/test/motion/page"
import BadgeAnimation from "@/components/guardian/home/gamification/badge-animation"
import AchievementAnimation from "../home/gamification/achievement-animation"

export default function Subscriptions() {
    const [open, setOpen] = useState(false)
    const [eventQueue, setEventQueue] = useState<any[]>([])
    const [currentEvent, setCurrentEvent] = useState<any>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const container = useRef<HTMLDivElement>(null)

    function handleClaimXP() {
        // Fire confetti
        const duration = 1 * 1000
        const end = Date.now() + duration

        function frame() {
            confetti({
                particleCount: 10,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            })
            confetti({
                particleCount: 10,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            })

            if (Date.now() < end) {
                requestAnimationFrame(frame)
            }
        }

        frame()

        // Close dialog and process next event
        setOpen(false)
        setCurrentEvent(null)
        setIsProcessing(false)
    }

    // Process next event in queue
    useEffect(() => {
        if (eventQueue.length > 0 && !isProcessing && !open) {
            setIsProcessing(true)
            const nextEvent = eventQueue[0]
            setEventQueue(prev => prev.slice(1))
            setCurrentEvent(nextEvent)
            setOpen(true)
        }
    }, [eventQueue, isProcessing, open])

    const supabase = createClient()

    // Your original working subscription - just modified to add to queue
    useEffect(() => {
        const channel = supabase.channel('streak')

        channel.on('postgres_changes', {
            event: 'UPDATE',
            schema: 'gamification',
            table: 'user_daily_streaks'
        }, (payload) => {
            console.log('Streak event received:', payload)
            const eventData = {
                type: 'streak',
                data: payload,
                timestamp: Date.now()
            }
            setEventQueue(prev => [...prev, eventData])
        })

        channel.subscribe()

        return () => {
            channel.unsubscribe()
        }
    }, [supabase])

    // Add other subscriptions one by one to test
    useEffect(() => {
        const channel = supabase.channel('quest')

        channel.on('postgres_changes', {
            event: 'INSERT',
            schema: 'gamification',
            table: 'user_daily_quests'
        }, (payload) => {
            console.log('Quest event received:', payload)
            const eventData = {
                type: 'quest',
                data: payload,
                timestamp: Date.now()
            }
            setEventQueue(prev => [...prev, eventData])
        })

        channel.subscribe()

        return () => {
            channel.unsubscribe()
        }
    }, [supabase])

    // Add other subscriptions one by one to test
    useEffect(() => {
        const channel = supabase.channel('badge')

        channel.on('postgres_changes', {
            event: 'INSERT',
            schema: 'gamification',
            table: 'user_monthly_badges'
        }, (payload) => {
            console.log('Quest event received:', payload)
            const eventData = {
                type: 'badge',
                data: payload,
                timestamp: Date.now()
            }
            setEventQueue(prev => [...prev, eventData])
        })

        channel.subscribe()

        return () => {
            channel.unsubscribe()
        }
    }, [supabase])

    // Add other subscriptions one by one to test
    useEffect(() => {
        const channel = supabase.channel('achievement')

        channel.on('postgres_changes', {
            event: 'INSERT',
            schema: 'gamification',
            table: 'user_achievements'
        }, (payload) => {
            console.log('Quest event received:', payload)
            const eventData = {
                type: 'achievement',
                data: payload,
                timestamp: Date.now()
            }
            setEventQueue(prev => [...prev, eventData])
        })

        channel.subscribe()

        return () => {
            channel.unsubscribe()
        }
    }, [supabase])

    useEffect(() => {
        if (!open || !currentEvent) return

        const duration = 1 * 1000
        const end = Date.now() + duration

        function frame() {
            confetti({
                particleCount: 10,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
            })
            confetti({
                particleCount: 10,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
            })

            if (Date.now() < end) {
                requestAnimationFrame(frame)
            }
        }

        const timeout = setTimeout(() => {
            frame()
        }, 200)

        return () => clearTimeout(timeout)
    }, [open, currentEvent])

    // Render content based on event type
    const renderEventContent = () => {
        if (!currentEvent) return null

        switch (currentEvent.type) {
            case 'streak':
                return (
                    <>
                        <AlertDialogTitle>
                            {currentEvent.data.old.current_streak === 0
                                ? "You just started a new streak! Let the momentum begin!"
                                : `You're on a roll! That's ${currentEvent.data.new.current_streak} days in a row!`}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-center">
                            <StreakAnimation streakData={currentEvent.data} />
                        </AlertDialogDescription>
                    </>
                )

            case 'quest':
                return (
                    <>
                        <AlertDialogTitle>
                            Daily Quest Completed!
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-center">
                            <TreasureChestAnimationFull />
                            {/* <div className="text-4xl font-bold text-green-400">
                                ✅ Daily Quest Complete! ✅
                            </div> */}
                        </AlertDialogDescription>
                    </>
                )

            case 'achievement':
                return (
                    <>
                        <AlertDialogTitle>
                            Achievement Unlocked!
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-center">
                            <AchievementAnimation icon={currentEvent.data.new.icon} />
                            <span className="flex flex-col justify-center items-center">
                                <span className="text-2xl text-gray-900">{currentEvent.data.new.name}</span>
                                <span>{currentEvent.data.new.description}</span>
                            </span>
                        </AlertDialogDescription>
                    </>
                )
            case 'badge':
                return (
                    <>
                        <AlertDialogTitle>
                            Badge Unlocked!
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-center">
                            {/* <div className="text-4xl font-bold text-yellow-400">
                                🏆 New Badge! 🏆
                            </div> */}
                            <BadgeAnimation />
                        </AlertDialogDescription>
                    </>
                )

            default:
                return null
        }
    }

    if (currentEvent) {
        return (
            <>
                <div className="w-full h-full absolute pointer-events-none" ref={container}></div>
                <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            {renderEventContent()}
                        </AlertDialogHeader>
                        <AlertDialogFooter className="mt-2">
                            {eventQueue.length > 0 && (
                                <span className="text-sm text-gray-500 mr-auto">
                                    {/* {eventQueue.length} more notification{eventQueue.length !== 1 ? 's' : ''} waiting */}
                                    {/* We're not done celebrating yet — {eventQueue.length} surprise{eventQueue.length !== 1 ? 's' : ''} still waiting! */}

                                </span>
                            )}
                            <AlertDialogAction asChild>
                                <button onClick={handleClaimXP}>
                                    {eventQueue.length > 0 ? 'Claim XP' : 'Claim XP'}
                                </button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </>
        )
    }

    return null
}

function StreakAnimation({ streakData }: { streakData: any }) {
    const count = useMotionValue(0)
    const rounded = useTransform(() => Math.round(count.get()))

    const [startTransition, setStartTransition] = useState(false)
    const [numberDone, setNumberDone] = useState(false)

    useEffect(() => {
        if (!startTransition) return

        const controls = animate(count, streakData.new.current_streak, {
            duration: 2,
            onComplete: () => setNumberDone(true),
        })

        return () => controls.stop()
    }, [startTransition])

    return (
        <div className="flex items-center justify-center gap-2">
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 1,
                    scale: { type: "spring", duration: 1, bounce: 1 },
                }}
                onAnimationComplete={() => {
                    setStartTransition(true)
                }}
            >
                <motion.div
                    animate={{
                        color: startTransition ? "#f97316" : "#9ca3af",
                        opacity: startTransition ? 1 : 0.5,
                    }}
                    transition={{ duration: 1 }}
                >
                    <FireIcon className="size-16 drop-shadow-lg" />
                </motion.div>
            </motion.div>

            {startTransition && (
                <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.1 }}
                    className="text-5xl font-bold text-orange-400"
                >
                    {rounded}
                </motion.span>
            )}
        </div>
    )
}

function QuestAnimation() {
    const [state, setState] = useState(false)
    useEffect(() => {

    }, [])

    return (
        <div className="example-container">
            <div className="box" data-state={state} />
            {/* <button onClick={() => setState(!state)}>Toggle position</button> */}

            <style>
                {`
                    .example-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        gap: 20px;
                    }

                    .example-container .box {
                        width: 100px;
                        height: 100px;
                        background-color: #8df0cc;
                        border-radius: 10px;
                        transition: transform ${spring(0.5, 0.8)};
                        transform: translateX(-100%);
                    }

                    .example-container .box[data-state="true"] {
                        transform: translateX(100%) rotate(180deg);
                    }

                    .example-container button {
                        background-color: #8df0cc;
                        color: #0f1115;
                        border-radius: 5px;
                        padding: 10px;
                        margin: 10px;
                    }
                `}
            </style>
        </div>
    )
}


// import { createClient } from "@/utils/supabase/client"
// import { useEffect, useState, useRef } from "react"
// import { animate, motion, useMotionValue, useTransform } from "motion/react"
// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
//     AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"
// import { Fireworks } from 'fireworks-js'
// import confetti from 'canvas-confetti'
// import { FireIcon } from "@heroicons/react/20/solid"

// export default function Subscriptions() {
//     const [open, setOpen] = useState(true)
//     const [streakData, setStreakData] = useState<any>()
//     const container = useRef<HTMLDivElement>(null)

//     function handleClaimXP() {
//         // Fire confetti
//         const duration = 1 * 1000
//         const end = Date.now() + duration

//         function frame() {
//             confetti({
//                 particleCount: 10,
//                 angle: 60,
//                 spread: 55,
//                 origin: { x: 0 }
//             })
//             confetti({
//                 particleCount: 10,
//                 angle: 120,
//                 spread: 55,
//                 origin: { x: 1 }
//             })

//             if (Date.now() < end) {
//                 requestAnimationFrame(frame)
//             }
//         }

//         frame()

//         // Then close the dialog
//         setOpen(false)
//     }


//     const supabase = createClient()

//     useEffect(() => {
//         supabase.channel('gamification').on('postgres_changes', {
//             event: 'UPDATE',
//             schema: 'gamification',
//             table: 'daily_streaks'
//         },
//             (payload) => {
//                 setStreakData(payload)
//                 setOpen(true)
//             }
//         )
//             .subscribe()
//     }, [supabase])

//     useEffect(() => {
//         if (!open || !streakData) return

//         const duration = 1 * 1000
//         const end = Date.now() + duration
//         const colors = ['#bb0000', '#ffffff']

//         function frame() {
//             confetti({
//                 particleCount: 10,
//                 angle: 60,
//                 spread: 55,
//                 origin: { x: 0 },
//                 // colors: colors
//             })
//             confetti({
//                 particleCount: 10,
//                 angle: 120,
//                 spread: 55,
//                 origin: { x: 1 },
//                 // colors: colors
//             })

//             if (Date.now() < end) {
//                 requestAnimationFrame(frame)
//             }
//         }

//         const timeout = setTimeout(() => {
//             frame()
//         }, 200) // delay slightly to let DOM stabilize

//         return () => clearTimeout(timeout)
//     }, [open, streakData])

//     // useEffect(() => {
//     //     if (!open || !streakData) return

//     //     const timeout = setTimeout(() => {
//     //         if (container.current) {
//     //             const rect = container.current.getBoundingClientRect()
//     //             // confetti({
//     //             //     particleCount: 100,
//     //             //     spread: 70,
//     //             //     origin: {
//     //             //         x: (rect.left + rect.width / 2) / window.innerWidth,
//     //             //         y: (rect.top + rect.height / 2) / window.innerHeight
//     //             //     }
//     //             // })
//     //             const colors = ['#bb0000', '#ffffff'];
//     //             confetti({
//     //                 particleCount: 2,
//     //                 angle: 60,
//     //                 spread: 55,
//     //                 origin: { x: 0 },
//     //                 colors: colors
//     //             });
//     //             confetti({
//     //                 particleCount: 2,
//     //                 angle: 120,
//     //                 spread: 55,
//     //                 origin: { x: 1 },
//     //                 colors: colors
//     //             });
//     //         }
//     //     }, 200) // slight delay to allow DOM layout

//     //     return () => clearTimeout(timeout)
//     // }, [open, streakData])


//     // useEffect(() => {
//     //     if (!open || !streakData) return;

//     //     const runFireworks = () => {
//     //         if (container.current && streakData.old.current_streak < streakData.new.current_streak) {
//     //             const fw = new Fireworks(container.current,
//     //                 {
//     //                     rocketsPoint: { min: 50, max: 50 },
//     //                     hue: {
//     //                         min: 16.439,
//     //                         max: 16.439
//     //                     }
//     //                 }
//     //             )
//     //             fw.start()
//     //             setTimeout(() => fw.stop(), 4000)
//     //             console.log("yo")
//     //         }
//     //     }

//     //     // Delay until next paint to ensure container div is mounted
//     //     const id = requestAnimationFrame(runFireworks)

//     //     return () => cancelAnimationFrame(id)
//     // }, [open, streakData])


//     if (streakData) {
//         return (<>
//             <div className="w-full h-full absolute pointer-events-none" ref={container}></div>
//             <AlertDialog open={open} onOpenChange={setOpen}>
//                 {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
//                 <AlertDialogContent>

//                     <AlertDialogHeader>
//                         <AlertDialogTitle>
//                             <AlertDialogTitle>
//                                 {streakData.old.current_streak === 0
//                                     ? "You just started a new streak! Let the momentum begin!"
//                                     : `You're on a roll! That's ${streakData.new.current_streak} days in a row!`}
//                             </AlertDialogTitle>
//                         </AlertDialogTitle>
//                         <AlertDialogDescription className="text-center">
//                             {/* <AnimatedNumber start={streakData.old.current_streak} end={streakData.new.current_streak} /> */}
//                             <HTMLContent streakData={streakData} />
//                             {/* <pre>{JSON.stringify(streakData, null, 2)}</pre> */}
//                         </AlertDialogDescription>
//                     </AlertDialogHeader>
//                     <AlertDialogFooter className="mt-2">
//                         {/* <AlertDialogCancel asChild>
//                             <button onClick={() => setOpen(false)}>
//                                 Cancel
//                             </button>
//                         </AlertDialogCancel> */}
//                         <AlertDialogAction asChild><button onClick={handleClaimXP}>Claim XP</button></AlertDialogAction>
//                     </AlertDialogFooter>
//                 </AlertDialogContent>
//             </AlertDialog>
//         </>
//         )
//     }
// }


// function HTMLContent({ streakData }: { streakData: any }) {
//     // const count = useMotionValue(streakData.old.current_streak)
//     const count = useMotionValue(0)
//     const rounded = useTransform(() => Math.round(count.get()))

//     const [startTransition, setStartTransition] = useState(false)
//     const [numberDone, setNumberDone] = useState(false)

//     // Trigger number animation and fire icon color transition at the same time
//     useEffect(() => {
//         if (!startTransition) return

//         const controls = animate(count, streakData.new.current_streak, {
//             duration: 2,
//             onComplete: () => setNumberDone(true),
//         })

//         return () => controls.stop()
//     }, [startTransition])

//     return (
//         <div className="flex items-center justify-center gap-2">
//             {/* Fire icon entrance animation */}
//             <motion.div
//                 initial={{ opacity: 0, scale: 0 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{
//                     duration: 1,
//                     scale: { type: "spring", duration: 1, bounce: 1 },
//                 }}
//                 onAnimationComplete={() => {
//                     // Trigger fire color + number entrance at the same time
//                     setStartTransition(true)
//                 }}
//             >
//                 <motion.div
//                     animate={{
//                         color: startTransition ? "#f97316" : "#9ca3af", // orange-400 / gray-400
//                         opacity: startTransition ? 1 : 0.5,
//                     }}
//                     transition={{ duration: 1 }}
//                 >
//                     <FireIcon className="size-16 drop-shadow-lg" />
//                 </motion.div>
//             </motion.div>

//             {/* Number fades in and animates count up */}
//             {startTransition && (
//                 <motion.span
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 1, delay: 0.1 }}
//                     className="text-5xl font-bold text-orange-400"
//                 >
//                     {rounded}
//                 </motion.span>
//             )}
//         </div>
//     )
// }




