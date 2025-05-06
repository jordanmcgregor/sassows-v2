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
