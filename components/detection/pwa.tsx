'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PWACheck({ os, browser }: { os: string, browser: string }) {
    const router = useRouter()

    useEffect(() => {
        const isPWA = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
        if (!isPWA && (os == 'Android' || os == 'iOS')) {
            router.push('/onboarding/download-app')
        }
    }, [])
    return null
}