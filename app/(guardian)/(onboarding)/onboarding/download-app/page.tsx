import AndroidPWAInstructions from '@/components/guardian/onboarding/pwa/download/android'
import IphonePWAInstructions from '@/components/guardian/onboarding/pwa/download/iphone'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

function detectOS(ua: string): string {
    if (/iPhone|iPad|iPod/.test(ua)) return 'iOS'
    if (/Android/.test(ua)) return 'Android'
    if (/Windows NT/.test(ua)) return 'Windows'
    if (/Mac OS X/.test(ua) && !/iPhone|iPad|iPod/.test(ua)) return 'macOS'
    if (/Linux/.test(ua) && !/Android/.test(ua)) return 'Linux'
    return 'Unknown'
}

function detectBrowser(ua: string): string {
    if (/Edg\//.test(ua)) return 'Edge'
    if (/Chrome\//.test(ua) && !/Edg\//.test(ua)) return 'chrome'
    if (/CriOS/.test(ua)) return 'chrome'
    if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return 'safari'
    // if (/Firefox\//.test(ua)) return 'firefox'
    // if (/MSIE|Trident/.test(ua)) return 'Internet Explorer'
    return 'Unknown'
}

export default async function Page() {
    const headersList = await headers()
    const ua = headersList.get('user-agent') || ''

    const os = detectOS(ua)
    const browser = detectBrowser(ua)

    console.log(os == 'Android')

    if (os == 'iOS') {
        return (
            <>
                {/* <p><strong>Operating System:</strong> {os}</p>
                <p><strong>Browser:</strong> {browser}</p> */}
                <IphonePWAInstructions browser={browser} />
            </>
        )
    }
    else if (os == 'Android') {
        return (
            <AndroidPWAInstructions />
        )
    }
    else {
        redirect('/home') // or show modal/form here if client-side
    }
}
