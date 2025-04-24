import { ModuleType } from '@/types/modules/type';
import { z, ZodTypeAny } from "zod"

let module: ModuleType = {
    metadata: {},
    name: 'moment_description',
    view: {
        records: {
            primary: "moment_description",
            icon: "IconClockHeart"
        }
    },
    header: {
        headline: "Precious Moments",
        description: "Celebrate the fleeting sparks of wonder, joy, and connection that make childhood unforgettable. These tiny treasures—from giggles to messes—hold more love than words can say."
    },
    flyout: {
        record: {
            create: {
                headline: "One Precious Moment",
                description: "Capture a simple, beautiful memory that made you pause and feel grateful. Whether it made you laugh, tear up, or just stop and smile—it’s one worth remembering.",
                show: true,
                form: {
                    fields: [
                        {
                            label: {
                                title: "What happened in the moment?",
                            },
                            input: {
                                name: "moment_description",
                                type: "textarea",
                                required: true,
                                placeholder: "They had chocolate all over their face. They sang while playing alone. They tackled the slide together and laughed all the way down.",
                            },
                        },
                        {
                            label: {
                                title: "When did it happen?",
                            },
                            input: {
                                name: "moment_time",
                                type: "date",
                                required: true,
                                placeholder: "",
                            },
                        },
                        {
                            label: {
                                title: "Where did it happen?",
                            },
                            input: {
                                name: "moment_location",
                                type: "text",
                                required: false,
                                placeholder: "At home, in the park, at the store, in the kitchen, outside under the trees...",
                            },
                        },
                        {
                            label: {
                                title: "Who was there?",
                            },
                            input: {
                                name: "people_involved",
                                type: "textarea",
                                required: false,
                                placeholder: "Was it just them? You and them? A sibling, a pet, grandma, or a new friend?",
                            },
                        },
                        {
                            label: {
                                title: "What made it stick in your heart?",
                            },
                            input: {
                                name: "why_it_matters",
                                type: "textarea",
                                required: false,
                                placeholder: "Was it their laugh? The surprise of the moment? The way you felt watching it happen? Something they said?",
                            },
                        },
                        {
                            label: {
                                title: "How did you feel?",
                            },
                            input: {
                                name: "emotional_effect",
                                type: "textarea",
                                required: false,
                                placeholder: "Did it make you giggle, tear up, pause, or just feel filled with love?",
                            },
                        },
                        {
                            label: {
                                title: "Any sounds, sights, or smells?",
                            },
                            input: {
                                name: "sensory_details",
                                type: "textarea",
                                required: false,
                                placeholder: "What music was playing? What did the light look like? Was something baking in the oven?",
                            },
                        },
                        {
                            label: {
                                title: "Do you think they’ll remember it?",
                            },
                            input: {
                                name: "child_memory_potential",
                                type: "textarea",
                                required: false,
                                placeholder: "Or will this be one of those stories you’ll get to tell them one day, laughing through the nostalgia?",
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
                title: "A Moment to Treasure Forever",
                description: "Some moments shine so bright—even in their quietness—they become part of who we are. Here's one of those precious memories."
            }
        }
    },
    supabase: {
        table: 'precious_moments',
        foreign_key: "moment_description",
    },
    data: {
        records: [] as any[],
    },
    layout: {
        table: 'sortedSegmentedDate',
    }
}

export default module;
