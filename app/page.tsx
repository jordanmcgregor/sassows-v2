import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "@/app/(auth-pages)/smtp-message";

import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"
import { IconFlower } from "@tabler/icons-react"
import { SignupForm } from "@/components/signup-form"
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export default async function Signup(props: {
  searchParams: Promise<Message>
}) {
  // const headersList = await headers();
  // const host = headersList.get('host') || '';
  // const protocol = headersList.get('x-forwarded-proto') || 'http';
  // const baseUrl = `${protocol}://${host}`;

  const searchParams = await props.searchParams;
  if ("success" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }
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
            <SignupForm />
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

// export default async function Signup(props: {
//   searchParams: Promise<Message>;
// }) {
//   const searchParams = await props.searchParams;
//   if ("message" in searchParams) {
//     return (
//       <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
//         <FormMessage message={searchParams} />
//       </div>
//     );
//   }

//   return (
//     <>
//       <form className="flex flex-col min-w-64 max-w-64 mx-auto">
//         <h1 className="text-2xl font-medium">Sign up</h1>
//         <p className="text-sm text text-foreground">
//           Already have an account?{" "}
//           <Link className="text-primary font-medium underline" href="/sign-in">
//             Sign in
//           </Link>
//         </p>
//         <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
//           <Label htmlFor="email">Email</Label>
//           <Input name="email" placeholder="you@example.com" required />
//           <Label htmlFor="password">Password</Label>
//           <Input
//             type="password"
//             name="password"
//             placeholder="Your password"
//             minLength={6}
//             required
//           />
//           <SubmitButton formAction={signUpAction} pendingText="Signing up...">
//             Sign up
//           </SubmitButton>
//           <FormMessage message={searchParams} />
//         </div>
//       </form>
//       <SmtpMessage />
//     </>
//   );
// }
