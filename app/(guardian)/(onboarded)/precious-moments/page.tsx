import { createClient } from '@/utils/supabase/server';
import { TableSortedSegmentedDate } from "@/components/guardian/table/sorted/date";
import module from '@/components/guardian/modules/precious-moments/module'
import { modules } from '@/components/guardian/modules/all'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ProfileForm } from '@/components/guardian/form/form';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TableSortedSegmentedAlphabet } from '@/components/guardian/table/sorted/alphabet';

// const module = JSON.parse(JSON.stringify(milestones));

const title = 'Precious Moments'

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
                                <DialogTitle>What is a precious moment?</DialogTitle>
                                <DialogDescription className="text-left">
                                    A precious moment is one of those small, heartwarming memories that stays with you—the kind of moment that catches you off guard with its beauty or tenderness. Maybe it’s a spontaneous giggle, a sleepy hug, a thoughtful question, or the way sunlight hit their face just right. These moments are fleeting but powerful, and writing them down now means you’ll always have a way to return to them, long after the moment has passed.
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button>New Precious Moment</Button>
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

            <TableSortedSegmentedDate module={module} modules={modules} />
            {/* <TableSortedSegmentedAlphabet module={module} modules={modules} /> */}
        </>
    )
}