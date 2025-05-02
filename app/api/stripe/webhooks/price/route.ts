import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import type Stripe from 'stripe'

export async function POST(req: Request) {
    const sig = req.headers.get('stripe-signature') as string
    const body = await req.text()

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_PRICE_WEBHOOK_SECRET!)
    } catch (err) {
        console.error(`Webhook signature verification failed:`, err)
        return NextResponse.json({ error: 'Webhook Error' }, { status: 400 })
    }

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    if (event.type === 'price.created') {
        const price = event.data.object as Stripe.Price

        const { data: priceInsert, error: priceInsertError } = await supabase
            .from('prices')
            .upsert({
                id: price.id,
                livemode: price.livemode,
                product_id: price.product,
                active: price.active,
                unit_amount: price.unit_amount ? price.unit_amount : null,
                interval: price.recurring ? price.recurring.interval : null
            })
    }

    if (event.type === 'price.updated') {
        const price = event.data.object as Stripe.Price

        const { data: priceUpdate, error: priceUpdateError } = await supabase
            .from('prices')
            .upsert({
                id: price.id,
                livemode: price.livemode,
                product_id: price.product,
                active: price.active,
                unit_amount: price.unit_amount ? price.unit_amount : null,
                interval: price.recurring ? price.recurring.interval : null
            })
    }

    return NextResponse.json({ received: true }, { status: 200 })
}



async function deleteMyProductProducts() {
    const products = await stripe.products.list({ limit: 100 })

    for (const product of products.data) {
        if (product.name == "myproduct") {
            try {
                const prices = await stripe.prices.list({ product: product.id, limit: 100 })

                for (const price of prices.data) {
                    try {
                        await stripe.prices.update(price.id, { active: false })
                        console.log(`Deactivated price: ${price.id}`)
                    } catch (err) {
                        console.error(`Failed to deactivate price ${price.id}:`, err)
                    }
                }
                try {
                    await stripe.products.del(product.id)
                    console.log(`Deleted product: ${product.id}`)
                }
                catch (error) {
                    await stripe.products.update(product.id, { active: false })
                    console.log(`Archived product: ${product.id}`)
                }
            } catch (err) {
                console.error(`Failed to delete or archive product ${product.id}:`, err)
            }
        }
    }
}