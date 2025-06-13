'use client'
import { Button } from '@/components/ui/button'
import { IconArrowUp } from '@tabler/icons-react'
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation'
import useFcmToken from '@/hooks/usePushNotificationToken'


export default function NotificationApprovalByDevice({ os, browser }: { os: any, browser: any }) {
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
            {/* {os == 'iOS' ? <Apple loadToken={loadToken} /> : null}
            {os == 'Android' ? <Android loadToken={loadToken} /> : null} */}
            <Android loadToken={loadToken} />
            <div className="flex-1 flex items-end">
                <Button onClick={loadToken} variant={"default"} className="w-full h-12">
                    Help me remember the magic
                </Button>
            </div>
        </div >
        // </div>
    )
}

function Apple(loadToken: any) {
    return (
        <div className="flex-1 flex items-center absolute top-48/100 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[69vw]">
            <button onClick={loadToken}>
                <div className="relative">
                    <Image width={500} height={500} className="" alt="" src="/notificationrequestgrayscale.png"></Image>
                    <IconArrowUp className="absolute left-[75%] -translate-x-1/2 bounce-down text-blue-400 size-8" />
                </div>
            </button>
        </div>
    )
}

function Android(loadToken: any) {
    return (
        <div className="flex-1 flex items-center absolute top-48/100 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw]">
            <button onClick={loadToken}>
                <div className="relative">
                    <Image width={500} height={500} className="" alt="" src="/notificationrequestandroid.png"></Image>
                    <IconArrowUp className="absolute left-[85%] -translate-x-1/2 bounce-down text-[#2E4B82] size-8" />
                </div>
            </button>
        </div>
    )
}