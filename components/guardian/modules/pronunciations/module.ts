import { filesPlan } from '@/lib/plan';
import { ModuleType } from '@/types/modules/type'

let feature: ModuleType = {
    metadata: {},
    name: 'pronunciation',
    view: {
        records: {
            primary: "word",
            icon: "IconBook"
        }
    },
    header: {
        headline: "Baby's Early Pronunciations",
        description: "Document your little one's early attempts at pronouncing real-world words as they begin to develop their vocabulary.",
        dialog: {
            title: "What is a precious pronunciation?",
            description: "A precious pronunciation is one of those adorable, unforgettable ways your child tries to say a word. Maybe “spaghetti” became “pasketti,” or “ambulance” turned into “amblience.” These sweet little mix-ups are more than cute—they’re a glimpse into their growing mind and unique personality. Capturing them now helps preserve the magic of how they saw (and spoke about) the world at that age—before they grew out of it and said things 'correctly.' These tiny slips are memory gold."
        }
    },
    flyout: {
        record: {
            create: {
                headline: "New Pronunciation",
                description: "Capture the way they first said a word that made you smile, laugh, or melt. Most of these details are optional, but the more you share, the more vivid the memory becomes. Today’s mispronunciations are tomorrow’s treasures.",
                show: true,
                form: {
                    fields: [
                        {
                            label: {
                                title: "Real Word"
                            },
                            input: {
                                name: "word",
                                type: "text",
                                required: true,
                                placeholder: ""
                            }
                        },
                        {
                            label: {
                                title: "Little's Pronunciation"
                            },
                            input: {
                                name: "pronunciation",
                                type: "text",
                                required: true,
                                placeholder: ""
                            }
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
                description: "I tried saying a brand new word today—and it made mommy and daddy light up with joy.",
            }
        }
    },
    supabase: {
        table: 'pronunciations',
        foreign_key: "pronunciation",
    },
    data: {
        records: [] as any[],
    },
    layout: {
        table: 'sortedSegmentedDate',
    },
    plan: 'premium',
    icon: "IconBook",
    url: "/pronunciations",
    title: "Pronunciations"
}

export default feature;