import { filesPlan } from '@/lib/plan';
import { ModuleType } from '@/types/modules/type';

let feature: ModuleType = {
    metadata: {},
    name: 'milestone',
    view: {
        records: {
            primary: "milestone",
            icon: "IconSchool"
        }
    },
    header: {
        headline: "Magical Milestones & Firsts",
        description: "Celebrate the unforgettable 'firsts'—first smile, first steps, first words—that mark your little one’s journey of growth. These precious moments are the heartbeats of childhood, worthy of remembering forever.",
        dialog: {
            title: "What is a milestone?",
            description: "A milestone is a magical moment in your child’s journey—a tiny step that marks their growth and discovery. It’s the first laugh, the first smile, or that sweet moment when they reach for you with tiny hands. These 'firsts' are little treasures that fill your heart with pride. Each one is a reminder of how quickly time passes and how lucky you are to witness them bloom into the person they’re becoming. Milestones are the moments you carry with you forever—the little things that make life’s big moments even more special.",
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
                                title: "Milestone Achieved",
                            },
                            input: {
                                name: "milestone",
                                type: "text",
                                required: true,
                                placeholder: "e.g., first steps, said 'mama', climbed the stairs alone",
                            },
                        },
                        {
                            label: {
                                title: "Milestone Date",
                            },
                            input: {
                                name: "date",
                                type: "date",
                                required: true,
                                placeholder: "e.g., first steps, said 'mama', climbed the stairs alone",
                            },
                        },
                        {
                            label: {
                                title: "What did their face look like, or how did they react?",
                            },
                            input: {
                                name: "childreaction",
                                type: "textarea",
                                required: false,
                                placeholder: "Did they smile? Laugh? Look surprised or proud? Describe their expression or sounds they made.",
                            },
                        },
                        {
                            label: {
                                title: "How did this moment reflect their personality at this age?",
                            },
                            input: {
                                name: "personality",
                                type: "textarea",
                                required: false,
                                placeholder: "Were they determined, curious, fearless, shy, joyful, or gentle? How did this moment capture that?",
                            },
                        },
                        {
                            label: {
                                title: "Where were you when it happened? What did the surroundings look like, and what details caught your attention?",
                            },
                            input: {
                                name: "environment",
                                type: "textarea",
                                required: false,
                                placeholder: "At home in the living room? Outside at the park? Was there music, sunlight, or a special toy nearby?",
                            },
                        },
                        {
                            label: {
                                title: "What will you always remember about this moment?",
                            },
                            input: {
                                name: "alwaysremember",
                                type: "textarea",
                                required: false,
                                placeholder: "That little giggle, the way they looked at you, the sound of their voice—what made this unforgettable?",
                            },
                        },
                        {
                            label: {
                                title: "Who else was with you when it happened?",
                            },
                            input: {
                                name: "companions",
                                type: "textarea",
                                required: false,
                                placeholder: "Was a sibling, grandparent, or friend there? How did they react or celebrate with you?",
                            },
                        },
                        {
                            label: {
                                title: "Any other details you want to share?",
                            },
                            input: {
                                name: "extras",
                                type: "textarea",
                                required: false,
                                placeholder: "Anything else that made this moment special? A funny detail, sweet word, or something you don’t want to forget?",
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
                title: "Look What I Did!",
                description: "I did something brand new today... and it made mommy and daddy cry happy tears."
            }
        }
    },
    supabase: {
        table: 'milestones',
        foreign_key: "milestone",
    },
    data: {
        records: [],
    },
    layout: {
        table: 'sortedSegmentedDate',
    },
    plan: 'free',
    icon: "IconSchool",
    url: "/milestones",
    title: "Milestones"
}

export const item = [{
    plan: 'free',
    icon: "IconSchool",
    url: "/milestones",
    title: "Milestones"
}]

export default feature;


