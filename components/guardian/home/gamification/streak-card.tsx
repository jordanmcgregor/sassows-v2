'use client'
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { BoltIcon, FireIcon, KeyIcon, LockClosedIcon, TrophyIcon } from "@heroicons/react/20/solid"
import { createClient } from "@/utils/supabase/client"

export default function StreakCard({ streak }: { streak: any }) {
    const today = new Date().toLocaleDateString('en-CA')
    const entryDateLocal = parseUTCDateToLocalYYYYMMDD(streak.last_entry_date)
    const isToday = entryDateLocal === today


    return (
        <Card className="@container/card bg-white gap-0">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    <span className="flex">
                        <FireIcon className={`size-8 ${streak.current_streak > 0 && isToday ? "text-orange-400" : "text-gray-400"}`} />
                        <span className="pl-0.5" />
                        {isMoreThanOneDayOld(streak.last_entry_date) ? 0 : streak.current_streak}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                    Day Streak
                </div>
            </CardFooter>
        </Card>
    )
}

function parseUTCDateToLocalYYYYMMDD(utcDateStr: string): string {
    const [year, month, day] = utcDateStr.split('-').map(Number)
    const local = new Date(year, month - 1, day) // creates a local midnight date
    return local.toLocaleDateString('en-CA')
}


function isMoreThanOneDayOld(date: string) {
    const [year, month, day] = date.split('-').map(Number)

    // Create a local date using year, monthIndex (0-based), and day
    const entryDate = new Date(year, month - 1, day)
    const today = new Date()

    // Zero out time for today
    today.setHours(0, 0, 0, 0)

    const diffInMs = today.getTime() - entryDate.getTime()
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24)

    return diffInDays > 1
}


