import { createClient } from '@/utils/supabase/server';
import { TableSortedSegmentedAlphabet } from "@/components/guardian/table/sorted/alphabet";
import module from '@/components/guardian/modules/pronunciations/module'
import { modules } from '@/components/guardian/modules/all'
import { getMemoizedUser } from "@/utils/memoization/supabase/users/getMemoizedUser";
import { isModuleLocked } from "@/lib/plan";
import AboveFold from "@/components/guardian/modules/above-fold";


const title = 'Milestones'

export default async function Pronunciations() {
    const supabase = await createClient();
    const { data: records } = await supabase
        .from(module.supabase.table)
        .select(`*,media:media (id,media_url,media_type,filename)`
        );
    module.data.records = records || []

    return (
        <>
            <AboveFold module={module} />

            <TableSortedSegmentedAlphabet module={module} modules={modules} />
        </>
    )
}