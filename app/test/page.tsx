// 'use client'

// import { useState, useEffect } from 'react'
// import { subscribeUser, unsubscribeUser, sendNotification } from '@/utils/pwa/notifications'

// function urlBase64ToUint8Array(base64String: string) {
//     const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
//     const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

//     const rawData = window.atob(base64)
//     const outputArray = new Uint8Array(rawData.length)

//     for (let i = 0; i < rawData.length; ++i) {
//         outputArray[i] = rawData.charCodeAt(i)
//     }
//     return outputArray
// }

// function PushNotificationManager() {
//     const [isSupported, setIsSupported] = useState(false)
//     const [subscription, setSubscription] = useState<PushSubscription | null>(
//         null
//     )
//     const [message, setMessage] = useState('')

//     useEffect(() => {
//         if ('serviceWorker' in navigator && 'PushManager' in window) {
//             setIsSupported(true)
//             registerServiceWorker()
//         }
//     }, [])

//     async function registerServiceWorker() {
//         const registration = await navigator.serviceWorker.register('/sw.js', {
//             scope: '/',
//             updateViaCache: 'none',
//         })
//         const sub = await registration.pushManager.getSubscription()
//         setSubscription(sub)
//     }

//     async function subscribeToPush() {
//         const registration = await navigator.serviceWorker.ready
//         const sub = await registration.pushManager.subscribe({
//             userVisibleOnly: true,
//             applicationServerKey: urlBase64ToUint8Array(
//                 process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
//             ),
//         })
//         setSubscription(sub)
//         const serializedSub = JSON.parse(JSON.stringify(sub))
//         await subscribeUser(serializedSub)
//     }

//     async function unsubscribeFromPush() {
//         await subscription?.unsubscribe()
//         setSubscription(null)
//         await unsubscribeUser()
//     }

//     async function sendTestNotification() {
//         if (subscription) {
//             await sendNotification(message)
//             setMessage('')
//         }
//     }

//     if (!isSupported) {
//         return <p>Push notifications are not supported in this browser.</p>
//     }

//     return (
//         <div>
//             <h3>Push Notifications</h3>
//             {subscription ? (
//                 <>
//                     <p>You are subscribed to push notifications.</p>
//                     <button onClick={unsubscribeFromPush}>Unsubscribe</button>
//                     <input
//                         type="text"
//                         placeholder="Enter notification message"
//                         value={message}
//                         onChange={(e) => setMessage(e.target.value)}
//                     />
//                     <button onClick={sendTestNotification}>Send Test</button>
//                 </>
//             ) : (
//                 <>
//                     <p>You are not subscribed to push notifications.</p>
//                     <button onClick={subscribeToPush}>Subscribe</button>
//                 </>
//             )}
//         </div>
//     )
// }

// function InstallPrompt() {
//     const [isIOS, setIsIOS] = useState(false)
//     const [isStandalone, setIsStandalone] = useState(false)
   
//     useEffect(() => {
//       setIsIOS(
//         /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
//       )
   
//       setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
//     }, [])
   
//     if (isStandalone) {
//       return null // Don't show install button if already installed
//     }
   
//     return (
//       <div>
//         <h3>Install App</h3>
//         <button>Add to Home Screen</button>
//         {isIOS && (
//           <p>
//             To install this app on your iOS device, tap the share button
//             <span role="img" aria-label="share icon">
//               {' '}
//               ⎋{' '}
//             </span>
//             and then "Add to Home Screen"
//             <span role="img" aria-label="plus icon">
//               {' '}
//               ➕{' '}
//             </span>.
//           </p>
//         )}
//       </div>
//     )
//   }
   
//   export default function Page() {
//     return (
//       <div>
//         <PushNotificationManager />
//         <InstallPrompt />
//       </div>
//     )
//   }

'use client'

import { useState, useEffect } from 'react'
import { subscribeUser, unsubscribeUser, sendNotification } from '@/utils/pwa/notifications'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'

function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}

function PushNotificationManager() {
    const [isSupported, setIsSupported] = useState(false)
    const [subscription, setSubscription] = useState<PushSubscription | null>(null)
    const [message, setMessage] = useState('')

    useEffect(() => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            setIsSupported(true)
            registerServiceWorker()
        }
    }, [])

    async function registerServiceWorker() {
        const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
            updateViaCache: 'none',
        })
        const sub = await registration.pushManager.getSubscription()
        setSubscription(sub)
    }

    async function subscribeToPush() {
        const registration = await navigator.serviceWorker.ready
        const sub = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
                process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
            ),
        })
        setSubscription(sub)
        const serializedSub = JSON.parse(JSON.stringify(sub))
        await subscribeUser(serializedSub)
    }

    async function unsubscribeFromPush() {
        await subscription?.unsubscribe()
        setSubscription(null)
        await unsubscribeUser()
    }

    async function sendTestNotification() {
        if (subscription) {
            await sendNotification(message)
            setMessage('')
        }
    }

    if (!isSupported) {
        return (
            <Card className="p-6">
                <CardHeader>
                    <CardTitle>Push Notifications</CardTitle>
                    <CardDescription>Not supported on this browser.</CardDescription>
                </CardHeader>
            </Card>
        )
    }

    return (
        <Card className="p-6">
            <CardHeader>
                <CardTitle>Push Notifications</CardTitle>
                <CardDescription>
                    {subscription ? 'Manage your subscription.' : 'Subscribe to get notified.'}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {subscription ? (
                    <>
                        <p className="text-sm text-muted-foreground">You are currently subscribed.</p>
                        <Button variant="destructive" onClick={unsubscribeFromPush}>
                            Unsubscribe
                        </Button>

                        <Separator />

                        <div className="space-y-2">
                            <Label htmlFor="message">Test Message</Label>
                            <Input
                                id="message"
                                placeholder="Enter a message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <Button onClick={sendTestNotification}>Send Test Notification</Button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-sm text-muted-foreground">You are not subscribed.</p>
                        <Button onClick={subscribeToPush}>Subscribe</Button>
                    </>
                )}
            </CardContent>
        </Card>
    )
}

function InstallPrompt() {
    const [isIOS, setIsIOS] = useState(false)
    const [isStandalone, setIsStandalone] = useState(false)

    useEffect(() => {
        setIsIOS(
            /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
        )
        setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
    }, [])

    if (isStandalone) {
        return null
    }

    return (
        <Card className="p-6 mt-6">
            <CardHeader>
                <CardTitle>Install App</CardTitle>
                <CardDescription>Get the full app experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button>Add to Home Screen</Button>
                {isIOS && (
                    <p className="text-sm text-muted-foreground">
                        On iOS, tap the share icon{' '}
                        <span role="img" aria-label="share icon">⎋</span> and then select "Add to Home Screen" {' '}
                        <span role="img" aria-label="plus icon">➕</span>.
                    </p>
                )}
            </CardContent>
        </Card>
    )
}

export default function Page() {
    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6">
            <PushNotificationManager />
            <InstallPrompt />
        </div>
    )
}
