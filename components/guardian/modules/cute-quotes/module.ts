import { ModuleType } from '@/types/modules/type';
import { filesPlan } from '@/lib/plan';

let feature: ModuleType = {
    metadata: {},
    name: 'quote_text',
    view: {
        records: {
            primary: "quote_text",
            icon: "IconQuote",
        }
    },
    header: {
        headline: "Most Adorable Quotes",
        description: "Capture the precious, funny, and heartwarming things your little one says as they start to find their voice. These little gems will make you smile forever!",
        dialog: {
            title: "What is a cute quote?",
            description: "A cute quote is one of those sweet, funny, or endearing things your little one says that fills your heart with joy. It’s the way they mispronounce words, the random thoughts they share, or the funny observations they make as they begin to understand the world around them. These tiny moments capture their personality and offer a glimpse into the adorable ways they see the world. From the unexpected to the downright hilarious, these quotes are the gems that remind you how precious and fleeting these early years are. It’s the words that make you smile, laugh, and cherish every moment."
        }
    },
    flyout: {
        record: {
            create: {
                headline: "New Milestone Moment",
                description: "Describe the sweet memory you never want to forget. Most of these are optional, but the more you share, the more you’ll cherish later. The little details today will be treasures tomorrow.",
                show: true,
                form: {
                    fields: [
                        {
                            label: {
                                title: "What exactly did they say?",
                            },
                            input: {
                                name: "quote_text",
                                type: "textarea",
                                required: true,
                                placeholder: "e.g., 'The moon is following me home!' - try to write it exactly how they said it, even if it’s silly or mispronounced!",
                            },
                        },
                        {
                            label: {
                                title: "When did they say it",
                            },
                            input: {
                                name: "date",
                                type: "date",
                                required: true,
                                placeholder: "",
                            },
                        },
                        {
                            label: {
                                title: "What was your initial reaction?",
                            },
                            input: {
                                name: "parent_reaction",
                                type: "textarea",
                                required: false,
                                placeholder: "Did you laugh? Tear up? Freeze from cuteness overload? Capture your raw response here.",
                            },
                        },
                        {
                            label: {
                                title: "Where were you when it happened?",
                            },
                            input: {
                                name: "location",
                                type: "textarea",
                                required: false,
                                placeholder: "At the dinner table? In the car? Walking through Target? Set the scene.",
                            },
                        },
                        {
                            label: {
                                title: "What were you doing right before it happened?",
                            },
                            input: {
                                name: "prior_activity",
                                type: "textarea",
                                required: false,
                                placeholder: "Were you cleaning, snuggling, or brushing teeth? This helps paint the picture.",
                            },
                        },
                        {
                            label: {
                                title: "Who else was around?",
                            },
                            input: {
                                name: "present_people",
                                type: "textarea",
                                required: false,
                                placeholder: "Name anyone nearby—siblings, grandparents, pets, even a crowd of strangers.",
                            },
                        },
                        {
                            label: {
                                title: "What sparked or triggered them to say what they did?",
                            },
                            input: {
                                name: "quote_trigger",
                                type: "textarea",
                                required: false,
                                placeholder: "Was it something someone said, a sound, a funny moment, or something they were looking at? What lit the spark that made them blurt this out?",
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
                                placeholder: "",
                                plan: filesPlan
                            }
                        },
                    ]
                }
            },
            view: {
                show: true,
                title: "Guess What I Said!",
                description: "Today I said something so funny or sweet, it made everyone laugh (or cry happy tears). You're gonna wanna remember this one forever!",
            }
        }
    },
    supabase: {
        table: 'cute_quotes',
        foreign_key: "quote_text",
    },
    data: {
        records: [] as any[],
    },
    layout: {
        table: 'sortedSegmentedDate',
    },
    plan: 'premium',
    icon: "IconQuote",
    url: "/cute-quotes",
    title: "Cute Quotes"
}

export default feature;