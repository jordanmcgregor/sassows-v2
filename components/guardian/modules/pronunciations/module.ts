import { ModuleType } from '@/types/modules/type'

let module: ModuleType = {
    metadata: {},
    name: 'pronunciation',
    view: {
        records: {
            primary: "word"
        }
    },
    header: {
        headline: "Baby's Early Pronunciations",
        description: "Document your little one's early attempts at pronouncing real-world words as they begin to develop their vocabulary.",
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
                                placeholder: ""
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
    }
}

export default module;