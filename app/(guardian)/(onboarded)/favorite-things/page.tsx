import { createClient } from '@/utils/supabase/server';
import { TableSortedSegmentedDate } from "@/components/guardian/table/sorted/date";
import module from '@/components/guardian/modules/favorite-things/module'
import { modules } from '@/components/guardian/modules/all'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ProfileForm } from '@/components/guardian/form/form';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TableSortedSegmentedAlphabet } from '@/components/guardian/table/sorted/alphabet';

// const module = JSON.parse(JSON.stringify(milestones));

const title = 'Favorite Things'

export default async function Milestones() {
    const supabase = await createClient();
    const { data: records, error } = await supabase
        .from(module.supabase.table)
        .select(`
    *,
    media (
      id,
      media_url,
      media_type,
      filename
    )
  `);


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
                                <DialogTitle>What is a favorite thing?</DialogTitle>
                                <DialogDescription className="text-left">
                                    A favorite thing is any object, activity, place, or memory that brings your child joy, comfort, or excitement. It could be their most-loved toy, a special blanket, a favorite food, or even a simple routine like bedtime stories or trips to the park. These things help define their personality and bring insight into what lights them up inside. Recording these favorites allows you to look back and remember the little details that made each stage of childhood so meaningful.
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button>New Favorite Thing</Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader className="bg-secondary">
                                <SheetTitle>{title}</SheetTitle>
                            </SheetHeader>
                            <ProfileForm module={module} />
                        </SheetContent>
                    </Sheet>
                </CardFooter>

            </Card>

            {/* <TableSortedSegmentedDate module={module} modules={modules} /> */}
            <TableSortedSegmentedAlphabet module={module} modules={modules} />
        </>
    )
}