"use client"

import { IconCirclePlusFilled, IconMail, type Icon, IconHome } from "@tabler/icons-react"
import { usePathname } from "next/navigation"
import { ModuleType } from '@/types/modules/type';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { cn } from "@/components/lib/utils"
import { useUser } from "@/context/selected-child"
import { LockIcon } from "lucide-react"
import ModuleIcon from "@/components/guardian/modules/icons";
import { isModuleLocked } from "@/lib/plan"; // adjust path as needed
import { modules } from "@/components/guardian/modules/all"
import { componentMap } from "@/components/guardian/modules/icons";

export function NavMain() {
  const pathname = usePathname()
  const user = useUser()


  // console.log(modules)

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem >
            <SidebarMenuButton tooltip={"Home"} className={cn()}>
              <IconHome />
              <Link href={"/home"} className="w-full">
                <span>Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {modules.map((module: any) => {
            const Component = componentMap[module?.view.records.icon as keyof typeof componentMap]
            return (
              <SidebarMenuItem key={module.title}>
                <SidebarMenuButton tooltip={module.title} className={cn(module.url == pathname ? 'bg-primary text-secondary' : null)}>
                  {module.icon && <Component className="" />}
                  <Link href={module.url} className="w-full">
                    <span>{module.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
