'use client'
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import BadgeAnimation from '@/components/guardian/home/gamification/badge-animation'

export function TreasureChestAnimationHalf() {
    return (
        <div className="w-full flex justify-center overflow-hidden">
            <div className="scale-[1.8] origin-center">
                <DotLottieReact
                    src="/treasurechest.lottie"
                    loop
                    mode="bounce"
                    segment={[50, 88]}
                    autoplay
                    className="pointer-events-none"
                    renderConfig={{ autoResize: true }}
                />
            </div>
        </div>
    );
};

export function TreasureChestAnimationFull() {
    return (
        <div className="w-full flex justify-center overflow-hidden">
            <div className="scale-[1.8] origin-center">
                <DotLottieReact
                    src="/treasurechest.lottie"
                    loop
                    mode="bounce"
                    // segment={[50, 88]}
                    autoplay
                    className="pointer-events-none"
                    renderConfig={{ autoResize: true }}
                />
            </div>
        </div>
    );
};

export default TreasureChestAnimationFull