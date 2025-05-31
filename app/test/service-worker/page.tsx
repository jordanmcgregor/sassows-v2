'use client'
import { useState, useEffect } from 'react'

interface DebugInfo {
    serviceWorkerSupported: boolean
    pushManagerSupported: boolean
    notificationPermission: NotificationPermission
    serviceWorkerRegistered: boolean
    subscriptionExists: boolean
    vapidKeyExists: boolean
    subscriptionDetails: PushSubscription | null
}

interface LogEntry {
    message: string
    type: 'info' | 'success' | 'error' | 'warning'
    timestamp: string
}

export default function PushNotificationDebugger() {
    const [debugInfo, setDebugInfo] = useState<DebugInfo>({
        serviceWorkerSupported: false,
        pushManagerSupported: false,
        notificationPermission: 'default',
        serviceWorkerRegistered: false,
        subscriptionExists: false,
        vapidKeyExists: false,
        subscriptionDetails: null
    })

    const [logs, setLogs] = useState<LogEntry[]>([])
    const [userAgent, setUserAgent] = useState<string | null>(null)
    const [hostInfo, setHostInfo] = useState<{ protocol: string; host: string } | null>(null)

    // Get VAPID key from environment
    const VAPID_PUBLIC_KEY: string | null = typeof window !== 'undefined' && typeof process !== 'undefined' ?
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || null :
        null

    const addLog = (message: string, type: LogEntry['type'] = 'info'): void => {
        const timestamp = new Date().toLocaleTimeString()
        setLogs(prev => [...prev, { message, type, timestamp }])
    }

    useEffect(() => {
        checkBrowserSupport()

        if (typeof window !== 'undefined') {
            setUserAgent(navigator.userAgent)
            setHostInfo({
                protocol: window.location.protocol,
                host: window.location.host,
            })
        }
    }, [])

    const checkBrowserSupport = async (): Promise<void> => {
        const info: DebugInfo = {
            serviceWorkerSupported: 'serviceWorker' in navigator,
            pushManagerSupported: 'PushManager' in window,
            notificationPermission: Notification.permission,
            serviceWorkerRegistered: false,
            subscriptionExists: false,
            vapidKeyExists: !!VAPID_PUBLIC_KEY,
            subscriptionDetails: null
        }

        addLog('Checking browser support...', 'info')
        addLog(`Service Worker supported: ${info.serviceWorkerSupported}`, info.serviceWorkerSupported ? 'success' : 'error')
        addLog(`Push Manager supported: ${info.pushManagerSupported}`, info.pushManagerSupported ? 'success' : 'error')
        addLog(`Notification permission: ${info.notificationPermission}`, info.notificationPermission === 'granted' ? 'success' : 'warning')
        addLog(`VAPID key exists: ${info.vapidKeyExists}`, info.vapidKeyExists ? 'success' : 'error')

        if (info.serviceWorkerSupported) {
            try {
                const registration = await navigator.serviceWorker.getRegistration('/sw.js')
                info.serviceWorkerRegistered = !!registration
                addLog(`Service Worker registered: ${info.serviceWorkerRegistered}`, info.serviceWorkerRegistered ? 'success' : 'error')

                if (registration) {
                    const subscription = await registration.pushManager.getSubscription()
                    info.subscriptionExists = !!subscription
                    info.subscriptionDetails = subscription
                    addLog(`Push subscription exists: ${info.subscriptionExists}`, info.subscriptionExists ? 'success' : 'warning')
                }
            } catch (error) {
                addLog(`Error checking service worker: ${(error as Error).message}`, 'error')
            }
        }

        setDebugInfo(info)
    }

    const registerServiceWorker = async (): Promise<void> => {
        try {
            addLog('Registering service worker...', 'info')
            const registration = await navigator.serviceWorker.register('/sw.js', {
                scope: '/',
                updateViaCache: 'none',
            })
            addLog('Service worker registered successfully', 'success')
            await checkBrowserSupport()
        } catch (error) {
            addLog(`Service worker registration failed: ${(error as Error).message}`, 'error')
        }
    }

    const requestNotificationPermission = async (): Promise<void> => {
        try {
            addLog('Requesting notification permission...', 'info')
            const permission = await Notification.requestPermission()
            addLog(`Permission result: ${permission}`, permission === 'granted' ? 'success' : 'error')
            await checkBrowserSupport()
        } catch (error) {
            addLog(`Permission request failed: ${(error as Error).message}`, 'error')
        }
    }

    const createSubscription = async (): Promise<void> => {
        try {
            addLog('Creating push subscription...', 'info')
            const registration = await navigator.serviceWorker.ready

            if (!VAPID_PUBLIC_KEY) {
                addLog('VAPID public key not found - make sure NEXT_PUBLIC_VAPID_PUBLIC_KEY is set in your environment', 'error')
                addLog('Check your .env.local file and restart your dev server', 'warning')
                return
            }

            addLog(`Using VAPID key: ${VAPID_PUBLIC_KEY.substring(0, 20)}...`, 'info')

            if (!isValidBase64Url(VAPID_PUBLIC_KEY)) {
                addLog('VAPID public key is not in valid base64url format', 'error')
                addLog('Expected format: base64url encoded string (URL safe base64)', 'error')
                return
            }

            const applicationServerKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
            addLog(`Converted VAPID key to Uint8Array (${applicationServerKey.length} bytes)`, 'info')

            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: applicationServerKey
            })

            addLog('Push subscription created', 'success')
            addLog(`Subscription endpoint: ${subscription.endpoint}`, 'info')

            await checkBrowserSupport()
        } catch (error) {
            addLog(`Subscription creation failed: ${(error as Error).message}`, 'error')
            if ((error as Error).message.includes('atob')) {
                addLog('This is a base64 decoding error - check your VAPID key format', 'error')
                addLog('VAPID keys should be base64url encoded (URL-safe base64)', 'warning')
            }
        }
    }

    const unsubscribe = async (): Promise<void> => {
        try {
            addLog('Attempting to unsubscribe...', 'info')
            const registration = await navigator.serviceWorker.ready
            const subscription = await registration.pushManager.getSubscription()

            if (subscription) {
                const result = await subscription.unsubscribe()
                addLog(result ? 'Unsubscribed successfully' : 'Unsubscription failed', result ? 'success' : 'error')
            } else {
                addLog('No active subscription found to unsubscribe', 'warning')
            }

            await checkBrowserSupport()
        } catch (error) {
            addLog(`Unsubscribe error: ${(error as Error).message}`, 'error')
        }
    }


    const testNotification = async (): Promise<void> => {
        try {
            addLog('Testing local notification...', 'info')
            if (Notification.permission === 'granted') {
                new Notification('Test Notification', {
                    body: 'This is a local test notification',
                    icon: '/app-icon.png'
                })
                addLog('Local notification sent', 'success')
            } else {
                addLog('Notification permission not granted', 'error')
            }
        } catch (error) {
            addLog(`Local notification failed: ${(error as Error).message}`, 'error')
        }
    }

    function isValidBase64Url(str: string): boolean {
        try {
            const base64UrlRegex = /^[A-Za-z0-9_-]+$/
            return base64UrlRegex.test(str) && str.length > 0
        } catch {
            return false
        }
    }

    function urlBase64ToUint8Array(base64String: string): Uint8Array {
        try {
            const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
            const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

            const rawData = window.atob(base64)
            const outputArray = new Uint8Array(rawData.length)

            for (let i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i)
            }
            return outputArray
        } catch (error) {
            throw new Error(`Failed to decode VAPID key: ${(error as Error).message}`)
        }
    }

    const getLogColor = (type: LogEntry['type']): string => {
        switch (type) {
            case 'success': return 'text-green-600'
            case 'error': return 'text-red-600'
            case 'warning': return 'text-yellow-600'
            default: return 'text-gray-600'
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold mb-6">Push Notification Debugger</h1>

            {/* Status Overview */}
            <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-3">System Status</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>Service Worker Support: <span className={debugInfo.serviceWorkerSupported ? 'text-green-600' : 'text-red-600'}>{debugInfo.serviceWorkerSupported ? '✓' : '✗'}</span></div>
                    <div>Push Manager Support: <span className={debugInfo.pushManagerSupported ? 'text-green-600' : 'text-red-600'}>{debugInfo.pushManagerSupported ? '✓' : '✗'}</span></div>
                    <div>Notification Permission: <span className={debugInfo.notificationPermission === 'granted' ? 'text-green-600' : 'text-yellow-600'}>{debugInfo.notificationPermission}</span></div>
                    <div>Service Worker Registered: <span className={debugInfo.serviceWorkerRegistered ? 'text-green-600' : 'text-red-600'}>{debugInfo.serviceWorkerRegistered ? '✓' : '✗'}</span></div>
                    <div>VAPID Key Present: <span className={debugInfo.vapidKeyExists ? 'text-green-600' : 'text-red-600'}>{debugInfo.vapidKeyExists ? '✓' : '✗'}</span></div>
                    <div>Push Subscription: <span className={debugInfo.subscriptionExists ? 'text-green-600' : 'text-yellow-600'}>{debugInfo.subscriptionExists ? '✓' : '✗'}</span></div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
                <button onClick={checkBrowserSupport} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Refresh Status</button>
                <button onClick={registerServiceWorker} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" disabled={!debugInfo.serviceWorkerSupported}>Register Service Worker</button>
                <button onClick={requestNotificationPermission} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Request Permission</button>
                <button onClick={createSubscription} className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600" disabled={!debugInfo.serviceWorkerRegistered || debugInfo.notificationPermission !== 'granted'}>Create Subscription</button>
                <button onClick={testNotification} className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600" disabled={debugInfo.notificationPermission !== 'granted'}>Test Local Notification</button>
                <button onClick={unsubscribe} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    Unsubscribe
                </button>

            </div>

            {/* Environment Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-3">Environment Info</h2>
                <div className="text-sm space-y-1">
                    <div>User Agent: {userAgent || 'Loading...'}</div>
                    <div>VAPID Key Length: {VAPID_PUBLIC_KEY?.length || 0} characters</div>
                    <div>VAPID Key Preview: {VAPID_PUBLIC_KEY ? `${VAPID_PUBLIC_KEY.substring(0, 20)}...` : 'Not found'}</div>
                    <div>VAPID Key Valid Format: {VAPID_PUBLIC_KEY ? (isValidBase64Url(VAPID_PUBLIC_KEY) ? '✓' : '✗') : 'N/A'}</div>
                    <div>Protocol: {hostInfo?.protocol || 'Loading...'}</div>
                    <div>Host: {hostInfo?.host || 'Loading...'}</div>
                </div>
            </div>

            {/* Debug Logs */}
            <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
                <h2 className="text-white text-lg font-semibold mb-3">Debug Log</h2>
                {logs.length === 0 ? (
                    <div className="text-gray-400">No logs yet...</div>
                ) : (
                    logs.map((log, index) => (
                        <div key={index} className={`mb-1 ${getLogColor(log.type)}`}>
                            <span className="text-gray-400">[{log.timestamp}]</span> {log.message}
                        </div>
                    ))
                )}
            </div>

            {/* Subscription Details */}
            {debugInfo.subscriptionDetails && (
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-3">Subscription Details</h2>
                    <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
                        {JSON.stringify(debugInfo.subscriptionDetails, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    )
}
