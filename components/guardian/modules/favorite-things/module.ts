import { ModuleType } from '@/types/modules/type';
import { z, ZodTypeAny } from "zod"

let module: ModuleType = {
    metadata: {},
    name: 'favorite_item_name',
    view: {
        records: {
            primary: "favorite_item_name",
               icon: "IconHeart"
        }
    },
    header: {
        headline: "Favorite Things & Treasured Toys",
        description: "Capture the heart-melting memories of your little one's favorite objects—from beloved bears to must-watch movies. These items hold big feelings and even bigger stories."
    },
    flyout: {
        record: {
            create: {
                headline: "A Favorite Thing to Remember",
                description: "Describe the cherished object or obsession your little one adored. Most of these are optional, but every detail helps paint the perfect memory you’ll want to revisit again and again.",
                show: true,
                form: {
                    fields: [
                        {
                            label: {
                                title: "What was the favorite thing?",
                            },
                            input: {
                                name: "favorite_item_name",
                                type: "text",
                                required: true,
                                placeholder: "What was it? A fluffy teddy, a blue scooter, a sparkly dress, or a movie they watched 100 times?",
                            },
                        },
                        {
                            label: {
                                title: "Why did they love it so much?",
                            },
                            input: {
                                name: "reason_for_love",
                                type: "textarea",
                                required: false,
                                placeholder: "Did it make them feel safe, happy, brave, or grown-up? Share what made it magical.",
                            },
                        },
                        {
                            label: {
                                title: "How did they use it or play with it?",
                            },
                            input: {
                                name: "how_they_used_it",
                                type: "textarea",
                                required: false,
                                placeholder: "Did it go everywhere with them? Did they sleep with it? Pretend it had superpowers?",
                            },
                        },
                        {
                            label: {
                                title: "Where did they keep it or take it?",
                            },
                            input: {
                                name: "where_it_went",
                                type: "textarea",
                                required: false,
                                placeholder: "Was it always under their arm? In their backpack? Did it travel across state lines or down the hall?",
                            },
                        },
                        {
                            label: {
                                title: "What did they call it?",
                            },
                            input: {
                                name: "nickname_or_name",
                                type: "text",
                                required: false,
                                placeholder: "Did it have a name? Something silly or sweet? Even a funny mispronunciation?",
                            },
                        },
                        {
                            label: {
                                title: "When did their love for it begin?",
                            },
                            input: {
                                name: "love_started_at",
                                type: "textarea",
                                required: false,
                                placeholder: "Was it a gift? A found treasure? Something they spotted in a store or borrowed from a sibling?",
                            },
                        },
                        {
                            label: {
                                title: "Did it ever get lost, torn, or replaced?",
                            },
                            input: {
                                name: "notable_events_or_changes",
                                type: "textarea",
                                required: false,
                                placeholder: "Was there a dramatic rescue? A heartfelt replacement? A story of tape, glue, or stitches?",
                            },
                        },
                        {
                            label: {
                                title: "What moment with it stands out most?",
                            },
                            input: {
                                name: "favorite_memory_with_item",
                                type: "textarea",
                                required: false,
                                placeholder: "Describe one magical or hilarious memory tied to this favorite thing. Set the scene with love.",
                            },
                        },
                        {
                            label: {
                                title: "Do you still have it today?",
                            },
                            input: {
                                name: "still_have_it",
                                type: "text",
                                required: false,
                                placeholder: "Yes, tucked in a keepsake box. No, lost to time. Kind of—we have photos or memories that still sparkle.",
                            },
                        },
                        {
                            label: {
                                title: "Videos or Images"
                            },
                            input: {
                                name: "files",
                                type: "files",
                                required: false,
                                placeholder: ""
                            }
                        },
                    ]
                }
            },
            view: {
                show: true,
                title: "Something I Loved So Much!",
                description: "This wasn’t just a toy or thing—it was *everything* for a while. Here’s the story behind one of their earliest loves."
            }
        }
    },
    supabase: {
        table: 'favorite_things',
        foreign_key: "favorite_item_name",
    },
    data: {
        records: [] as any[],
    },
    layout: {
        table: 'sortedSegmentedDate',
    }
}

export default module;
