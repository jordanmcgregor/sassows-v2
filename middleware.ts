import { NextResponse, type NextRequest } from "next/server";
import { updateSession, createMiddlewareSupabaseClient } from "@/utils/supabase/middleware";
import deviceDetailDetection from "@/components/detection/operating-system-and-browser";




export async function middleware(request: NextRequest) {
  // const { pathname } = request.nextUrl

  // if (pathname.includes("/home")) {
  //   const { os, browser } = await deviceDetailDetection()
  //   const mobile = (os == 'iOS' || os == 'Android')
  //   const supabase = await createMiddlewareSupabaseClient(request)
  //   // const { data: authUser, error: authUserError } = await supabase.auth.getUser()

  //   const { data: publicUser, error: publicUserError } = await supabase
  //     .from('users')
  //     .select(`pwa,
  //           user_id,
  //           fcm_token,
  //           onboarded
  //     `)
  //     .single()
  //   console.log(publicUserError)

  //   if (!publicUser?.pwa && mobile) {
  //     return NextResponse.redirect(
  //       new URL(`onboarding/`, request.nextUrl)
  //     )
  //   }
  //   if (!publicUser?.fcm_token && mobile) {
  //     return NextResponse.redirect(
  //       new URL(`onboarding/notifications/`, request.nextUrl)
  //     )
  //   }
  //   // return; // Skip session update for onboarding
  //   return await updateSession(request);
  // }
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
