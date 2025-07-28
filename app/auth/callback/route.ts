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
      // redirect user to specified redirect URL or root of app
      redirect(next)
    } else if (error?.code === 'otp_expired') {
      // If the token is expired, try to resend the OTP
      const { data: { user } } = await supabase.auth.getUser()

      if (user?.email) {
        const { error: resendError } = await supabase.auth.resend({
          type: 'signup', // or 'email' depending on your OTP type
          email: user.email,
        })

        if (resendError) {
          console.error('Error resending OTP:', resendError)
          // Redirect to an error page or show a message to the user
          redirect('/error?message=Failed to resend confirmation code.')
        } else {
          // Redirect to a page indicating that a new code has been sent
          redirect('/confirm?message=A new confirmation code has been sent to your email.')
        }
      } else {
        // If email is not available, redirect to a generic error
        redirect('/error?message=Could not resend confirmation code. User email not found.')
      }
    }
  }

  // redirect the user to an error page with some instructions
  redirect('/error')
}