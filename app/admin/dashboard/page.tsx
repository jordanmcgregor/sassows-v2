import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { createClient } from '@/utils/supabase/server';

// import datum from "./data.json"
const title = 'Home'

export default async function Page() {
    const supabase = await createClient();
    const { data, error } = await supabase.from('my_entries_view')
        .select()
        .order('created_at', { ascending: true })

    let separateTableArrays: any
    if (data) {
        separateTableArrays = createSeparateTableArrays(data);
    }

    return (
        <>
            {/* <SectionCards data={data} /> */}
            <div className="">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 m-16">
                    {Object.keys(separateTableArrays).map((category, index) => {
                        const data = separateTableArrays[category]
                        return (
                            <ChartAreaInteractive key={index} data={data} />
                        )
                    })}
                </div>
            </div>
            {/* <DataTable data={datum} /> */}
        </>
    )
}










// Define types for the original data
interface DataEntry {
    table_name: string;
    created_at: string;
}

// Define a type for date count entries with dynamic table names
interface DateCountEntry {
    date: string;
    [key: string]: string | number; // Allow both string (for date) and number (for counts)
}

// Define a type for the grouped entries
interface GroupedEntry {
    date: string;
    tableType: string;
    count: number;
}

// Define the return type for our function
interface TableArrays {
    [key: string]: DateCountEntry[];
}

// Function to transform data into separate arrays by table_name
function createSeparateTableArrays(data: DataEntry[]): TableArrays {
    // First, identify all unique table names
    const tableTypes: string[] = Array.from(new Set(data.map(item => item.table_name)));

    // Create an object to hold our separate arrays
    const tableArrays: TableArrays = {};

    // Initialize empty arrays for each table type
    tableTypes.forEach(tableType => {
        tableArrays[tableType] = [];
    });

    // Group entries by date for each table type
    const groupedByDateAndTable: { [key: string]: GroupedEntry } = {};

    data.forEach(entry => {
        // Extract date part from timestamp (YYYY-MM-DD)
        const date = entry.created_at.split('T')[0];
        const tableType = entry.table_name;

        // Create key for this date and table type
        const key = `${date}_${tableType}`;

        if (!groupedByDateAndTable[key]) {
            groupedByDateAndTable[key] = {
                date: date,
                tableType: tableType,
                count: 0
            };
        }

        groupedByDateAndTable[key].count++;
    });

    // Populate the separate arrays
    Object.values(groupedByDateAndTable).forEach(entry => {
        const dateEntry: DateCountEntry = {
            date: entry.date
        };

        // Add the count for the specific table type
        dateEntry[entry.tableType] = entry.count;

        tableArrays[entry.tableType].push(dateEntry);
    });

    // Sort each array by date
    tableTypes.forEach(tableType => {
        tableArrays[tableType].sort((a, b) => a.date.localeCompare(b.date));
    });

    return tableArrays;
}

// // Example usage with the original data
// const originalData: DataEntry[] = [
//     {
//         table_name: 'pronunciations',
//         created_at: '2025-04-11T18:31:40.035711+00:00'
//     },
//     {
//         table_name: 'pronunciations',
//         created_at: '2025-04-11T18:31:55.65719+00:00'
//     },
//     // ... rest of your data
// ];

// // Apply the transformation
// const separateTableArrays = createSeparateTableArrays(originalData);

// // Example output for milestones

// // You can access each array individually like:
// // separateTableArrays.pronunciations
// // separateTableArrays.milestones
// // separateTableArrays.cute_quotes
// // etc.