import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();

  if (code) {
    try {
      const supabase = await createClient();

      // Exchange the code for a session
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

      if (exchangeError) {
        console.error('Error exchanging code for session:', exchangeError);
        return NextResponse.redirect(`${origin}/error`);
      }

      // Only try to get user info if the exchange was successful
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError) {
        console.error('Error fetching user after code exchange:', userError);
        return NextResponse.redirect(`${origin}/error`);
      }

      console.log('Authenticated user:', user);
    } catch (error) {
      console.error('Unexpected error during authentication:', error);
      return NextResponse.redirect(`${origin}/error`);
    }
  }

  // Determine where to redirect the user
  if (redirectTo) {
    return NextResponse.redirect(`${origin}${redirectTo}`);
  }

  // URL to redirect to after sign up process completes
  return NextResponse.redirect(`${origin}/home`);
}



// export async function GET(request: Request) {
//   // The `/auth/callback` route is required for the server-side auth flow implemented
//   // by the SSR package. It exchanges an auth code for the user's session.
//   // https://supabase.com/docs/guides/auth/server-side/nextjs
//   const requestUrl = new URL(request.url);
//   const code = requestUrl.searchParams.get("code");
//   const origin = requestUrl.origin;
//   const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();

//   if (code) {
//     // const supabase = await createClient();
//     // await supabase.auth.exchangeCodeForSession(code);

//     const supabase = await createClient();
//     await supabase.auth.exchangeCodeForSession(code);

//     // 🛠 Fetch user after exchanging code
//     const { data: { user }, error } = await supabase.auth.getUser();
//     console.log(user)
//     console.log("")

//     if (error || !user) {
//       console.error('Error fetching user after code exchange:', error);
//       return NextResponse.redirect(`${origin}/error`);
//     }
//   }

//   console.log(redirectTo)
//   console.log("")
//   if (redirectTo) {
//     return NextResponse.redirect(`${origin}${redirectTo}`);
//   }

//   // URL to redirect to after sign up process completes
//   return NextResponse.redirect(`${origin}/home`);
// }

// import { createClient } from "@/utils/supabase/server";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   // The `/auth/callback` route is required for the server-side auth flow implemented
//   // by the SSR package. It exchanges an auth code for the user's session.
//   // https://supabase.com/docs/guides/auth/server-side/nextjs
//   const requestUrl = new URL(request.url);
//   const code = requestUrl.searchParams.get("code");
//   const origin = requestUrl.origin;
//   const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();

//   if (code) {
//     const supabase = await createClient();
//     await supabase.auth.exchangeCodeForSession(code);

//     // 🛠 Fetch user after exchanging code
//     const { data: { user }, error } = await supabase.auth.getUser();

//     if (error || !user) {
//       console.error('Error fetching user after code exchange:', error);
//       return NextResponse.redirect(`${origin}/error`);
//     }

//     // 🛠 Insert empty subscription record for the new user
//     await supabase.from('subscriptions').insert({
//       is_active: false,   // Subscription is inactive initially
//       created_at: new Date(),
//       updated_at: new Date(),
//     });
//   }

//   if (redirectTo) {
//     return NextResponse.redirect(`${origin}${redirectTo}`);
//   }

//   // Default redirect
//   return NextResponse.redirect(`${origin}/home`);
// }

