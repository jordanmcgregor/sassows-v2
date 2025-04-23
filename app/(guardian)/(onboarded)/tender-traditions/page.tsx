import { createClient } from '@/utils/supabase/server';
import { TableSortedSegmentedDate } from "@/components/guardian/table/sorted/date";
import module from '@/components/guardian/modules/tender-traditions/module'
import { modules } from '@/components/guardian/modules/all'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ProfileForm } from '@/components/guardian/form/form';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TableSortedSegmentedAlphabet } from '@/components/guardian/table/sorted/alphabet';

// const module = JSON.parse(JSON.stringify(milestones));

const title = 'Tender Traditions'

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
                        <DialogContent className="sm:max-w-[525px]">
                            <DialogHeader>
                                <DialogTitle>What is a tender tradition?</DialogTitle>
                                <DialogDescription className="text-left">
                                    A tender tradition is one of those sweet, soulful routines that shape the rhythm of childhood and wrap your days in comfort. It might be watching nature documentaries in the dark with popcorn, Saturday morning crepes with rainbow sprinkles, or the quiet ritual of humming the same lullaby every night. These aren't just habits—they’re love in action, the little things that become the big things. Recording them now gives your future self the gift of vivid memories and treasured emotions that stand the test of time.
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button>New Tender Tradition</Button>
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