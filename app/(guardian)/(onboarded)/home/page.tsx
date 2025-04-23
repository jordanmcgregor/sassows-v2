import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { createClient } from '@/utils/supabase/server';

import data from "./data.json"
const title = 'Home'

export default async function Page() {
  const supabase = await createClient();
  const { data: entries } = await supabase
    .from("milestones")
    .select(`*,media:media (id,media_url,media_type,filename)`
    );

  return (
    <>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </>
  )
}
