
import { SiteHeader } from "@/components/site-header"
import { createClient } from '@/utils/supabase/server';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CalendarIcon, Terminal } from "lucide-react";
import { TableSortedSegmentedAlphabet } from "@/components/guardian/table/sorted/alphabet";
import module from '@/components/guardian/modules/pronunciations/module'
import { modules } from '@/components/guardian/modules/all'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from '@/components/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { ProfileForm } from '@/components/guardian/form/form';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


const title = 'Milestones'

export default async function Milestones() {
    const supabase = await createClient();
    const { data: records } = await supabase
        .from(module.supabase.table)
        .select(`*,media:media (id,media_url,media_type,filename)`
        );
    module.data.records = records || []

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
                                <DialogTitle>What is a precious pronunciation?</DialogTitle>
                                <DialogDescription className="text-left">
                                    A precious pronunciation is one of those adorable, unforgettable ways your child tries to say a word. Maybe “spaghetti” became “pasketti,” or “ambulance” turned into “amblience.” These sweet little mix-ups are more than cute—they’re a glimpse into their growing mind and unique personality. Capturing them now helps preserve the magic of how they saw (and spoke about) the world at that age—before they grew out of it and said things "correctly." These tiny slips are memory gold.
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button>New Pronunciation</Button>
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

            <TableSortedSegmentedAlphabet module={module} modules={modules} />
        </>
    )
}