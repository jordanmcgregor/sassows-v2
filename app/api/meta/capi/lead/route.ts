
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers';
// import { sendSlackMessageViaApi } from '@/app/actions/slack/send-message';
// import { PurchaseFacebookCapi } from '@/types/facebook/capi/purchase';
import { Lead } from '@/types/meta/capi/lead/type';
// import { sha256 } from 'js-sha256';

// https://graph.facebook.com/{API_VERSION}/{PIXEL_ID}/events?access_token={TOKEN}
const capi_base_endpoint = process.env.META_CAPI_ENDPOINT_BASE
const capi_api_version = process.env.META_CAPI_API_VERSION
const capi_pixel_id = process.env.NEXT_PUBLIC_META_PIXEL_ID
const capi_access_token = process.env.META_CAPI_ACCESS_TOKEN

const capi_endpoint = capi_base_endpoint + '/' + capi_api_version + '/' + capi_pixel_id + '/events?access_token=' + capi_access_token

export async function GET(request: NextRequest) {
    const eventId = request.nextUrl.searchParams.get('eventId')

    let fbc: any
    let fbp: any
    let capi_payload: Lead | null = null

    // Try catch 2
    // try {
    //     fbc = cookies().get('_fbc')
    // } catch (error) {
    //     sendSlackMessageViaApi(process.env.NEXT_PUBLIC_SLACK_ERROR_REPORTING_CHANNEL, `${process.env.NEXT_PUBLIC_BASE_URL + request.nextUrl.pathname} Try catch 2 ` + error as string)
    // }
    // // Try catch 3
    // try {
    //     fbp = cookies().get('_fbp')
    // } catch (error) {
    //     sendSlackMessageViaApi(process.env.NEXT_PUBLIC_SLACK_ERROR_REPORTING_CHANNEL, `${process.env.NEXT_PUBLIC_BASE_URL + request.nextUrl.pathname} Try catch 3 ` + error as string)
    // }
    // Try catch 4
    try {
        capi_payload = {
            data: [
                {
                    event_name: "Lead",
                    event_time: Math.floor(new Date().getTime() / 1000),
                    event_id: eventId,
                    action_source: "website",
                    event_source_url: "https://www.sassows.com",
                    user_data: {
                        // client_ip_address: request.headers.get('x-forwarded-for') ? request.headers.get('x-forwarded-for') : null,
                        client_user_agent: request.headers.get('user-agent') ? request.headers.get('user-agent') : null,
                        // fbc: fbc?.value ? fbc.value : null,
                        // fbp: fbp?.value ? fbp.value : null,
                        // em: [sha256(paymentIntent.customer.email)],
                        // ct: paymentIntent.customer.address.city ? [sha256(paymentIntent.customer.address.city)] : [],
                        // st: paymentIntent.customer.address.state ? [sha256(paymentIntent.customer.address.state)] : [],
                        // zp: paymentIntent.customer.address.postal_code ? [sha256(paymentIntent.customer.address.postal_code)] : [],
                        // country: paymentIntent.customer.address.country ? [sha256(paymentIntent.customer.address.country)] : [],
                        // external_id: paymentIntent.customer.email ? [sha256(paymentIntent.customer.email)] : []
                    },
                    // custom_data: {
                    //     currency: "USD",
                    //     value: paymentIntent.amount / 100
                    // }
                }
            ]
        }
    } catch (error) {
        console.log(error)
        // sendSlackMessageViaApi(process.env.NEXT_PUBLIC_SLACK_ERROR_REPORTING_CHANNEL, `${process.env.NEXT_PUBLIC_BASE_URL + request.nextUrl.pathname} Try catch 4  ` + error as string)
    }
    // Try catch 5
    try {
        const capi_response = await fetch(capi_endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(capi_payload)
        })
        return NextResponse.json(capi_payload)
    } catch (error) {
        console.log(error)
        // sendSlackMessageViaApi(process.env.NEXT_PUBLIC_SLACK_ERROR_REPORTING_CHANNEL, `${process.env.NEXT_PUBLIC_BASE_URL + request.nextUrl.pathname} Try catch 5  ` + error as string)
        return NextResponse.json({ msg: 'Error' })
    }
}
