"use client"

import { animate, motion, useMotionValue, useTransform } from "motion/react"
import { useEffect } from "react"

export default function XPCard({ xp, duration }: { xp: number, duration: number }) {
    const count = useMotionValue(0)
    const rounded = useTransform(() => Math.round(count.get()))

    useEffect(() => {
        const controls = animate(count, xp, { duration: duration })
        return () => controls.stop()
    }, [])

    return <motion.span>{rounded}</motion.span>
}

/**
 * ==============   Styles   ================
 */

const text = {
    fontSize: 64,
    color: "#8df0cc",
}
