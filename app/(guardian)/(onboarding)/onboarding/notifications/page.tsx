'use client'
import { Button } from '@/components/ui/button'
import { IconArrowUp } from '@tabler/icons-react'
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation'
import useFcmToken from '@/hooks/usePushNotificationToken'

export default function Notifications() {
    const { notificationPermissionStatus, token, loadToken } = useFcmToken()
    return (
        // <div className="bg-[url('/notificationpositioning.png')] bg-cover bg-center">
        <div className="w-full h-dvh min-h-2.5 flex flex-col justify-between items-between relative p-12">
            <div className="flex-1"> {/* Adjust positioning as needed */}
                <TypeAnimation
                    sequence={[
                        "The sweetest moments often slip by unnoticed. I’ll gently remind you to catch them before they’re gone.",
                        // ... (rest of your sequence)
                    ]}
                    wrapper="span"
                    speed={50}
                    style={{ display: 'inline-block' }} // Added display: inline-block for proper sizing
                    repeat={0}
                />
            </div>
            <div className="flex-1 flex items-center">
                <button onClick={loadToken}>
                    <div className="relative">
                        <Image width={500} height={500} className="opacity-20 p-3" alt="" src="/notificationrequestgrayscale.png"></Image>
                        <IconArrowUp className="absolute left-[75%] -translate-x-1/2 bounce-down text-blue-400 size-8" />
                    </div>
                </button>
            </div>

            <div className="flex-1 flex items-end">
                <Button onClick={loadToken} variant={"default"} className="w-full h-12">
                    Help me remember the magic
                </Button>
            </div>
        </div >
        // </div>
    )
}