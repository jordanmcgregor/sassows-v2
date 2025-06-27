export type Lead = {
    data: [
        {
            event_name: "Lead",
            event_time: number,
            action_source: "website",
            event_source_url: "https://www.sassows.com"
            event_id: string | null
            user_data: {
                client_user_agent: string | null
            },
        }
    ]
}