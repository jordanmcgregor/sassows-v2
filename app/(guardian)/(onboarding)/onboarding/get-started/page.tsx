"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { createClient } from '@/utils/supabase/client';
import { useState } from 'react'

const childSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }),
    birthdate: z.string().min(1, {
        message: "Birthdate is required",
    }),
})

const formSchema = z.object({
    children: z.array(childSchema),
})

export default function ProfileForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            children: [{ name: "", birthdate: "" }],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "children",
    })

    
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const supabase = createClient()
        setIsSubmitting(true)
        setError(null)
        setSuccess(false)

        const { data, error } = await supabase
            .from("children")
            .insert(values.children)
        // const { data, error } = await supabase
        //     .from('users.children')
        //     .insert([{ name: 'John Doe', birthdate: '2005-05-05' }]);

        if (error) {
            console.error("Insert error:", error)
            setError("Something went wrong while saving. Please try again.")
        } else {
            setSuccess(true)
            form.reset({ children: [{ name: "", birthdate: "" }] })
        }

        setIsSubmitting(false)
    }

    return (
        <div className="w-full p-12">
            <Card className="m-auto">
                <CardHeader>
                    <CardTitle className="leading-normal">Add Your Children</CardTitle>
                    <CardDescription>
                        Start building your family's memory book by adding your children. Capture milestones, share special moments, and keep their story growing over time.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {fields.map((field, index) => (
                                <div key={field.id} className="border p-4 rounded-lg space-y-4 bg-gray-50">
                                    <FormField
                                        control={form.control}
                                        name={`children.${index}.name`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Child's Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g. Ellie" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`children.${index}.birthdate`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Child's Birthdate</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {fields.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full"
                                            onClick={() => remove(index)}
                                        >
                                            Remove Child
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="secondary"
                                className="w-full"
                                onClick={() => append({ name: "", birthdate: "" })}
                            >
                                Add Another Child
                            </Button>
                            <Button type="submit" className="w-full">
                                Submit
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
