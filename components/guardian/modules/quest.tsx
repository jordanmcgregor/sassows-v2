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

export default async function DailyQuest({ module, quest }: { module: ModuleType, quest: any }) {
    const user = await getMemoizedUser()
    console.log(user)
    // const locked = isModuleLocked(user.product_id, module.plan)

    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <div>
                        {/* {locked ? */}

                        {/* <Button variant={"link"} asChild>
                                    <Link href="/home"><IconComet /> Upgrade to Pro</Link>
                                </Button>
                                : */}
                        <Button className="w-full">
                            {/* New {module.title.replace(/s$/, '')} */}
                            Claim {quest.xp_reward} Bonus XP Points
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
        </>
    )
}