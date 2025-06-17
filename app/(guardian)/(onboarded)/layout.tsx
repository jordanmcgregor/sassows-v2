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
import Subscriptions from '@/components/guardian/realtime/subscriptions'
import PWACheck from '@/components/detection/pwa'
import deviceDetailDetection from '@/components/detection/operating-system-and-browser'
import UpdateTimezone from '@/components/detection/timezone'

export default async function PrivatePage({ children }: { children: React.ReactNode }) {
    const headersList = await headers()
    const path = headersList.get('x-pathname') || '/'
    const { os, browser } = await deviceDetailDetection()

    const supabase = await createClient()
    // const { data: authUser, error: authUserError } = await supabase.auth.getUser()

    const { data: publicUser, error: publicUserError } = await supabase
        .from('users')
        .select(`timezone,id,onboarded,pwa,fcm_token,products(id,name),children(id,name)`)
        .single()

    console.log(publicUser)

    if (publicUserError || !publicUser?.id) {
        redirect('/sign-in')
    }

    // Safety: redirect or render a fallback if no children
    if (!publicUser?.children || publicUser?.children.length === 0) {
        redirect('/onboarding/add-children') // or show modal/form here if client-side
    }

    if (!publicUser?.pwa) {
        redirect('/onboarding/download-app') // or show modal/form here if client-side
    }

    if (!publicUser?.fcm_token) {
        redirect('/onbaording/notifications')
    }

    return (
        <OnboardedProvider initialChildren={publicUser.children} user={publicUser}>
            <Subscriptions />
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
                    <PWACheck os={os} browser={browser} />
                    <UpdateTimezone user={publicUser} />
                </SidebarInset>
            </SidebarProvider>
        </OnboardedProvider>
    )
}
