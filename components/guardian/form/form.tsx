// "use client"
// import { z, ZodTypeAny } from "zod"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"
// import { ModuleType, type Field } from "@/types/modules/type"  // Importing the Field type
// import { useState, useRef } from "react";
// import { createClient } from '@/utils/supabase/client';
// import { uploadToS3 } from "@/utils/aws/s3/files/upload"
// import { useChild } from "@/context/selected-child"
// import { useRouter } from 'next/navigation';



// export function ProfileForm({ module }: { module: ModuleType }) {
//     // Inside your component
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     // File input ref if needed
//     const fileInputRef = useRef<HTMLInputElement>(null);
//     const { selectedChild } = useChild()
//     const router = useRouter();
//     const fields = module.flyout.record.create.form.fields

//     // Generate the schema shape based on the field types
//     const schemaShape = fields.reduce((acc, field) => {
//         const { type, required, name } = field.input;

//         // Validation logic based on field type
//         if (type === "textarea" || type === "text") {
//             acc[name] = required
//                 ? z.string().min(1, { message: `${field.label.title} is required.` })
//                 : z.string().optional();
//         } else if (type === "date") {
//             acc[name] = required
//                 ? z.string()
//                     .min(1, { message: `${field.label.title} is required.` })
//                     .transform((val) => new Date(val)) // Transform string to Date
//                 : z.string().optional().transform((val) => (val ? new Date(val) : undefined));
//         } else if (type === "files") {
//             acc[name] = required
//                 ? z.instanceof(File).refine(
//                     (file) => file.size < 5 * 1024 * 1024,
//                     { message: "File must be less than 5MB" }
//                 )
//                 : z.instanceof(File).optional();
//         }
//         return acc;
//     }, {} as Record<string, ZodTypeAny>);

//     const formSchema = z.object(schemaShape);

//     const defaultValues = fields.reduce((acc, field) => {
//         acc[field.input.name] = field.input.type === "files" ? undefined : ""
//         return acc
//     }, {} as Record<string, any>)

//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues,
//     })

//     async function onSubmit(values: z.infer<typeof formSchema>) {
//         const supabase = await createClient();
//         setIsSubmitting(true);

//         try {
//             // ✅ Build a new object excluding any 'files' type fields
//             let filteredValues = Object.fromEntries(
//                 Object.entries(values).filter(([key]) => {
//                     const fieldDef = fields.find((f) => f.input.name === key);
//                     return fieldDef?.input.type !== "files";
//                 })
//             );

//             filteredValues.child_id = selectedChild.id;

//             // ✅ Save non-file data to Supabase
//             const { data: recordData, error: recordError } = await supabase
//                 .from(module.supabase.table)
//                 .upsert([filteredValues])
//                 .select();

//             if (recordError) throw new Error(recordError.message);
//             if (!recordData || recordData.length === 0)
//                 throw new Error('Failed to create record');

//             const recordId = recordData[0].id;
//             console.log('Record saved with ID:', recordId);

//             // ✅ Handle file upload separately
//             const files = fileInputRef.current?.files;
//             if (files && files.length > 0) {
//                 const uploadResult = await uploadToS3(
//                     Array.from(files),
//                     recordId,
//                     module.supabase.foreign_key
//                 );

//                 console.log(
//                     `Upload complete: ${uploadResult.imageCount} images, ` +
//                     `${uploadResult.videoCount} videos uploaded. ` +
//                     `${uploadResult.failCount} files failed.`
//                 );
//             }

//             form.reset();

//         } catch (error: any) {
//             console.error('Form submission error:', error.message);
//             alert(`Error: ${error.message}`);
//         } finally {
//             setIsSubmitting(false);
//             router.refresh();
//         }
//     }

//     return (
//         <div className="flex flex-col min-h-screen p-4">
//             <Form {...form}>
//                 <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
//                     <div className="space-y-6 flex-grow">
//                         {fields.map((field) => {
//                             const { name, type, placeholder } = field.input
//                             const label = field.label.title

//                             return (
//                                 <FormField
//                                     key={name}
//                                     control={form.control}
//                                     name={name as keyof z.infer<typeof formSchema>}
//                                     render={({ field: f }) => (
//                                         <FormItem>
//                                             {/* Make label bigger */}
//                                             <FormLabel className="font-semibold leading-normal">{label}</FormLabel>
//                                             <FormControl>
//                                                 {type === "textarea" ? (
//                                                     <Textarea
//                                                         placeholder={placeholder}
//                                                         className="resize-none text-base h-48" // Increase height (h-48 for example)
//                                                         {...f}
//                                                     />
//                                                 ) : type === "files" ? (
//                                                     <Input
//                                                         type="file"
//                                                         accept="image/png,image/jpeg,video/*,audio/*"
//                                                         onChange={(e) =>
//                                                             form.setValue(name, e.target.files?.[0])
//                                                         }
//                                                         multiple
//                                                         className="border-none"
//                                                     />
//                                                 ) : type === "date" ? (
//                                                     <Input
//                                                         type="date"
//                                                         placeholder={placeholder}
//                                                         className="text-base" // Make placeholder smaller
//                                                         {...f}
//                                                     />
//                                                 ) : (
//                                                     // Fallback for plain text inputs
//                                                     <Input
//                                                         type="text"
//                                                         placeholder={placeholder}
//                                                         className="text-base" // Make placeholder smaller
//                                                         {...f}
//                                                     />
//                                                 )}
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />
//                             )
//                         })}
//                     </div>
//                     <div className="mt-4 mb-12 w-full">
//                         <Button type="submit" className="w-full">
//                             Submit
//                         </Button>
//                     </div>
//                 </form>
//             </Form>
//         </div>
//     )
// }






// Using a spinning wheel. Albeit a gross one it seems.
"use client"
import { z, ZodTypeAny } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { ModuleType } from "@/types/modules/type"
import { useState, useRef } from "react";
import { createClient } from '@/utils/supabase/client';
import { uploadToS3 } from "@/utils/aws/s3/files/upload"
import { useChild, useUser } from "@/context/selected-child"
import { useRouter } from 'next/navigation';
import { filesPlan, isFeatureLocked } from "@/lib/plan"
import { IconAlertSquare, IconCrown, IconLockStar } from "@tabler/icons-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export function ProfileForm({ module }: { module: ModuleType }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [updgradeDialogOpen, setUpdgradeDialogOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { selectedChild } = useChild()
    const user = useUser()
    const router = useRouter();
    const fields = module.flyout.record.create.form.fields

    const schemaShape = fields.reduce((acc, field) => {
        const { type, required, name } = field.input;
        if (type === "textarea" || type === "text") {
            acc[name] = required ? z.string().min(1, { message: `${field.label.title} is required.` }) : z.string().optional();
        } else if (type === "date") {
            acc[name] = required
                ? z.string().min(1, { message: `${field.label.title} is required.` }).transform(val => new Date(val))
                : z.string().optional().transform(val => (val ? new Date(val) : undefined));
        } else if (type === "files") {
            acc[name] = required
                ? z.instanceof(File).refine(file => file.size < 100 * 1024 * 1024, { message: "File must be less than 100MB" })
                : z.preprocess(val => val instanceof File ? val : undefined, z.instanceof(File).optional());
        }
        return acc;
    }, {} as Record<string, ZodTypeAny>);

    const formSchema = z.object(schemaShape);

    const defaultValues = fields.reduce((acc, field) => {
        acc[field.input.name] = field.input.type === "files" ? undefined : ""
        return acc
    }, {} as Record<string, any>)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const supabase = await createClient();
        setIsSubmitting(true);
        try {
            let filteredValues = Object.fromEntries(
                Object.entries(values).filter(([key]) => {
                    const fieldDef = fields.find((f) => f.input.name === key);
                    return fieldDef?.input.type !== "files";
                })
            );
            filteredValues.child_id = selectedChild.id;
            const { data: recordData, error: recordError } = await supabase
                .from(module.supabase.table)
                .upsert([filteredValues])
                .select();

            if (recordError) throw new Error(recordError.message);
            if (!recordData || recordData.length === 0)
                throw new Error('Failed to create record');

            const recordId = recordData[0].id;
            const files = fileInputRef.current?.files;
            if (files && files.length > 0) {
                await uploadToS3(Array.from(files), recordId, module.supabase.foreign_key);
            }

            form.reset();
            setIsSubmitting(false);
            router.refresh();
        } catch (error: any) {
            // console.error('Form submission error:', error.message);
            if (error.message.includes("Monthly limit exceeded")) {
                setUpdgradeDialogOpen(true)
            }
            setIsSubmitting(false);
            // alert(`Error: ${error.message}`);
        } finally {
            // form.reset();
            // setIsSubmitting(false);
            // router.refresh();
        }
    }

    return (
        <div className="relative flex flex-col min-h-screen p-4">
            {/* 🔒 Overlay during submission */}
            {isSubmitting && (
                <div className="fixed inset-0 bg-white/60 z-50 flex items-center justify-center">
                    <div className="animate-spin rounded-full border-t-4 border-b-4 border-gray-900 h-12 w-12" />
                </div>
            )}

            <Dialog open={updgradeDialogOpen} onOpenChange={() => updgradeDialogOpen ? setUpdgradeDialogOpen(false) : setUpdgradeDialogOpen(true)}>
                <DialogTrigger asChild>
                    {/* Optional button to trigger the dialog */}
                    {/* <Button>Yo </Button> */}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Monthly Limit Exceeded</DialogTitle>
                        <Alert className="text-primary">
                            <IconAlertSquare className="h-4 w-4 text-primary!" />
                            <AlertTitle>Oops! You've hit your {(user.products as any).name} limit for...</AlertTitle>
                            <AlertDescription>
                                {/* To keep adding components to your app, consider upgrading your plan or wait until your usage resets. */}
                                <span className="capitalize">{module.title}</span>
                            </AlertDescription>
                        </Alert>
                        <DialogDescription>
                            Childhood flies by — upgrade to capture even more of the laughter, little voices, first words, and favorite things.
                            When you upgrade, you can preserve every precious detail and build a legacy of love they'll cherish forever.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button className="w-full" variant="default" asChild>
                            <Link href="/upgrade">Upgrade Now</Link>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={`flex flex-col space-y-4 ${isSubmitting ? 'pointer-events-none opacity-50' : ''}`}
                >
                    <div className="space-y-6 flex-grow">
                        {fields.map((field) => {
                            const { name, type, placeholder } = field.input
                            const label = field.label.title

                            return (
                                <FormField
                                    key={name}
                                    control={form.control}
                                    name={name as keyof z.infer<typeof formSchema>}
                                    render={({ field: f }) => (
                                        <FormItem>
                                            {/* <FormLabel className="font-semibold leading-normal">{label}  {field.input.plan && isFeatureLocked(user.product_id, field.input.plan) ? <div className="text-primary flex items-center gap-x-1"><IconCrown /><p>Upgrade to {field.input.plan}</p></div> : null}</FormLabel> */}
                                            <FormLabel className="font-semibold leading-normal">
                                                {label}  {(user.products as any).id == 'free' && type === "files" ? <div className="text-primary flex items-center gap-x-1"><Button variant={"link"} asChild><Link href="/upgrade"><IconCrown className="size-6" /> Upgrade to {field.input.plan}</Link></Button></div> : null}
                                            </FormLabel>
                                            {/* <FormLabel className="font-semibold leading-normal">{label}</FormLabel> */}
                                            <FormControl>
                                                {type === "textarea" ? (
                                                    <Textarea
                                                        placeholder={placeholder}
                                                        className="resize-none text-base h-48"
                                                        {...f}
                                                    />
                                                ) : type === "files" ? (
                                                    <Input
                                                        type="file"
                                                        accept="image/png,image/jpeg,video/*,audio/*"
                                                        onChange={(e) =>
                                                            form.setValue(name, e.target.files ? Array.from(e.target.files) : [])
                                                        }
                                                        multiple
                                                        ref={fileInputRef}
                                                        className="border-none"
                                                        disabled={(user.products as any).id == 'free' ? true : false}
                                                    />
                                                ) : type === "date" ? (
                                                    <Input
                                                        type="date"
                                                        placeholder={placeholder}
                                                        className="text-base"
                                                        {...f}
                                                    />
                                                ) : (
                                                    <Input
                                                        type="text"
                                                        placeholder={placeholder}
                                                        className="text-base"
                                                        {...f}
                                                    />
                                                )}
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )
                        })}
                    </div>
                    <div className="mt-4 mb-12 w-full">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </Button>
                    </div>
                </form >
            </Form >
        </div >
    )






    function DialogDemo({ module }: { module: ModuleType }) {
        const [updgradeDialogOpen, setUpdgradeDialogOpen] = useState(false);
        return (
            <Dialog open={updgradeDialogOpen} onOpenChange={() => updgradeDialogOpen ? setUpdgradeDialogOpen(false) : setUpdgradeDialogOpen(true)}>
                <DialogTrigger asChild>
                    {/* Optional button to trigger the dialog */}
                    <Button>Yo </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Make Every Moment Last</DialogTitle>
                        <AlertDemo module={module} />
                        <DialogDescription>
                            Childhood flies by — upgrade to capture even more of the laughter, little voices, first words, and favorite things.
                            When you upgrade, you can preserve every precious detail and build a legacy of love they'll cherish forever.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button className="w-full" variant="default" asChild>
                            <Link href="/upgrade">Upgrade Now</Link>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }
}

import { Terminal, CircleAlert } from "lucide-react"



export function AlertDemo({ module }: { module: ModuleType }) {
    return (
        <Alert className="text-primary">
            <IconAlertSquare className="h-4 w-4 text-primary!" />
            <AlertTitle>Oops! You've hit your monthly limit for...</AlertTitle>
            <AlertDescription>
                {/* To keep adding components to your app, consider upgrading your plan or wait until your usage resets. */}
                <span className="capitalize">{module.title}</span>
            </AlertDescription>
        </Alert>
    )
}
