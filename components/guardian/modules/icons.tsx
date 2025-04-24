import { ModuleType } from "@/types/modules/type"
import {
    IconBook,
    IconCamera,
    IconChartBar,
    IconClockHeart,
    IconDashboard,
    IconDatabase,
    IconFileAi,
    IconFileDescription,
    IconFileWord,
    IconFlower,
    IconFolder,
    IconHeart,
    IconHeartHandshake,
    IconHelp,
    IconHome,
    IconInnerShadowTop,
    IconListDetails,
    IconQuote,
    IconRepeat,
    IconReport,
    IconSchool,
    IconSearch,
    IconSettings,
    IconUsers,
} from "@tabler/icons-react"


export const componentMap = {
    IconQuote,
    IconHeart,
    IconSchool,
    IconClockHeart,
    IconBook,
    IconRepeat
}

export default function ModuleIcon({ module }: { module: ModuleType }) {
    const Component = componentMap[module?.view.records.icon as keyof typeof componentMap]
    return (
        <div className="size-12 flex justify-center items-center rounded-xl bg-primary-foreground">
            {
                Component ?
                    <Component className="text-primary" />
                    :
                    null
            }
        </div>
    )
}