import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import type Stripe from 'stripe'

export async function POST(req: Request) {
    const sig = req.headers.get('stripe-signature') as string
    const body = await req.text()

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_PRODUCT_WEBHOOK_SECRET!)
    } catch (err) {
        console.error(`Webhook signature verification failed:`, err)
        return NextResponse.json({ error: 'Webhook Error' }, { status: 400 })
    }

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

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