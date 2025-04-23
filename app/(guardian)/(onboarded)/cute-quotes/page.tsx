import { createClient } from '@/utils/supabase/server';
import { TableSortedSegmentedDate } from "@/components/guardian/table/sorted/date";
import module from '@/components/guardian/modules/cute-quotes/module'
import { modules } from '@/components/guardian/modules/all'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ProfileForm } from '@/components/guardian/form/form';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// const module = JSON.parse(JSON.stringify(milestones));

const title = 'Cute Quotes'

export default async function Milestones() {
    const supabase = await createClient();
    const { data: records } = await supabase
        .from(module.supabase.table)
        .select(`*,media:media (id,media_url,media_type,filename)`
        );

    // Make sure we're not modifying an undefined property
    if (module && !module.data) {
        module.data = { records: [] };
    }

    // Then safely assign records
    if (module && module.data) {
        module.data.records = records || [];
    }

    // for (const entry of module.data.entries) {
    //     console.log(entry.media)
    // }
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>{module.header.headline}</CardTitle>
                    <CardDescription>{module.header.description}</CardDescription>
                </CardHeader>
                <CardContent>


                </CardContent>
                <CardFooter className="flex justify-between">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Learn More</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>What is a cute quote?</DialogTitle>
                                <DialogDescription className="text-left">
                                    A cute quote is one of those sweet, funny, or endearing things your little one says that fills your heart with joy. It’s the way they mispronounce words, the random thoughts they share, or the funny observations they make as they begin to understand the world around them. These tiny moments capture their personality and offer a glimpse into the adorable ways they see the world. From the unexpected to the downright hilarious, these quotes are the gems that remind you how precious and fleeting these early years are. It’s the words that make you smile, laugh, and cherish every moment.
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button>New Cute Quote</Button>
                        </SheetTrigger>
                        <SheetContent >
                            <SheetHeader className="bg-secondary">
                                <SheetTitle>{title}</SheetTitle>
                            </SheetHeader>
                            <ProfileForm module={module} />
                        </SheetContent>
                    </Sheet>
                </CardFooter>
            </Card>

            <TableSortedSegmentedDate module={module} modules={modules} />
        </>
    )
}