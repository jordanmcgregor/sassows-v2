'use client'
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState, useRef } from "react"
import { animate, motion, useMotionValue, useTransform } from "motion/react"
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

export default function Subscriptions() {
    const [open, setOpen] = useState(true)
    const [streakData, setStreakData] = useState<any>()
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

        // Then close the dialog
        setOpen(false)
    }


    const supabase = createClient()

    useEffect(() => {
        supabase.channel('gamification').on('postgres_changes', {
            event: 'UPDATE',
            schema: 'gamification',
            table: 'daily_streaks'
        },
            (payload) => {
                setStreakData(payload)
                setOpen(true)
            }
        )
            .subscribe()
    }, [supabase])

    useEffect(() => {
        if (!open || !streakData) return

        const duration = 1 * 1000
        const end = Date.now() + duration
        const colors = ['#bb0000', '#ffffff']

        function frame() {
            confetti({
                particleCount: 10,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                // colors: colors
            })
            confetti({
                particleCount: 10,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                // colors: colors
            })

            if (Date.now() < end) {
                requestAnimationFrame(frame)
            }
        }

        const timeout = setTimeout(() => {
            frame()
        }, 200) // delay slightly to let DOM stabilize

        return () => clearTimeout(timeout)
    }, [open, streakData])

    // useEffect(() => {
    //     if (!open || !streakData) return

    //     const timeout = setTimeout(() => {
    //         if (container.current) {
    //             const rect = container.current.getBoundingClientRect()
    //             // confetti({
    //             //     particleCount: 100,
    //             //     spread: 70,
    //             //     origin: {
    //             //         x: (rect.left + rect.width / 2) / window.innerWidth,
    //             //         y: (rect.top + rect.height / 2) / window.innerHeight
    //             //     }
    //             // })
    //             const colors = ['#bb0000', '#ffffff'];
    //             confetti({
    //                 particleCount: 2,
    //                 angle: 60,
    //                 spread: 55,
    //                 origin: { x: 0 },
    //                 colors: colors
    //             });
    //             confetti({
    //                 particleCount: 2,
    //                 angle: 120,
    //                 spread: 55,
    //                 origin: { x: 1 },
    //                 colors: colors
    //             });
    //         }
    //     }, 200) // slight delay to allow DOM layout

    //     return () => clearTimeout(timeout)
    // }, [open, streakData])


    // useEffect(() => {
    //     if (!open || !streakData) return;

    //     const runFireworks = () => {
    //         if (container.current && streakData.old.current_streak < streakData.new.current_streak) {
    //             const fw = new Fireworks(container.current,
    //                 {
    //                     rocketsPoint: { min: 50, max: 50 },
    //                     hue: {
    //                         min: 16.439,
    //                         max: 16.439
    //                     }
    //                 }
    //             )
    //             fw.start()
    //             setTimeout(() => fw.stop(), 4000)
    //             console.log("yo")
    //         }
    //     }

    //     // Delay until next paint to ensure container div is mounted
    //     const id = requestAnimationFrame(runFireworks)

    //     return () => cancelAnimationFrame(id)
    // }, [open, streakData])


    if (streakData) {
        return (<>
            <div className="w-full h-full absolute pointer-events-none" ref={container}></div>
            <AlertDialog open={open} onOpenChange={setOpen}>
                {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
                <AlertDialogContent>

                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            <AlertDialogTitle>
                                {streakData.old.current_streak === 0
                                    ? "You just started a new streak! Let the momentum begin!"
                                    : `You're on a roll! That's ${streakData.new.current_streak} days in a row!`}
                            </AlertDialogTitle>
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-center">
                            {/* <AnimatedNumber start={streakData.old.current_streak} end={streakData.new.current_streak} /> */}
                            <HTMLContent streakData={streakData} />
                            {/* <pre>{JSON.stringify(streakData, null, 2)}</pre> */}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-2">
                        {/* <AlertDialogCancel asChild>
                            <button onClick={() => setOpen(false)}>
                                Cancel
                            </button>
                        </AlertDialogCancel> */}
                        <AlertDialogAction asChild><button onClick={handleClaimXP}>Claim XP</button></AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
        )
    }
}


function HTMLContent({ streakData }: { streakData: any }) {
    // const count = useMotionValue(streakData.old.current_streak)
    const count = useMotionValue(0)
    const rounded = useTransform(() => Math.round(count.get()))

    const [startTransition, setStartTransition] = useState(false)
    const [numberDone, setNumberDone] = useState(false)

    // Trigger number animation and fire icon color transition at the same time
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
            {/* Fire icon entrance animation */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 1,
                    scale: { type: "spring", duration: 1, bounce: 1 },
                }}
                onAnimationComplete={() => {
                    // Trigger fire color + number entrance at the same time
                    setStartTransition(true)
                }}
            >
                <motion.div
                    animate={{
                        color: startTransition ? "#f97316" : "#9ca3af", // orange-400 / gray-400
                        opacity: startTransition ? 1 : 0.5,
                    }}
                    transition={{ duration: 1 }}
                >
                    <FireIcon className="size-16 drop-shadow-lg" />
                </motion.div>
            </motion.div>

            {/* Number fades in and animates count up */}
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




