'use client'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from 'next/navigation'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronsUpDown } from "lucide-react"
import { useChild } from "@/context/selected-child"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useState } from 'react'

export function SiteHeader() {
  const endpoint = usePathname()
  const context = useChild()
  const [open, setOpen] = useState(false)

  let title: string = ''
  if (endpoint == "/milestones") {
    title = "Milestones"
  }
  if (endpoint == "/home") {
    title = "Dashboard"
  }
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
        <div className="ml-auto flex items-center gap-2">
          <Avatar>
            <AvatarFallback>{context.selectedChild.name[0]}</AvatarFallback>
          </Avatar>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronsUpDown className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <RadioGroup
                onValueChange={(value) => {
                  const selected = context.allChildren.find(child => child.id === value)
                  if (selected) {
                    context.setSelectedChild(selected)
                    setOpen(false)
                  }
                }}
                defaultValue={context.selectedChild.id}
              >
                {context.allChildren.map((child) => (
                  <div key={child.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={child.id} id={child.id} />
                    <Label htmlFor={child.id}>{child.name}</Label>
                  </div>
                ))}
              </RadioGroup>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  )
}
