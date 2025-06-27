export async function sendSlackMessageViaApi(slack_channel: any, message: any) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/slack/send-message`, {
        method: 'POST',
        body: JSON.stringify({
            slack_channel: slack_channel,
            message: message,
        })
    })
}