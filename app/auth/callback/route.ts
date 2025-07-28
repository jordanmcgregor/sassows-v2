import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'

  if (token_hash && type) {
    const supabase = await createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    console.log(error)
    if (!error) {
      // If verification is successful, redirect the user
      redirect(next)
    } else if (error?.code === 'otp_expired') {
      // If the token is expired or invalid, we can't get the user from the session.
      // Redirect to a page that prompts the user for their email to resend.
      redirect('/resend-otp?expired=true') // A new route for resending
    } else {
      // Handle other verification errors (e.g., "User not found", "Invalid token")
      console.error('OTP verification error:', error)
      redirect(`/error?message=${encodeURIComponent(error?.message || 'OTP verification failed.')}`)
    }
  }

  // redirect the user to an error page with some instructions
  redirect('/error')
}