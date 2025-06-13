"use client"

import { motion } from "motion/react"

export default function Overlay() {
    return (
        <>
            <div className="absolute w-full h-dvh z-50">
                <div className="absolute w-full h-full bg-white opacity-50">

                </div>
                <div className="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <LoadingCircleSpinner />
                </div>
            </div>
        </>
    )
}

function LoadingCircleSpinner() {
    return (
        <div className="container">
            <motion.div
                className="spinner"
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
            <StyleSheet />
        </div>
    )
}

/**
 * ==============   Styles   ================
 */
function StyleSheet() {
    return (
        <style>
            {`
            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 40px;
                border-radius: 8px;
            }

            .spinner {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: 4px solid #e5e7eb;
                border-top-color: var(--primary);
                will-change: transform;
            }
            `}
        </style>
    )
}
