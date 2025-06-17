import DeviceDetailDetection from '@/components/detection/operating-system-and-browser'
import PWACheck from '@/components/detection/pwa'
import NotificationApprovalByDevice from '@/components/notifications/notificationApprovalByDevice'


export default async function Notifications() {
    const { os, browser } = await DeviceDetailDetection()
    return (
        <>
            <NotificationApprovalByDevice os={os} browser={browser} />
            <PWACheck os={os} browser={browser} />
        </>
    )
}