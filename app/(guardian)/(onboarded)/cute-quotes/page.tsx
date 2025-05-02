import { createClient } from '@/utils/supabase/server';
import { TableSortedSegmentedDate } from "@/components/guardian/table/sorted/date";
import module from '@/components/guardian/modules/cute-quotes/module'
import { modules } from '@/components/guardian/modules/all'
import AboveFold from '@/components/guardian/modules/above-fold';

// const module = JSON.parse(JSON.stringify(milestones));

const title = 'Cute Quotes'

export default async function CuteQuotes() {
    const supabase = await createClient();
    const { data: records } = await supabase
        .from(module.supabase.table)
        .select(`
            *,
            media:media (id,media_url,media_type,filename)
            `
        );

    // Make sure we're not modifying an undefined property
    if (module && !module.data) {
        module.data = { records: [] };
    }

    // Then safely assign records
    if (module && module.data) {
        module.data.records = records || [];
    }

    return (
        <>
            <AboveFold module={module} />
            <TableSortedSegmentedDate module={module} modules={modules} />
        </>
    )
}