import { useEffect } from "react";
import { createClient } from '@/utils/supabase/client';
import { User } from "@/context/selected-child";

export default function UpdateTimezone({ user }: { user: User }) {
    useEffect(() => {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        async function updateSupabaseTimezone() {
            if (user?.timezone != timezone) {
                const supabase = await createClient();
                const { data: recordData, error: recordError } = await supabase
                    .from('users')
                    .update({ timezone: timezone })  // You must include user id to update existing user
                    .eq('user_id', user?.user_id)
                    .select();
                if (recordError) {
                    // handle error
                    console.error('Error updating timezone:', recordError);
                }
            }
        }
        updateSupabaseTimezone()
    }, [])
    return null
}
