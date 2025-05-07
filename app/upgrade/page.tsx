// 'use client'

import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { CheckCircleIcon, CheckIcon } from '@heroicons/react/20/solid'
import { cn } from '@/components/lib/utils'
import { useSearchParams } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createClient } from '@/utils/supabase/server'
import { Database } from '@/database.types'
import { cornersOfRectangle } from '@dnd-kit/core/dist/utilities/algorithms/helpers'

interface IndexPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}

const frequencies = [
    // { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
    { value: 'annually', label: 'Annually', priceSuffix: '/year' },
]

const tiers = [
    {
        name: 'Pro',
        id: 'tier-hobby',
        priceId: { monthly: 'price_1RIzeyAv0vFtosKXAvgvzhLq', annually: 'price_1RJfcfAv0vFtosKXFavtriPC' },
        price: { monthly: '$3.99', annually: '$47.88' },
        description: 'The essentials to provide your best work for clients.',
        features: ['5 products', 'Up to 1,000 subscribers', 'Basic analytics'],
        mostPopular: true,
    },
    {
        name: 'Premium',
        id: 'tier-freelancer',
        priceId: { monthly: 'price_1RIzg9Av0vFtosKXJHTigOlV', annually: 'price_1RJfdcAv0vFtosKXatzgPK3I' },
        price: { monthly: '$7.99', annually: '$95.88' },
        description: 'For growing teams building faster.',
        features: ['5 products', 'Up to 1,000 subscribers', 'Basic analytics', '48-hour support response time'],
        mostPopular: true,
    },
]


export default async function IndexPage() {
    // const [frequency, setFrequency] = useState(frequencies[1])
    const supabase = await createClient()

    const priceIds = [
        'price_1RJfcfAv0vFtosKXFavtriPC',
        'price_1RJfdcAv0vFtosKXatzgPK3I',
    ]

    const { data: prices, error } = await supabase
        .from('prices')
        .select(`
            id,
            unit_amount,
            interval,
            products(
                *,
                features:product_monthly_insert_limits(
                    table_name,
                    insert_limit
                )
            )
        `)
        .eq('livemode', process.env.NEXT_PUBLIC_ENVIRONMENT == 'production' ? true : false)
        .order('unit_amount', { ascending: true })
    // .in('id', priceIds);
    console.log(prices)
    console.log(error)
    // console.log((prices[0]?.products as any).features)

    // const searchParams = useSearchParams()
    // const canceled = searchParams.get('canceled')
    // if (canceled) {
    //     console.log('Order canceled -- continue to shop around and checkout when you’re ready.')
    // }
    // if (!true) {
    //     return (
    //         <div className="bg-background py-24 sm:py-32">
    //             <div className="mx-auto max-w-7xl px-6 lg:px-8">
    //                 <div className="mx-auto max-w-4xl text-center">
    //                     <h2 className="text-primary text-base font-semibold">Pricing</h2>
    //                     <p className="mt-2 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
    //                         Pricing that grows with you
    //                     </p>
    //                 </div>
    //                 <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-muted-foreground sm:text-xl">
    //                     Choose an affordable plan that’s packed with the best features for engaging your audience, creating customer
    //                     loyalty, and driving sales.
    //                 </p>

    //                 {/* Payment Frequency Switcher */}
    //                 <div className="mt-16 flex justify-center">
    //                     <RadioGroup
    //                         value={frequency.value}
    //                         onValueChange={(value) => {
    //                             const found = frequencies.find((f) => f.value === value)
    //                             if (found) setFrequency(found)
    //                         }}
    //                         className="inline-flex items-center justify-center gap-2 rounded-full border border-muted bg-muted p-1 text-sm font-medium"
    //                     >
    //                         {frequencies.map((option) => (
    //                             <RadioGroupItem
    //                                 key={option.value}
    //                                 value={option.value}
    //                                 className={cn(
    //                                     "cursor-pointer rounded-full px-4 py-2 transition",
    //                                     frequency.value === option.value
    //                                         ? 'bg-primary text-primary-foreground'
    //                                         : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
    //                                 )}
    //                             >
    //                                 {option.label}
    //                             </RadioGroupItem>
    //                         ))}
    //                     </RadioGroup>
    //                 </div>

    //                 {/* Pricing Tiers */}
    //                 <div className="mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:grid-cols-4">
    //                     {tiers.map((tier) => (
    //                         <form
    //                             key={tier.id}
    //                             action="/api/stripe/checkout-session/stripe-hosted/create"
    //                             method="POST"
    //                             className={cn(
    //                                 'flex flex-col rounded-3xl border p-8',
    //                                 tier.mostPopular ? 'border-primary shadow-md' : 'border-muted'
    //                             )}
    //                         >
    //                             {/* Hidden input for Stripe price ID */}
    //                             <input type="hidden" name="priceId" value={tier.priceId[frequency.value as keyof typeof tier.priceId]} />

    //                             <h3
    //                                 id={tier.id}
    //                                 className={cn(
    //                                     'text-lg font-semibold',
    //                                     tier.mostPopular ? 'text-primary' : 'text-foreground'
    //                                 )}
    //                             >
    //                                 {tier.name}
    //                             </h3>
    //                             <p className="mt-4 text-sm text-muted-foreground">{tier.description}</p>
    //                             <p className="mt-6 flex items-baseline gap-x-1">
    //                                 <span className="text-4xl font-bold text-foreground">
    //                                     {tier.price[frequency.value as keyof typeof tier.price]}
    //                                 </span>
    //                                 <span className="text-sm text-muted-foreground">{frequency.priceSuffix}</span>
    //                             </p>

    //                             <Button
    //                                 type="submit"
    //                                 variant={tier.mostPopular ? 'default' : 'outline'}
    //                                 className="mt-6 w-full"
    //                             >
    //                                 Buy plan
    //                             </Button>

    //                             <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
    //                                 {tier.features.map((feature) => (
    //                                     <li key={feature} className="flex items-center gap-x-2">
    //                                         <CheckIcon className="h-5 w-5 text-primary" aria-hidden="true" />
    //                                         {feature}
    //                                     </li>
    //                                 ))}
    //                             </ul>
    //                         </form>
    //                     ))}
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }
    // else {
    if (prices) {
        return (
            <div className="bg-background py-12 sm:py-12">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <Tabs defaultValue={prices[prices.length - 1].id} className="w-full">
                            <TabsList className='w-full'>
                                {prices.map((price) => (
                                    <TabsTrigger key={price.id} value={price.id}>{(price.products as any).name}</TabsTrigger>
                                ))}
                                {/* <TabsTrigger value="account">Pro</TabsTrigger>
                                <TabsTrigger value="password">Premium</TabsTrigger> */}
                            </TabsList>
                            {prices.map((price) => (
                                <TabsContent key={price.id} value={price.id}>
                                    <div className="lg:pt-0">
                                        <form
                                            action="/api/stripe/checkout-session/stripe-hosted/create"
                                            method="POST"
                                            className={cn(
                                                'flex flex-col rounded-3xl border p-8 border-muted',
                                                // tier.mostPopular ? 'border-primary shadow-md' : 'border-muted'
                                            )}
                                        >
                                            {/* Hidden input for Stripe price ID */}
                                            <input type="hidden" name="priceId" value={price.id} />

                                            <h3
                                                className={cn(
                                                    'text-lg font-semibold',
                                                    tiers[0].mostPopular ? 'text-primary' : 'text-foreground'
                                                )}
                                            >
                                                {(price.products as any).name}
                                            </h3>
                                            <p className="mt-4 text-sm text-muted-foreground">{(price.products as any).description}</p>
                                            <p className="mt-6 flex items-baseline gap-x-1">
                                                <span className="text-4xl font-bold text-foreground">
                                                    ${price.unit_amount / 100}
                                                </span>
                                                <span className="text-sm text-muted-foreground">/{price.interval}ly</span>
                                            </p>
                                            <span className="text-sm text-left text-muted-foreground">(${price.unit_amount / 1200} per month)</span>

                                            <Button
                                                type="submit"
                                                // variant={tier.mostPopular ? 'default' : 'outline'}
                                                className="mt-6 w-full"
                                            >
                                                Buy plan
                                            </Button>

                                            <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
                                                {(price.products as any).features.map((feature: any) => {
                                                    console.log(feature.table_name)
                                                    return (
                                                        <li key={feature.table_name} className="flex items-center gap-x-2">
                                                            <CheckIcon className="h-5 w-5 text-primary" aria-hidden="true" />
                                                            <span className='capitalize'><strong>{feature.insert_limit >= 100 ? 'Unlimited' : feature.insert_limit}</strong> {feature.table_name.replace("_", " ")} / month</span>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </form>
                                    </div>
                                </TabsContent>
                            ))}
                            {/* <TabsContent value="password">Change your password here.</TabsContent> */}
                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }
    // }
}
