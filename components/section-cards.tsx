import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// import { createClient } from '@/utils/supabase/server';

import { modules } from '@/components/guardian/modules/all'
import { ModuleType } from "@/types/modules/type"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function SectionCards({ data }: { data: any }) {
  // const supabase = await createClient();
  // const { data: entries, error } = await supabase.from('my_entries_view').select()
  // const data = entries || []
  // console.log(data)

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="capitalize">Journaling Streak</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {calculateDailyStreak(data)} {/* Display the count */}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Days in a row
          </div>
          {/* <div className="text-muted-foreground">All time</div> */}
          <Button asChild>
            {/* <Link className="capitalize w-full mt-4" href={module.supabase.table.replace('_', '-')}>Add New {module.supabase.table.replace('_', ' ').replace(/s$/, '')}</Link> */}
          </Button>
        </CardFooter>
      </Card>
      {modules.map((module: ModuleType, index: any) => {
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
      })}
    </div>
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
