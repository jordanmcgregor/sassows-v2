import DeviceDetailDetection from '@/components/detection/operating-system-and-browser'
import NotificationApprovalByDevice from '@/components/notifications/notificationApprovalByDevice'


export default async function Notifications() {
    const { os, browser } = await DeviceDetailDetection()
    return (
        <NotificationApprovalByDevice os={os} browser={browser} />
    )
}