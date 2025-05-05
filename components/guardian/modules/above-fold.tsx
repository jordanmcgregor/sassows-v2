import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ProfileForm } from '@/components/guardian/form/form';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getMemoizedUser } from '@/utils/memoization/supabase/users/getMemoizedUser';
import { isModuleLocked } from '@/lib/plan';
import { IconComet, IconLockStar } from '@tabler/icons-react';
import { ModuleType } from '@/types/modules/type';
import Link from "next/link";

export default async function AboveFold({ module }: { module: ModuleType }) {
    const user = await getMemoizedUser()
    // const locked = isModuleLocked(user.product_id, module.plan)

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>{module.header.headline}</CardTitle>
                    <CardDescription>{module.header.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Additional content can go here */}
                </CardContent>
                <CardFooter className="flex justify-between items-end">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Learn More</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[525px]">
                            <DialogHeader>
                                <DialogTitle>{module.header.dialog.title}</DialogTitle>
                                <DialogDescription className="text-left">
                                    {module.header.dialog.description}
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                    <Sheet>
                        <SheetTrigger asChild>
                            <div>
                                {/* {locked ? */}

                                {/* <Button variant={"link"} asChild>
                                    <Link href="/home"><IconComet /> Upgrade to Pro</Link>
                                </Button>
                                : */}
                                <Button >
                                    New {module.title.replace(/s$/, '')}
                                    {/* {locked ? <IconLockStar /> : null} */}
                                </Button>
                                {/* } */}
                            </div>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader className="bg-secondary">
                                <SheetTitle>{module.title}</SheetTitle>
                            </SheetHeader>
                            <ProfileForm module={module} />
                        </SheetContent>
                    </Sheet>
                </CardFooter>
            </Card>

        </>
    )
}