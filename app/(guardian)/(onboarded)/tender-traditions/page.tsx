import { createClient } from '@/utils/supabase/server';
import module from '@/components/guardian/modules/tender-traditions/module'
import { modules } from '@/components/guardian/modules/all'
import { TableSortedSegmentedAlphabet } from '@/components/guardian/table/sorted/alphabet';
import { getMemoizedUser } from '@/utils/memoization/supabase/users/getMemoizedUser';
import { isModuleLocked } from '@/lib/plan';
import AboveFold from '@/components/guardian/modules/above-fold';

export default async function TenderTraditions() {
    const supabase = await createClient();
    const { data: records, error } = await supabase
        .from(module.supabase.table)
        .select(`
    *,
    media (
      id,
      media_url,
      media_type,
      filename
    )
  `);


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

            {/* <TableSortedSegmentedDate module={module} modules={modules} /> */}
            <TableSortedSegmentedAlphabet module={module} modules={modules} />
        </>
    )
}