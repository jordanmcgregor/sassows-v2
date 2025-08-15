"use client"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import validator from "validator";
import { createClient } from '@/utils/supabase/client';
import { sendSlackMessageViaApi } from '@/app/actions/slack/send-message';
import * as pixel from "@/components/lib/mpixel";

const schema = z.object({
    name: z.string().min(5, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().refine(validator.isMobilePhone),
    social: z.string().refine(
        (val) =>
            validator.isURL(val) &&
            (val.includes("tiktok.com") || val.includes("instagram.com")),
        {
            message: "Must be a valid TikTok or Instagram URL",
        }
    ),
    mom: z.enum(["yes", "no"], { required_error: "Please select an option" }),
    us_based: z.enum(["yes", "no"], { required_error: "Please select an option" }),
    hope: z.string().min(5, "Response is required"),
});

export default function CreatorApplicationForm() {
    // const { register, handleSubmit, formState: { errors }, } = useForm<z.infer<typeof schema>>({
    //     resolver: zodResolver(schema),
    //     defaultValues: { name: "", email: "" },
    // });
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: { name: "Jordan", email: "sldfkj@gmail.com", phone: "8017627420", social: "instagram.com", mom: "no", us_based: "no", hope: "Everything" },
    });

    async function onSubmit(data: z.infer<typeof schema>) {
        alert(JSON.stringify(data));
        const supabase = await createClient();
        const { data: recordData, error: recordError } = await supabase
            .schema('creators')
            .from('applications')
            .insert([data])
        if (recordError) {
            alert("Error submitting form! " + recordError.message);
            return;
        }
        else {
            if (data.mom === "yes") {
                const waitForFbq = (): Promise<void> => {
                    return new Promise((resolve, reject) => {
                        const maxAttempts = 20;
                        let attempts = 0;

                        const check = () => {
                            if (typeof window !== "undefined" && typeof window.fbq === "function") {
                                resolve();
                            } else if (attempts < maxAttempts) {
                                attempts++;
                                setTimeout(check, 250); // check every 250ms
                            } else {
                                reject(new Error("window.fbq not initialized"));
                            }
                        };

                        check();
                    });
                };
                const setMetaLead = async () => {
                    const generateEventId = () => {
                        return Array.from({ length: 20 }, () =>
                            Math.random().toString(36).charAt(2)
                        ).join('');
                    };

                    const eventObject = { eventId: generateEventId() };
                    // sendSlackMessageViaApi(
                    //   process.env.NEXT_PUBLIC_SLACK_ERROR_REPORTING_CHANNEL,
                    //   `Generated eventId: ${eventObject.eventId}`
                    // );

                    try {
                        await waitForFbq();
                        pixel.event("Lead", {}, eventObject);
                    } catch (error) {
                        sendSlackMessageViaApi(
                            process.env.NEXT_PUBLIC_SLACK_ERROR_REPORTING_CHANNEL,
                            `FBQ error: ${String(error)}`
                        );
                    }
                    try {
                        const response = await fetch(`/api/meta/capi/lead?eventId=${eventObject.eventId}`);
                        // sendSlackMessageViaApi(
                        //   process.env.NEXT_PUBLIC_SLACK_ERROR_REPORTING_CHANNEL,
                        //   `API response: ${response.json()}`
                        // );
                    }
                    catch (error) {
                        sendSlackMessageViaApi(
                            process.env.NEXT_PUBLIC_SLACK_ERROR_REPORTING_CHANNEL,
                            `API error: ${String(error)}`
                        );
                    }
                }
                await setMetaLead();
                alert("Thank you for your application! We will be in touch soon.");
                window.location.href = "/creator/application/mom/yes";
            } else {
                window.location.href = "/creator/application/mom/no";
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold leading-normal">Full Name</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder={""}
                                    className="text-base"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                >
                </FormField>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold leading-normal">Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder={""}
                                    className="text-base"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                >
                </FormField>
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold leading-normal">Phone</FormLabel>
                            <FormControl>
                                <Input
                                    type="phone"
                                    placeholder={""}
                                    className="text-base"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                >
                </FormField>
                <FormField
                    control={form.control}
                    name="hope"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold leading-normal">What do you hope to get out of content creation?</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder={""}
                                    className="text-base"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                >
                </FormField>
                <FormField
                    control={form.control}
                    name="social"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold leading-normal">What is your Instagram or TikTok URL?</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder={""}
                                    className="text-base"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                >
                </FormField>
                <FormField
                    control={form.control}
                    name="mom"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold leading-normal">Are you a mom currently raising a baby or toddler (ages 0–4)?</FormLabel>
                            <FormControl>
                                <Select
                                    value={field.value?.toString() ?? ""}
                                    onValueChange={(val) => field.onChange(val)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent className="w-full">
                                        <SelectItem value="yes">Yes</SelectItem>
                                        <SelectItem value="no">No</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                >
                </FormField>
                <FormField
                    control={form.control}
                    name="us_based"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold leading-normal">Are you based in the US?</FormLabel>
                            <FormControl>
                                <Select
                                    value={field.value?.toString() ?? ""}
                                    onValueChange={(val) => field.onChange(val)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent className="w-full">
                                        <SelectItem value="yes">Yes</SelectItem>
                                        <SelectItem value="no">No</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                >
                </FormField>
                <Button type="submit" className="w-full">Submit</Button>
            </form>
        </Form >
    );
}
