"use client"
import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import VideoPlayer from "@/components/media/video-player";
import { ModuleType } from "@/types/modules/type";


export function FlyoutRecordDetails({ record, details, title }: { record: any, details: any, title: string }) {
    const [expandedImage, setExpandedImage] = useState<string | null>(null);
    return (
        <Sheet>
            <SheetTrigger asChild><Button variant="secondary">See Details</Button></SheetTrigger>
            <SheetContent>
                <SheetHeader className="">
                    <SheetTitle>{title}</SheetTitle>
                    {/* <SheetDescription>
                        {module.flyout.record.view.description}
                    </SheetDescription> */}

                    <Tabs defaultValue="details" className="max-w-full w-full">
                        <TabsList className="w-full my-6">
                            <TabsTrigger value="details">Details</TabsTrigger>
                            {
                                record.media.length > 0
                                    ?
                                    <TabsTrigger value="media">Media</TabsTrigger>
                                    :
                                    null
                            }
                        </TabsList>
                        <TabsContent value="details">
                            {details.map((detail: any, index: any) => (
                                <div key={index}>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-medium leading-none">{detail.title}</h4>
                                        <p className="text-sm text-muted-foreground">
                                            {detail.description}
                                        </p>
                                    </div>
                                    <Separator className="my-4" />
                                </div>
                            ))}


                        </TabsContent >
                        {/* <TabsContent value="media">
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1">
                                {record.media.map((media: any, index: number) => (
                                    <div key={index} className="relative aspect-[9/16]"> 
                                        {media.media_type === 'image' ? (
                                            <img
                                                src={media.media_url}
                                                alt=""
                                                className="w-full h-full object-cover rounded-lg shadow-md"
                                            />
                                        ) : media.media_type === 'video' ? (
                                            <VideoPlayer source={media.media_url} className="object-cover w-full h-full" />
                                        ) : null}
                                    </div>
                                ))}
                            </div>
                        </TabsContent> */}
                        <TabsContent value="media">
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1">
                                {record.media.map((media: any, index: number) => (
                                    <div key={index} className="relative aspect-[9/16]">
                                        {media.media_type === 'image' ? (
                                            <img
                                                src={media.media_url}
                                                alt=""
                                                className="w-full h-full object-cover rounded-lg shadow-md cursor-pointer"
                                                onClick={() => setExpandedImage(media.media_url)}
                                            />
                                        ) : media.media_type === 'video' ? (
                                            <VideoPlayer source={media.media_url} className="object-cover w-full h-full" />
                                        ) : null}
                                    </div>
                                ))}
                            </div>

                            {expandedImage && (
                                <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
                                    <button
                                        onClick={() => setExpandedImage(null)}
                                        className="absolute top-4 right-4 text-white text-3xl font-bold z-50"
                                    >
                                        &times;
                                    </button>
                                    <img
                                        src={expandedImage}
                                        alt="Expanded"
                                        className="max-w-full max-h-full rounded-lg shadow-lg"
                                    />
                                </div>
                            )}
                        </TabsContent>

                    </Tabs>

                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}
