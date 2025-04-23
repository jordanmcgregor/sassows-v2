"use client"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ModuleType, ModulesAllArray } from "@/types/modules/type"
import { schemaDetermineConvert } from "@/utils/modules/schema/determine/convert/schema-determine-convert"
import { FlyoutRecordDetails } from "@/components/composites/flyout/record/details/flyout"
import { useChild } from "@/context/selected-child"

type entries = {
    word: number;
    pronunciation: string;
    image_url?: string;
}

type Directory = {
    [letter: number]: entries[];
}

export function TableSortedSegmentedDate({ module, modules }: { module: ModuleType, modules: ModulesAllArray }) {
    const { selectedChild } = useChild()

    if (!selectedChild?.id) return null
    if (!module || !module.data || !module.data.records) return null

    const filteredRecords = module.data.records.filter(
        (record: any) => record.child_id === selectedChild.id
    )

    let directory: Directory = {}
    let [year, month, day] = [1, 1, 1]

    for (const record of filteredRecords) {
        if (!record.date) {
            const [datePart] = record.created_at.split("T")
                ;[year, month, day] = datePart.split("-").map(Number)
        } else {
            ;[year, month, day] = record.date.split("-").map(Number)
        }

        const date = new Date(year, month - 1, day)
        const unixTimestamp = date.getTime()

        if (!directory[unixTimestamp]) {
            directory[unixTimestamp] = []
        }
        directory[unixTimestamp].push(record)
    }

    return (
        <nav aria-label="Directory" className="h-full overflow-y-auto">
            {Object.keys(directory)
                .map((timestamp) => Number(timestamp))
                .sort((a, b) => b - a)
                .map((timestamp) => {
                    const dateString = new Date(timestamp).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })

                    return (
                        <div key={timestamp} className="relative">
                            <Alert className="bg-primary">
                                <AlertTitle className="text-white">{dateString}</AlertTitle>
                            </Alert>
                            <ul role="list" className="divide-y divide-gray-100">
                                {directory[timestamp]?.map((record: any, index: number) => {
                                    const { details, activeModule } = schemaDetermineConvert(record, modules)

                                    return (
                                        <li
                                            key={index}
                                            className="flex px-3 py-5 justify-between items-center relative"
                                        >
                                            <div className="flex gap-x-4">
                                                <img
                                                    alt=""
                                                    src="/themasters.jpeg"
                                                    className="size-12 flex-none rounded-xl bg-gray-50"
                                                />
                                                <div className="min-w-0">
                                                    <p className="text-sm/6 font-semibold text-gray-900">
                                                        {activeModule == null ? null : record[activeModule.name]}
                                                    </p>
                                                </div>
                                            </div>
                                            {module.flyout.record.view.show ? (
                                                <FlyoutRecordDetails
                                                    record={record}
                                                    details={details}
                                                    title={activeModule == null ? null : record[activeModule.name]}
                                                />
                                            ) : null}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
        </nav>
    )
}


// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { ModuleType } from "@/types/modules/type";
// import { schemaDetermineConvert } from "@/utils/modules/schema/determine/convert/schema-determine-convert";
// import { FlyoutRecordDetails } from "@/components/composites/flyout/record/details/flyout";


// type entries = {
//     word: number;
//     pronunciation: string;
//     image_url?: string;
// };

// type Directory = {
//     [letter: number]: entries[];
// };


// export function TableSortedSegmentedDate({ module }: { module: ModuleType }) {
//     let directory: Directory = {};
//     let [year, month, day] = [1, 1, 1]
//     console.log(module.data)
//     for (const record of module.data.records) {
//         if (!record.date) {
//             const [datePart] = record.created_at.split("T"); // gets "2025-04-11"
//             [year, month, day] = datePart.split("-").map(Number);
//         }
//         else {
//             [year, month, day] = record.date.split("-").map(Number);
//         }

//         // month - 1 because JS months are zero-based (0 = Jan, 11 = Dec)
//         const date = new Date(year, month - 1, day); // local time at midnight
//         const unixTimestamp = date.getTime(); // Local time in milliseconds
//         if (!directory[unixTimestamp as keyof typeof directory]) {
//             directory[unixTimestamp as keyof typeof directory] = [];
//         }
//         directory[unixTimestamp as keyof typeof directory].push(record);
//     }

//     return (
//         <nav aria-label="Directory" className="h-full overflow-y-auto">
//             {Object.keys(directory)
//                 .map((timestamp) => Number(timestamp)) // Convert string keys back to numbers
//                 .sort((a, b) => b - a)  // Sort timestamps in descending order
//                 .map((timestamp) => {
//                     // Convert the timestamp back to a date string
//                     const dateString = new Date(timestamp).toLocaleDateString('en-US', {
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric',
//                     });

//                     return (
//                         <div key={timestamp + Math.random()} className="relative">
//                             <Alert className="bg-primary">
//                                 <AlertTitle className="text-white">{dateString}</AlertTitle>
//                             </Alert>
//                             <ul role="list" className="divide-y divide-gray-100">
//                                 {directory[timestamp as keyof typeof directory].map((record: any, index: any) => {
//                                     const { details, activeModule } = schemaDetermineConvert(record)
//                                     return (
//                                         <li key={index + Math.random()} className="flex px-3 py-5 justify-between items-center relative">
//                                             {/* add default image if none is added */}
//                                             <div className="flex gap-x-4">
//                                                 <img alt="" src="/themasters.jpeg" className="size-12 flex-none rounded-xl bg-gray-50" />
//                                                 <div className="min-w-0">
//                                                     <p className="text-sm/6 font-semibold text-gray-900">{activeModule == null ? null : record[activeModule.name]}</p>
//                                                     {/* <p className="mt-1 truncate text-xs/5 text-gray-500">{record.environment}</p> */}
//                                                 </div>
//                                             </div>
//                                             <div>
//                                             </div>
//                                             {
//                                                 module.flyout.record.view.show
//                                                     ?
//                                                     <FlyoutRecordDetails record={record} details={details} title={activeModule == null ? null : record[activeModule.name]} />
//                                                     :
//                                                     null
//                                             }
//                                         </li>
//                                     )

//                                 })}
//                             </ul>
//                         </div>
//                     )
//                 })}
//         </nav>
//     )
// }




// function checkModule() {

// }