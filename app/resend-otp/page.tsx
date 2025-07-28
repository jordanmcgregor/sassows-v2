// app/resend-otp/page.tsx
'use client';

import { useState, useRef, useEffect } from 'react'; // Import useEffect
import { useFormState, useFormStatus } from 'react-dom';
import { resendOtp, type ResendOtpState } from '@/app/actions'; // Adjust path and import type

// Helper component for the submit button
function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={pending}
        >
            {pending ? 'Sending...' : 'Resend Code'}
        </button>
    );
}

export default function ResendOtpPage() {
    // Use the imported type for the initial state
    const initialState: ResendOtpState = { error: null, success: null };

    // Pass the action and initial state to useFormState
    const [state, dispatch] = useFormState(resendOtp, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    // CORRECTED: Use useEffect for side effects triggered by state changes
    useEffect(() => {
        if (state.success) {
            // If successful, reset the form
            formRef.current?.reset();
        }
    }, [state]); // Dependency array: run this effect when 'state' changes

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold mb-4">Resend Confirmation Code</h1>

            {state.success && <p className="text-green-500 mb-4">{state.success}</p>}
            {state.error && <p className="text-red-500 mb-4">{state.error}</p>}

            <form action={dispatch} ref={formRef} className="w-full max-w-sm">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                        Email Address:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email" // Important: 'name' attribute matches formData.get("email")
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <SubmitButton />
            </form>
            <p className="mt-4 text-sm text-gray-600">
                If you didn't receive the email, please check your spam folder.
            </p>
        </div>
    );
}