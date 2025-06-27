import { NextRequest } from "next/server";

// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
const { WebClient, LogLevel } = require("@slack/web-api");

// WebClient instantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
const client = new WebClient(process.env.SLACK_TOKEN, {
    // LogLevel can be imported and used to make debugging simpler
    // logLevel: LogLevel.DEBUG
});

// Post a message to a channel your app is in using ID and message text
export async function POST(request: NextRequest) {
    const data = await request.json()
    const channel_id = data.slack_channel
    const message = data.message
    try {
        // Call the chat.postMessage method using the built-in WebClient
        const result = await client.chat.postMessage({
            // The token you used to initialize your app
            token: process.env.SLACK_TOKEN,
            channel: channel_id,
            text: message
            // You could also use a blocks[] array to send richer content
        });

        // Print result, which includes information about the message (like TS)
        return new Response(JSON.stringify({ success: 200 }));
    }
    catch (error) {
        console.error(error);
    }
}