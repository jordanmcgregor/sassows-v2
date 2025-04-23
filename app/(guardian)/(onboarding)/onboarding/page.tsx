import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

export default function CardWithForm() {
    return (
        <div className="p-12 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full items-stretch">
            <div className="h-full">
                <Card className="h-full flex flex-col">
                    <CardHeader>
                        <CardTitle className="leading-normal">Add Your Children</CardTitle>
                        <CardDescription>
                            Start building your family's memory book by adding your child. Capture milestones, share special moments, and keep their story growing over time.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        {/* Optional content */}
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" asChild>
                            <Link href="/onboarding/get-started">Add a Child</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            <div className="h-full">
                <Card className="h-full flex flex-col">
                    <CardHeader>
                        <CardTitle className="leading-normal">Stay Connected with Your Nieces, Nephews, or Grandkids</CardTitle>
                        <CardDescription>
                            Follow along as your loved ones grow. Get updates when parents share new memories, milestones, or sweet moments — all in one place.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        {/* Optional content */}
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" asChild>
                            <Link href="/onboarding/follow">Follow Loved Ones</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
