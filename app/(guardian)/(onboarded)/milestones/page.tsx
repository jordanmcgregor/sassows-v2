import { createClient } from '@/utils/supabase/server';
import { TableSortedSegmentedDate } from "@/components/guardian/table/sorted/date";
import module from '@/components/guardian/modules/milestones/module'
import { modules } from '@/components/guardian/modules/all'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ProfileForm } from '@/components/guardian/form/form';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// const module = JSON.parse(JSON.stringify(milestones));

const title = 'Milestones'

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
                                <DialogTitle>What is a milestone?</DialogTitle>
                                <DialogDescription className="text-left">
                                    A milestone is a magical moment in your child’s journey—a tiny step that marks their growth and discovery. It’s the first laugh, the first smile, or that sweet moment when they reach for you with tiny hands. These "firsts" are little treasures that fill your heart with pride. Each one is a reminder of how quickly time passes and how lucky you are to witness them bloom into the person they’re becoming. Milestones are the moments you carry with you forever—the little things that make life’s big moments even more special.
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button>New Milestone</Button>
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