"use client"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ModuleType, ModulesAllArray } from "@/types/modules/type";
import { schemaDetermineConvert } from "@/utils/modules/schema/determine/convert/schema-determine-convert";
import { FlyoutRecordDetails } from "@/components/composites/flyout/record/details/flyout";
import { useChild } from "@/context/selected-child"
import ModuleIcon, { componentMap } from "@/components/guardian/modules/icons"

type Entry = {
    word: string;
    pronunciation: string;
    image_url?: string;
};

type Directory = {
    [letter: string]: Entry[];
};

export function TableSortedSegmentedAlphabet({ module, modules }: { module: ModuleType, modules: ModulesAllArray }) {
    const { selectedChild } = useChild()
    console.log(selectedChild.id)

    if (!selectedChild?.id) return null
    if (!module || !module.data || !module.data.records) return null

    console.log(module.data.records)

    const filteredRecords = module.data.records.filter(
        (record: any) => record.child_id === selectedChild.id
    )
    console.log(filteredRecords)
    // const records = module.data.records;
    const directory: Directory = {};

    for (const record of filteredRecords) {
        const { details, activeModule } = schemaDetermineConvert(record, modules);
        console.log(activeModule)
        let initial = ''
        if (activeModule) {
            initial = record[activeModule.view.records.primary][0]?.toUpperCase() ?? "#";
        }

        if (!directory[initial]) {
            directory[initial] = [];
        }
        directory[initial].push(record);
    }

    return (
        <nav aria-label="Directory" className="h-full overflow-y-auto">
            {Object.keys(directory)
                .sort() // Alphabetical sort
                .map((letter) => (
                    <div key={letter} className="relative">
                        <Alert className="bg-primary">
                            <AlertTitle className="text-white">{letter}</AlertTitle>
                        </Alert>
                        <ul role="list" className="divide-y divide-gray-100">
                            {directory[letter].map((record: any, index: number) => {
                                const { details, activeModule } = schemaDetermineConvert(record, modules);
                                const Component = componentMap[activeModule?.view.records.icon as keyof typeof componentMap]
                                return (
                                    <li
                                        key={index}
                                        className="flex px-3 py-5 justify-between items-center relative"
                                    >
                                        <div className="flex items-center gap-x-4">
                                            {
                                                activeModule
                                                    ?
                                                    <ModuleIcon module={activeModule} />
                                                    :
                                                    null
                                            }
                                            <div className="min-w-0">
                                                <p className="text-sm/6 font-semibold text-gray-900">
                                                    {activeModule ? record[activeModule.view.records.primary] : null}
                                                </p>
                                                {/* <p className="mt-1 truncate text-xs/5 text-gray-500">
                                                    {activeModule ? record[activeModule.view.records.primary] : null}
                                                </p> */}
                                            </div>
                                        </div>

                                        {module.flyout.record.view.show && (
                                            <FlyoutRecordDetails
                                                record={record}
                                                details={details}
                                                title={activeModule ? record[activeModule.name] : ""}
                                            />
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
        </nav>
    );
}
