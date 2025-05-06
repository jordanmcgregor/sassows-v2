'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { IconShare2, IconSquarePlus } from '@tabler/icons-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function IphonePWAInstructions({ browser }: { browser: string }) {
    const [gifLoaded, setGifLoaded] = useState(false);


    return (
        <div className="w-full p-12">
            {/* iOS Safari / Chrome Instructions */}
            <Card className="m-auto max-w-xl">
                <CardHeader>
                    <CardTitle className="leading-normal">Install on iOS</CardTitle>
                    <CardDescription>
                        <ol className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <li>
                                1. Tap the
                                <span className="inline-flex items-center gap-1 font-medium mx-1">
                                    <IconShare2 className="inline-block h-4 w-4" />
                                </span>
                                button in the browser menu.
                            </li>
                            <li>
                                2. Scroll down and tap the
                                <span className="inline-flex items-center gap-1 font-medium mx-1">
                                    <IconSquarePlus className="h-4 w-4" />

                                </span>
                                button next to the "Add to Home Screen" text.
                            </li>
                            <li>3. Tap the "Add" button.</li>
                            <li>4. Finish the onboarding process by opening the app</li>
                        </ol>
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {!gifLoaded && (
                        <div className="flex flex-col space-y-3 w-full">
                            <Skeleton className="w-full max-w-[500px] aspect-[9/16] rounded-xl" />
                        </div>
                    )}
                    <Image
                        src={`/${browser}Download.gif`}
                        alt="Download tutorial animation"
                        width={500}
                        height={889} // matches 9/16 aspect ratio for 500 width
                        unoptimized
                        className={`rounded-2xl transition-opacity duration-300 ${gifLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => setGifLoaded(true)}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
