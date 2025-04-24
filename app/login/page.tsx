import { GalleryVerticalEnd } from "lucide-react"

import { signInAction } from "@/app/actions";
import { LoginForm } from "@/components/login-form"
import { IconFlower } from "@tabler/icons-react"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <IconFlower className="size-4" />
            </div>
            Sassows
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <div className="absolute inset-0 h-full w-full bg-primary">
        </div>
      </div>
    </div>
  )
}
