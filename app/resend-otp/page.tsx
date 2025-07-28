// app/resend-otp/page.tsx (Example - adjust based on your Next.js structure)
'use client' // If this is a client component

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client' // Use client-side Supabase client

export default function ResendOtpPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setError('')

    if (!email) {
      setError('Please enter your email address.')
      return
    }

    const { error: resendError } = await supabase.auth.resend({
      type: 'signup', // Or 'email', depending on the original OTP purpose
      email: email,
    })

    if (resendError) {
      console.error('Error resending OTP:', resendError)
      setError(`Failed to resend confirmation code: ${resendError.message}`)
    } else {
      setMessage('A new confirmation code has been sent to your email. Please check your inbox.')
      setEmail('') // Clear the email input
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Resend Confirmation Code</h1>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email Address:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Resend Code
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        If you didn't receive the email, please check your spam folder.
      </p>
    </div>
  )
}