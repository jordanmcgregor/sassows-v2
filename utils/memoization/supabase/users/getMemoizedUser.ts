import { createClient } from '@/utils/supabase/server';
import { memoize } from '@/utils/memoization/memoizer';

export async function getMemoizedUser() {
    return memoize('users', async () => {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('users')
            .select('product_id')
            .single()

        if (error) {
            throw new Error(`Failed to fetch users: ${error.message}`);
        }

        return data;
    });
}
