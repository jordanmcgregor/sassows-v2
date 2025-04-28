import { stripe } from '@/lib/stripe'
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import type Stripe from 'stripe'

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature') as string
  const body = await req.text()

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error(`Webhook signature verification failed:`, err)
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.userId

    if (!userId) {
      console.error('No userId found in metadata')
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
    }

    const supabase = await createClient()

    await supabase.from('subscriptions')
      .update({
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: (session.subscription as string) || null,
        is_active: true,
        plan: 'pro', // or parse plan from metadata if you support multiple plans
        current_period_end: new Date((session.expires_at || 0) * 1000),
      })
      .eq('id', userId)

    console.log('Subscription successfully updated')
  }

  return NextResponse.json({ received: true })
}
