import { ModuleType } from '@/types/modules/type';
import { z, ZodTypeAny } from "zod"

let module: ModuleType = {
    metadata: {},
    name: 'tradition_name',
    view: {
        records: {
            primary: "tradition_name"
        }
    },
    header: {
        headline: "Tender Traditions & Cozy Rituals",
        description: "Preserve the little habits that brought comfort, joy, and magic to your days—from bedtime stories to Saturday pancakes with rainbow swirls. These moments, small as they seem, shape the soul."
    },
    flyout: {
        record: {
            create: {
                headline: "One Tender Tradition",
                description: "Describe a ritual, routine, or moment that became a comforting constant. Whether it was whimsical or deeply meaningful, it's part of the story you’ll cherish most.",
                show: true,
                form: {
                    fields: [
                        {
                            label: {
                                title: "What was the tradition?",
                            },
                            input: {
                                name: "tradition_name",
                                type: "text",
                                required: true,
                                placeholder: "Saturday crepes with food coloring, bedtime documentaries, made-up lullabies, 'goodnight' rituals, etc.",
                            },
                        },
                        {
                            label: {
                                title: "When did it happen?",
                            },
                            input: {
                                name: "tradition_time",
                                type: "text",
                                required: false,
                                placeholder: "Every Friday night? At bedtime? On rainy days? When someone was feeling sad or excited?",
                            },
                        },
                        {
                            label: {
                                title: "Who was involved?",
                            },
                            input: {
                                name: "people_involved",
                                type: "textarea",
                                required: false,
                                placeholder: "Was it just you and them? A whole family affair? A special one-on-one time with mom, dad, grandma, or a sibling?",
                            },
                        },
                        {
                            label: {
                                title: "How did it make them (or you) feel?",
                            },
                            input: {
                                name: "emotional_effect",
                                type: "textarea",
                                required: false,
                                placeholder: "Did it make them feel safe, excited, connected, giggly, or calm? What kind of energy did it carry?",
                            },
                        },
                        {
                            label: {
                                title: "What little details made it special?",
                            },
                            input: {
                                name: "special_details",
                                type: "textarea",
                                required: false,
                                placeholder: "The sound of the crepe batter sizzling? The way the room looked in the dark? A certain smell? A goofy song you always sang?",
                            },
                        },
                        {
                            label: {
                                title: "Was there a story behind how it started?",
                            },
                            input: {
                                name: "origin_story",
                                type: "textarea",
                                required: false,
                                placeholder: "Was it spontaneous? A tradition passed down? Did it begin by accident, or as a solution to something?",
                            },
                        },
                        {
                            label: {
                                title: "Has it changed over time?",
                            },
                            input: {
                                name: "evolution_of_tradition",
                                type: "textarea",
                                required: false,
                                placeholder: "Did it evolve into something new as they grew? Was it replaced with a new ritual or paused for a season?",
                            },
                        },
                        {
                            label: {
                                title: "What’s your favorite memory of it?",
                            },
                            input: {
                                name: "favorite_memory_of_tradition",
                                type: "textarea",
                                required: false,
                                placeholder: "Try to describe one night or morning that stands out. The way they looked, what they said, what you felt.",
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
                title: "A Tradition That Touched Our Hearts",
                description: "These simple routines meant so much more than the sum of their parts. Here's one tradition that brought comfort, connection, and joy."
            }
        }
    },
    supabase: {
        table: 'tender_traditions',
        foreign_key: "tradition_name",
    },
    data: {
        records: [] as any[],
    },
    layout: {
        table: 'sortedSegmentedDate',
    }
}

export default module;
