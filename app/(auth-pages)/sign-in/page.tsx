import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { GalleryVerticalEnd } from "lucide-react"

import { signInAction } from "@/app/actions";
import { LoginForm } from "@/components/login-form"
import { IconFlower } from "@tabler/icons-react"

export default async function LoginPage(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
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
        <FormMessage message={searchParams} />
      </div>
      <div className="bg-muted relative hidden lg:block">
        <div className="absolute inset-0 h-full w-full bg-primary">
        </div>
      </div>
    </div>
  )
}


// export default async function Login(props: { searchParams: Promise<Message> }) {
//   const searchParams = await props.searchParams;
//   return (
//     <form className="flex-1 flex flex-col min-w-64">
//       <h1 className="text-2xl font-medium">Sign in</h1>
//       <p className="text-sm text-foreground">
//         Don't have an account?{" "}
//         <Link className="text-foreground font-medium underline" href="/sign-up">
//           Sign up
//         </Link>
//       </p>
//       <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
//         <Label htmlFor="email">Email</Label>
//         <Input name="email" placeholder="you@example.com" required />
//         <div className="flex justify-between items-center">
//           <Label htmlFor="password">Password</Label>
//           <Link
//             className="text-xs text-foreground underline"
//             href="/forgot-password"
//           >
//             Forgot Password?
//           </Link>
//         </div>
//         <Input
//           type="password"
//           name="password"
//           placeholder="Your password"
//           required
//         />
//         <SubmitButton pendingText="Signing In..." formAction={signInAction}>
//           Sign in
//         </SubmitButton>
//         <FormMessage message={searchParams} />
//       </div>
//     </form>
//   );
// }


