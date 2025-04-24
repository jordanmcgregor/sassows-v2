import { ForwardRefExoticComponent } from "react"
import { z, ZodTypeAny } from "zod"

export type ModuleType = {
    metadata: Record<string, any>,
    name: 'milestone' | 'pronunciation' | 'quote_text' | 'favorite_item_name' | 'tradition_name' | 'moment_description',
    view: {
        records: {
            primary: string,
            icon: "IconQuote" | "IconHeart" | "IconSchool" | "IconClockHeart" | "IconBook" | "IconRepeat"
        }
    },
    header: {
        headline: string,
        description: string
    },
    flyout: {
        record: {
            create: {
                headline: string,
                description: string,
                show: boolean,
                form: {
                    fields: Field[]
                }
            },
            view: {
                show: boolean,
                title: string,
                description: string,
            }
        }
    }
    supabase: {
        table: string,
        foreign_key: string,
    },
    data: {
        records: any[],
    },
    layout: {
        table: string | boolean
    }
}

export type Field = {
    label: {
        title: string,
    },
    input: {
        name: string,
        type: "text" | "textarea" | "dropdown" | "date" | "files",
        required: boolean,
        placeholder: string,
    }
}

export type ModulesAllArray = [ModuleType, ModuleType, ModuleType, ModuleType, ModuleType, ModuleType]

export type ModuleIcon = React.FC<React.SVGProps<SVGSVGElement>>

// export type ModuleIcons = { ModuleIcon, ModuleIcon, ModuleIcon, ModuleIcon, ModuleIcon }