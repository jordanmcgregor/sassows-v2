import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { StripeCheckoutSession } from '@stripe/stripe-js'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: NextRequest) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()
    const supabaseData = data
    console.log(supabaseData.user?.id)

    try {
        const contentType = request.headers.get('content-type')

        let data: Record<string, string> = {}

        if (contentType && contentType.includes('application/x-www-form-urlencoded')) {
            const urlEncodedData = await request.text()
            data = Object.fromEntries(new URLSearchParams(urlEncodedData))
        } else {
            data = await request.json()
        }
        const priceId = data.priceId // Now this should work if priceId is sent in the form or JSON

        const headersList = await headers()
        const origin = headersList.get('origin')

        // Create Checkout Sessions from body params.

        const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/?canceled=true`,
            automatic_tax: { enabled: true },
            metadata: {
                userId: supabaseData.user ? supabaseData.user.id : null
            }
        })
        return NextResponse.redirect(session.url as string, 303)
    } catch (error: unknown) {
        if (error instanceof stripe.errors.StripeError) {
            return NextResponse.json(
                { error: error.message },
                { status: error.statusCode || 500 }
            )
        }
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}