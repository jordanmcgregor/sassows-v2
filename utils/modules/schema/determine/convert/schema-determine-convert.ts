import { ModulesAllArray, ModuleType } from "@/types/modules/type"

export function schemaDetermineConvert(record: any, modules: ModulesAllArray) {
    let details: any[] = []
    let activeModule: ModuleType | null = null

    for (const module of modules) {
        if (module.name in record) {
            activeModule = module
            const fields = module.flyout.record.create.form.fields
            for (const field of fields) {
                if (field.input.name in record && record[field.input.name] != '') {
                    // console.log(record)
                    details.push({ title: field.label.title, description: record[field.input.name] })
                }
            }
        }
    }
    return { details, activeModule }
}