import { createClient } from '@/utils/supabase/server';
import { memoize } from '@/utils/memoization/memoizer';
import { User } from '@/context/selected-child';

export async function getMemoizedUser() {
    return memoize('users', async () => {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('users')
            .select(`products (
                    id,
                    name
                    )`)
            .single()

        if (error) {
            throw new Error(`Failed to fetch users: ${error.message}`);
        }

        console.log(data)

        return data;
    });
}
