import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import type Stripe from 'stripe'

export async function POST(req: Request) {
    const sig = req.headers.get('stripe-signature') as string
    const body = await req.text()

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
    } catch (err) {
        console.error(`Webhook signature verification failed:`, err)
        return NextResponse.json({ error: 'Webhook Error' }, { status: 400 })
    }

    // ---------------------------------------------------------------------------------------
    // ---------------------------------- Checkout Sessions ----------------------------------
    // ---------------------------------------------------------------------------------------
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

    // ---------------------------------------------------------------------------------------
    // -------------------------------------- Products ---------------------------------------
    // ---------------------------------------------------------------------------------------
    if (event.type === 'product.created') {
        const product = event.data.object as Stripe.Product

        const { data: productInsert, error: productInsertError } = await supabase
            .from('products')
            .upsert({
                id: product.id,
                livemode: product.livemode,
                name: product.name,
                active: true,
                description: product.description
            })

        try {
            const { data: limitsDelete, error: limitsDeleteError } = await supabase
                .from('product_monthly_insert_limits')
                .delete()
                .eq('product_id', product.id)

            if (limitsDeleteError) {
                console.error('Supabase update error:', limitsDeleteError)
                return NextResponse.json({ limitsInsertError: 'DB update failed' }, { status: 500 })
            }
        } catch (error) {
            console.error('Supabase error:', error)
        }

        try {
            let inserts = []
            for (const key in product.metadata) {
                inserts.push({ table_name: key, insert_limit: product.metadata[key], product_id: product.id })
                // inserts.push({ table: key, limit: 1, product_id: product.id })
            }

            const { data: limitsInsert, error: limitsInsertError } = await supabase
                .from('product_monthly_insert_limits')
                .insert(inserts)

            if (limitsInsertError) {
                console.error('Supabase update error:', limitsInsertError)
                return NextResponse.json({ limitsInsertError: 'DB update failed' }, { status: 500 })
            }

        } catch (error) {
            console.error('Supabase error:', error)
        }

    }

    if (event.type === 'product.updated') {
        const product = event.data.object as Stripe.Product

        if (product.name == 'myproduct') {
            await stripe.products.del(product.id)
        }

        const { data: productInsert, error: productInsertError } = await supabase
            .from('products')
            .upsert({
                id: product.id,
                livemode: product.livemode,
                name: product.name,
                active: true,
                description: product.description
            })

        const { data: limitsDelete, error: limitsDeleteError } = await supabase
            .from('product_monthly_insert_limits')
            .delete()
            .eq('product_id', product.id)

        let inserts = []
        for (const key in product.metadata) {
            inserts.push({ table_name: key, insert_limit: product.metadata[key], product_id: product.id })
            // inserts.push({ table: key, limit: 1, product_id: product.id })
        }

        const { data: limitsInsert, error: limitsInsertError } = await supabase
            .from('product_monthly_insert_limits')
            .insert(inserts)

        if (limitsInsertError) {
            console.error('Supabase update error:', limitsInsertError)
            return NextResponse.json({ limitsInsertError: 'DB update failed' }, { status: 500 })
        }
    }

    // ---------------------------------------------------------------------------------------
    // --------------------------------------- Prices ----------------------------------------
    // ---------------------------------------------------------------------------------------
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
