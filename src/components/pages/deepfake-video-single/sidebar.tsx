"use client";

// import ButtonRadio from "@/components/ui/button-radio";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger
// } from "@/components/ui/accordion"
// import { ChevronDown, ChevronUp } from 'lucide-react'
// import { cn } from "@/lib/utils";
// import { Textarea } from "@/components/ui/textarea";
// import useTextToImageRealtimeStore from "@/lib/zustand-states/text-to-image-realtime/store";
import { CircleAlert } from "lucide-react";
import React, { useState } from "react";

// import { Button } from "@/components/ui/button";



import useVideogenImageToVideoStore from "@/lib/zustand-states/videogen-image-to-video/store";
import { Input } from "@/components/ui/input";
import convertToBase64 from "@/lib/convert-to-base-64";



const Sidebar = () => {


    // const [duration, setDuration] = useState("5")


    // const { screenWidth } = useResize();

    const [preview, setPreview] = useState<string | null>(null);



    const { updateInitImage } = useVideogenImageToVideoStore();

    const handleImageChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (file) {
            const base64 = await convertToBase64(file);
            updateInitImage(base64 as string);
        }

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    return (
        <ScrollArea className="h-full px-2 sm:px-4">
            <form className="space-y-5 py-2  sm:py-4" action="">














                <Label className="flex gap-2 items-center">Image</Label>





                <div className="space-y-3">
                    <Label className="flex gap-2 items-center">
                        Upload Video
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <CircleAlert className="text-muted-foreground size-4" />
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>Upload an image to use for face swapping.</p>
                            </TooltipContent>
                        </Tooltip>
                    </Label>
                    <Input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleImageChange}
                        className="w-fit"
                    />
                    {preview && (
                        <Image
                            height={512}
                            width={512}
                            src={preview}
                            alt="Selected preview"
                            className="mx-auto mt-2 rounded-lg"
                        />
                    )}

                    <center>or</center>

                    <Input type="text" className="mx-auto rounded-lg" placeholder="Enter youtube video link" />

                </div>


                <div className="space-y-3">
                    <Label className="flex gap-2 items-center">
                        Upload Target Image
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <CircleAlert className="text-muted-foreground size-4" />
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>Upload an image to use for face swapping.</p>
                            </TooltipContent>
                        </Tooltip>
                    </Label>
                    <Input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleImageChange}
                        className="w-fit"
                    />
                    {preview && (
                        <Image
                            height={512}
                            width={512}
                            src={preview}
                            alt="Selected preview"
                            className="mx-auto mt-2 rounded-lg"
                        />
                    )}
                </div>


                <div className="space-y-3">
                    <Label className="flex gap-2 items-center">
                        Upload Reference Image
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <CircleAlert className="text-muted-foreground size-4" />
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>Upload the source image for the face to be swapped.</p>
                            </TooltipContent>
                        </Tooltip>
                    </Label>
                    <Input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleImageChange}
                        className="w-fit"
                    />
                    {preview && (
                        <Image
                            height={512}
                            width={512}
                            src={preview}
                            alt="Selected preview"
                            className="mx-auto mt-2 rounded-lg"
                        />
                    )}
                </div>





            </form>
        </ScrollArea>
    );
};

export default Sidebar;
