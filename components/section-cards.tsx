import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { createClient } from '@/utils/supabase/server';

import { modules } from '@/components/guardian/modules/all'
import { ModuleType } from "@/types/modules/type"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircleIcon, ClockIcon, Flame } from "lucide-react"
import { BoltIcon, FireIcon, KeyIcon, LockClosedIcon, TrophyIcon } from "@heroicons/react/20/solid"
import Image from "next/image";
import { Progress } from "@/components/ui/progress"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import StreakCard from "./guardian/home/gamification/streak-card";
import { Span } from "next/dist/trace";
import { TreasureChestAnimationHalf } from "@/components/guardian/home/gamification/quest-animation"
import { Separator } from "./ui/separator";
import XPCard from "./guardian/home/gamification/xp-animation";
import { DateTime } from 'luxon'
import DailyQuest from "@/components/guardian/modules/quest";

const questCompletionMessages = [
  "🎉 Quest complete! You're one step closer to earning that shiny monthly badge!",
  "✅ You did it! Another quest down — your badge is practically cheering you on!",
  "💪 That’s what we call consistency! Keep it up, champ.",
  "🚀 Boom! You’re flying through this month’s quests.",
  "🏆 Badge unlocked? Not yet. But you’re so on the way.",
  "📅 Daily quest: DONE. This badge is gonna be epic!",
  "✨ Another day, another win. Your badge progress looks amazing!",
  "🌟 You journaled with heart today. Keep that momentum going!",
  "🔥 You're on fire! Keep burning through these quests!",
  "💖 That memory was worth gold — and XP! Badge progress: solid.",
  "👏 You showed up today — and that’s how badges get earned!",
  "🧠 Your brain? Crushing it. That badge? Getting closer.",
  "🛡️ Another quest down. You’re building something beautiful.",
  "🥳 Today’s quest? Owned. Badge? Within reach.",
  "🌈 Look at you go! You’re painting a badge-worthy month!",
  "🚨 Alert: User is dangerously close to monthly badge greatness.",
  "🧭 You’re navigating these quests like a pro. Keep going!",
  "🎯 Bullseye! Daily quest hit. Now go hit that badge!",
  "🥇 You’re stacking wins. Your badge is basically guaranteed!",
  "📖 Today’s entry adds one more page to your legend.",
  "🐣 Daily quest hatched! This badge is gonna be a beauty.",
  "✍️ Journaling like this is how legends earn badges.",
  "🎇 Fireworks! You’ve made today count.",
  "🎶 That was music to your badge’s ears. One step closer!",
  "⏳ Every quest counts. You’re right on schedule.",
  "🍀 Another lucky step on the path to badge glory.",
  "🌞 You showed up — and that matters. Badge on the horizon!",
  "🥰 You’re building a treasure trove of memories — and a badge.",
  "💎 That entry was a gem. Your badge sparkle just got brighter.",
  "🏁 Today? Handled. Badge finish line? Getting real close."
];

function Header({
  children,
  text
}: {
  children?: React.ReactNode,
  text: string
}) {
  return (
    <div className="flex items-center justify-around mt-4">
      <h1 className="text-2xl font-bold w-full grid-cols-1">{text}</h1>
      {children}
    </div>
  )
}


export async function SectionCards({ data }: { data: any }) {
  const supabase = await createClient();
  const { data: achievements, error: achievementError } = await supabase
    .schema('gamification')
    .from('achievements')
    .select()
    .order('xp_reward', { ascending: true })

  const { data: { user } } = await supabase.auth.getUser()

  const now = DateTime.now().setZone('America/Denver');
  const todayString = DateTime.now().setZone('America/Denver').toISODate();
  const { data: quest, error: questError } = await supabase
    .schema('gamification')
    .from('daily_quests')
    .select()
    .eq('date', todayString)
    .single()

  console.log(quest)

  const { data: userDailyQuests, error: userDailyQuestsError } = await supabase
    .schema('gamification')
    .from('user_daily_quests')
    .select()
    .eq('quest_id', quest.id)
    .single()

  let { data: streak, error: streakError } = await supabase
    .schema('gamification')
    .from('user_daily_streaks')
    .select()
    .single()

  let { data: userXp, error: userXpError } = await supabase
    .schema('gamification')
    .from('user_xp')
    .select()
    .single()

  let { data: userMonthlyBadges, error: userMonthlyBadgesError } = await supabase
    .schema('gamification')
    .from('user_monthly_badges_view')
    .select()
    .order('month', { ascending: true })

  let { data: userAchievements, error: userAchievementsError } = await supabase
    .schema('gamification')
    .from('user_achievements_view')
    .select()
    .order('xp', { ascending: true })

  if (streakError) {
    if (streakError.code === 'PGRST116') {
      console.warn("No streak found or multiple streaks returned");
      // You can return null or fallback logic here
      let { data: streakCreated, error: streakError } = await supabase
        .schema('gamification')
        .from('daily_streaks')
        .insert([{ current_streak: 0, longest_streak: 0, last_entry_date: new Date(0).toISOString().split("T")[0] }])
        .select()
        .single()
      streak = streakCreated
    } else {
      console.error("Unexpected error fetching streak:", streakError.message)
      // Optional: throw or handle more specific errors
    }
  }

  const lastEntryDate = DateTime.fromISO(streak.last_entry_date, { zone: 'America/Denver' }).toISODate();
  const isToday = lastEntryDate === todayString;
  const endOfDay = now.endOf('day');

  const diff = endOfDay.diff(now, ['hours', 'minutes', 'seconds']);
  const hoursLeft = Math.floor(diff.hours);

  const module = determineModule({ modules, type: quest.record_type })!;

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Header text={"Overview"}>
      </Header>
      <div className="grid grid-cols-2 gap-4">
        {/* ------------------------------------------------------------------- */}
        {/* --------------------------- Streak Card --------------------------- */}
        {/* ------------------------------------------------------------------- */}
        <StreakCard streak={streak} />
        {/* ---------------------------------------------------------------------- */}
        {/* --------------------------- XP Points Card --------------------------- */}
        {/* ---------------------------------------------------------------------- */}
        <Card className="@container/card bg-white gap-0">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              <div className="flex items-center">
                <BoltIcon className={`size-8 ${calculateDailyStreak(data) > 0 ? "text-yellow-400" : "text-gray-400"}`} />
                <span className="pl-0.5">
                  <XPCard xp={userXp.xp} duration={5} /> {/* Display the count */}
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Total XP
            </div>
          </CardFooter>
        </Card>
        {/* ------------------------------------------------------------------- */}
        {/* --------------------------- League Card --------------------------- */}
        {/* ------------------------------------------------------------------- */}
        <Card className="@container/card bg-white gap-0">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-gray-300">
              <div className="flex items-center">
                <KeyIcon className={`size-8 text-gray-400"}`} />
                {/* <span className="pl-0.5 text-md">
                  None
                </span> */}
              </div>
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm text-gray-300">
            <div className="line-clamp-1 flex gap-2 font-medium">
              League
            </div>
          </CardFooter>
        </Card>
        {/* ------------------------------------------------------------------------------- */}
        {/* --------------------------- Top Three Finishes Card --------------------------- */}
        {/* ------------------------------------------------------------------------------- */}
        <Card className="@container/card bg-white gap-0">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-gray-300">
              <div className="flex items-center">
                <TrophyIcon className={`size-8 text-gray-400"}`} />
                <span className="pl-0.5">
                  {calculateDailyStreak(data)} {/* Display the count */}
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm text-gray-300">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Top 3 Finishes
            </div>
          </CardFooter>
        </Card>
      </div>
      <Header text={"Daily Quest"}>
        <Button variant="link" className="uppercase">
          <ClockIcon />{hoursLeft} Hours
        </Button>
      </Header>
      <div className="grid grid-cols-1 gap-4">
        {/* ------------------------------------------------------------------------------ */}
        {/* --------------------------- User Daily Quests Card --------------------------- */}
        {/* ------------------------------------------------------------------------------ */}
        {userDailyQuests
          ?
          <Card className="@container/card bg-white gap-0 p-0">
            <CardHeader className="p-6 mb-0 gap-0">
              <CardTitle className="text-sm font-semibold tabular-nums @[250px]/card:text-3xl p-0">
                <div className="text-sm grid gap-4">
                  <div className="flex items-center gap-2 pb">
                    <CheckCircleIcon className="text-green-500" /> <span>Daily Quest Complete</span>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
              <div className="text-sm grid gap-4 py-8">
                <TreasureChestAnimationHalf />
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-1.5 text-sm w-full pb-8">
              <div className="line-clamp-1 flex justify-center w-full text-center gap-2 font-medium text-gray-500">
                <span>{questCompletionMessages[Math.floor(Math.random() * questCompletionMessages.length)]}</span>
              </div>
            </CardFooter>
          </Card>
          :
          <Card className="@container/card bg-white gap-0">
            <CardHeader className="mb-0 gap-0">
              <CardTitle className="text-sm font-semibold tabular-nums @[250px]/card:text-3xl">
                <div className="text-sm grid gap-4">
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm grid gap-4">
                <span>{quest.prompt}</span>
                <Progress value={3} />
                {/* <Button className="w-full">Claim {quest.xp_reward} Bonus XP Points</Button> */}
                <DailyQuest module={module} quest={quest} />
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-1.5 text-sm w-full">
            </CardFooter>
          </Card>
        }


      </div>
      <Header text={"Monthly Badges"}>
        {/* <Button variant="link" className="uppercase">
          see all
        </Button> */}
      </Header>
      <div className="grid grid-cols-3 gap-4">
        {userMonthlyBadges?.map((badge: any) => {
          const now = new Date();
          const badgeDate = new Date(badge.month);

          // How many months ahead (or behind) the badge is from now
          const yearDifference = now.getFullYear() == badgeDate.getFullYear()
          const monthDifference = badgeDate.getMonth() - now.getMonth();

          // Show current month and next two
          if (monthDifference >= -1 && monthDifference < 2 && yearDifference) {
            return (
              <Card key={badge.id} className="@container/card bg-white gap-0">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    <div className="flex justify-center">
                      {badge.earned_at ? (
                        <div
                          className="size-12 bg-center bg-no-repeat bg-contain filter"
                          style={{
                            backgroundImage: `url(/monthlybadges/svgs/badge.svg)`,
                          }}
                        />
                      ) : (
                        <LockClosedIcon className="size-12 text-gray-300" />
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                  <div className="line-clamp-1 flex justify-center w-full text-center gap-2 font-medium text-gray-300">
                    <span>{badge.name}</span>
                  </div>
                </CardFooter>
              </Card>
            );
          }

          return null;
        })}


      </div>

      <Header text={"Achievements"}>
        <Button variant="link" className="uppercase">
          {/* <ClockIcon />{hoursLeft} Hours */}
        </Button>
      </Header>
      <div className="grid grid-cols-3 gap-4">
        {userAchievements?.map((achievement, index: any) => {
          // const Icon = icons[achievement.icon as keyof typeof icons];
          return (
            <AlertDialog key={achievement.id}>
              <AlertDialogTrigger>
                <Card className="@container/card bg-white gap-0">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                      <div
                        className={`size-12 bg-center bg-no-repeat bg-contain filter ${achievement.earned_at ? "" : "grayscale"}`}
                        style={{
                          backgroundImage: `url(/achievements/svgs/colored/${achievement.icon}.svg)`,
                        }}
                      />
                      {/* <div className="flex justify-center">
                    <Image width={500} height={500} src={'/achievements/svgs/colored/' + achievement.icon + '.svg'} alt={''} className={`size-64 grayscale`} />
                  </div> */}
                    </CardTitle>
                  </CardHeader>
                  {/* <CardFooter className="flex-col items-start gap-1.5 text-sm">
                {achievement.description}
              </CardFooter> */}
                </Card>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    <Image width={500} height={500} src={'/achievements/svgs/colored/' + achievement.icon + '.svg'} alt={''} className={`w-full ${achievement.earned_at ? "" : "grayscale"}`} />
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {/* <Header link={false}>{achievement.name}</Header> */}
                    <span className="flex flex-col">
                      <span className="text-3xl">
                        {achievement.name}
                      </span>
                      <span>
                        {achievement.description}
                      </span>
                    </span>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Close</AlertDialogCancel>
                  {/* <AlertDialogAction>Continue</AlertDialogAction> */}
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          )
        }
        )
        }

      </div>
      <Header text={"My Entries"}>
      </Header>
      {
        modules.map((module: ModuleType, index: any) => {
          // Initialize count for each module
          let count = 0;

          // Loop over data and increment count for matching records
          data.forEach((record: any) => {
            if (record.table_name === module.supabase.table) {
              count += 1; // Increment count for matching record
            }
          });

          return (
            <Card className="@container/card" key={index}>
              <CardHeader>
                <CardDescription className="capitalize">{module.supabase.table.replace('_', ' ')}</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {count} {/* Display the count */}
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  Total {module.supabase.table.replace('_', ' ')} Created
                </div>
                <div className="text-muted-foreground">All time</div>
                <Button asChild>
                  <Link className="capitalize w-full mt-4" href={module.supabase.table.replace('_', '-')}>Add New {module.supabase.table.replace('_', ' ').replace(/s$/, '')}</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })
      }
    </div >
  );
}



function calculateDailyStreak(data: any) {
  const dateSet = new Set();

  // Convert all timestamps to date strings (YYYY-MM-DD) and store in a Set to remove duplicates
  data.forEach((entry: any) => {
    const dateStr = new Date(entry.created_at).toISOString().split('T')[0];
    dateSet.add(dateStr);
  });

  // Convert set to array and sort ascending
  const sortedDates = Array.from(dateSet).sort();

  // Convert to Date objects
  const dateObjects = sortedDates.map(dateStr => {
    if (typeof dateStr === 'string' || typeof dateStr === 'number' || dateStr instanceof Date) {
      return new Date(dateStr);
    }
    throw new Error('Invalid date value'); // or return null if you prefer
  });

  // Start from the latest date and count backwards
  let streak = 1;
  for (let i = dateObjects.length - 2; i >= 0; i--) {
    const current = dateObjects[i];
    const next = dateObjects[i + 1];

    const diffInTime = next.getTime() - current.getTime();
    const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

    if (diffInDays === 1) {
      streak++;
    } else if (diffInDays > 1) {
      break;
    }
  }

  return streak;
}

function isMoreThanOneDayOld(date: string | Date) {
  const entryDate = new Date(date)
  const now = new Date()

  // Normalize both dates to midnight (ignore time)
  entryDate.setHours(0, 0, 0, 0)
  now.setHours(0, 0, 0, 0)

  const diffInMs = now.getTime() - entryDate.getTime()
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24)

  console.log(diffInDays)

  return diffInDays > 1
}

function determineModule({
  modules,
  type,
}: {
  modules: ModuleType[];
  type: string;
}): ModuleType | undefined {
  return modules.find((module) => module.supabase.table === type);
}