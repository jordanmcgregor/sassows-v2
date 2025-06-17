'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client';
import { useUser } from '@/context/selected-child';
import Overlay from '@/components/submitting/overlay';

export default function PWACheck({ os, browser }: { os: string, browser: string }) {
    const [checkingIsPwa, setCheckingIsPwa] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const updatePwa = async () => {
            const supabase = await createClient();
            const { data: authUser, error: authUserError } = await supabase.auth.getUser()
            if (authUser && authUser.user?.id) {
                const { data: recordData, error: recordError } = await supabase
                    .from('users')
                    .update({ pwa: true })  // You must include user id to update existing user
                    .eq('id', authUser.user.id)
                    .select();
                if (recordError) {
                    // handle error
                    console.error('Error updating pwa:', recordError);
                }
                router.push('/home')
            }
        }
        const isPWA = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
        if (isPWA) {
            updatePwa()
        }
        setCheckingIsPwa(false)
    }, [])
    return (
        <div className={checkingIsPwa ? '' : 'hidden'}>
            <Overlay />
        </div>
    )
}