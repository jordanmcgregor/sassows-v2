'use client';

import { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AndroidPWAInstructions() {
    const [platform, setPlatform] = useState<'android' | 'ios-safari' | 'ios-chrome' | 'ios-other' | null>(null);
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [hasInstalled, setHasInstalled] = useState(false);

    useEffect(() => {
        const ua = navigator.userAgent.toLowerCase();

        const isAndroid = /android/.test(ua);
        const isIos = /iphone|ipad|ipod/.test(ua);
        const isSafari = /safari/.test(ua) && !/chrome|crios/.test(ua);
        const isChrome = /crios/.test(ua); // Chrome on iOS

        if (isAndroid) setPlatform('android');
        else if (isIos && isSafari) setPlatform('ios-safari');
        else if (isIos && isChrome) setPlatform('ios-chrome');
        else if (isIos) setPlatform('ios-other');

        const handler = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('PWA installed');
            setHasInstalled(true);
        }

        setDeferredPrompt(null);
    };

    if (!platform || platform !== 'android') return null;

    return (
        <div className="w-full p-12">
            {!hasInstalled ? (
                <Card className="m-auto max-w-xl">
                    <CardHeader>
                        <CardTitle className="leading-normal">Launching the App</CardTitle>
                        <CardDescription className="text-muted-foreground text-sm mt-2">
                            The app will be added to your home screen. Once launched, you’ll continue onboarding right where you left off—no browser needed.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            className="w-full"
                            onClick={handleInstall}
                        >
                            Open App
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <Card className="m-auto max-w-xl">
                    <CardHeader>
                        <CardTitle className="leading-normal">App Installed</CardTitle>
                        <CardDescription className="text-muted-foreground text-sm mt-2">
                            The app has been added to your home screen. Open it from there to continue onboarding.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            You can now close this window.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
