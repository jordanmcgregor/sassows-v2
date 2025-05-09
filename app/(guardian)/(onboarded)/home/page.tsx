import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { createClient } from '@/utils/supabase/server';

import datum from "./data.json"
import { getMemoizedUser } from "@/utils/memoization/supabase/users/getMemoizedUser"
const title = 'Home'

export default async function Page() {
  const supabase = await createClient();
  const user = getMemoizedUser()
  const { data, error } = await supabase.from('my_entries_view').select();

  return (
    <>
      <SectionCards data={data} />
      {/* <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={datum} /> */}
    </>
  )
}
