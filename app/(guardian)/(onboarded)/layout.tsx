import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { OnboardedProvider } from '@/context/selected-child'
import { headers } from 'next/headers'
import { getMemoizedUser } from '@/utils/memoization/supabase/users/getMemoizedUser';

export default async function PrivatePage({ children }: { children: React.ReactNode }) {
    const headersList = await headers()
    const path = headersList.get('x-pathname') || '/'

    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()

    if (error || !data?.user) {
        redirect('/sign-in')
    }
    const user = await getMemoizedUser()

    const userId = data.user.id
    const { data: childrenData, error: childrenError } = await supabase
        .from('children')
        .select('*')
        .eq('user_id', userId)

    // Safety: redirect or render a fallback if no children
    if (!childrenData || childrenData.length === 0) {
        redirect('/onboarding') // or show modal/form here if client-side
    }

    return (
        <OnboardedProvider initialChildren={childrenData} user={user}>
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "calc(var(--spacing) * 72)",
                        "--header-height": "calc(var(--spacing) * 12)",
                    } as React.CSSProperties
                }
                defaultOpen={false}
                key={Math.random()}
            >
                <AppSidebar variant="inset" />
                <SidebarInset>
                    <SiteHeader />
                    <div className="flex flex-1 flex-col">
                        <div className="@container/main flex flex-1 flex-col gap-2">
                            <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:py-6">
                                {children}
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </OnboardedProvider>
    )
}
