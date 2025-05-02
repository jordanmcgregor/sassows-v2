import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import type Stripe from 'stripe'

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature') as string
  const body = await req.text()

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_CHECKOUT_WEBHOOK_SECRET!)
  } catch (err) {
    console.error(`Webhook signature verification failed:`, err)
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.userId

    const sessionId = session.id;
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
      expand: ['data.price.product'],
    });

    const priceId = lineItems.data[0].price?.id

    const product = lineItems.data[0].price?.product;
    let productId: string | null
    if (typeof product === "object" && product !== null && "id" in product) {
      productId = product.id
    } else {
      productId = null
      console.log("Product is a string ID or deleted product:", product);
    }

    if (!userId) {
      console.error('No userId in session metadata.')
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
    }


    // const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
    //   expand: ['data.price.product'],
    // });
    // const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
    // for (const item of lineItems.data) {
    //   if (item.price && item.price.id) {
    //     const priceId = item.price.id;
    //     console.log('Price ID:', priceId);
    //   }
    // }
    // console.log(lineItems)

    // ⚠️ Use service role key here — not the anon/public client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { error } = await supabase
      .from('users')
      .update({
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: session.subscription as string,
        price_id: priceId,
        product_id: productId,
        current_period_end: new Date((session.expires_at || 0) * 1000),
      })
      .eq('id', userId)

    if (error) {
      console.error('Supabase update error:', error)
      return NextResponse.json({ error: 'DB update failed' }, { status: 500 })
    }

    console.log(`Subscription successfully updated for user: ${userId}`)
  }

  return NextResponse.json({ received: true }, { status: 200 })
}
