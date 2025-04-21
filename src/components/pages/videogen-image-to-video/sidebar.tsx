"use client";

// import ButtonRadio from "@/components/ui/button-radio";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { ChevronDown, ChevronUp } from 'lucide-react'
// import { cn } from "@/lib/utils";
// import { Textarea } from "@/components/ui/textarea";
// import useTextToImageRealtimeStore from "@/lib/zustand-states/text-to-image-realtime/store";
import { CircleAlert } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";



import useVideogenImageToVideoStore from "@/lib/zustand-states/videogen-image-to-video/store";
import { Input } from "@/components/ui/input";
import convertToBase64 from "@/lib/convert-to-base-64";
import SidebarWrapper from "@/components/wrappers/sidebar-wrapper";



const Sidebar = () => {

    const [isAdditionalSettingsOpen, setIsAdditionalSettingsOpen] =
        useState(false);

    // const [duration, setDuration] = useState("5")


    // const { screenWidth } = useResize();

    const [preview, setPreview] = useState<string | null>(null);



    const { state, updateInitImage, updateOutputType } = useVideogenImageToVideoStore();

    // const samples = [
    //     {
    //         name: "1",
    //         value: "1",
    //     },
    //     {
    //         name: "2",
    //         value: "2",
    //     },
    //     {
    //         name: "3",
    //         value: "3",
    //     },
    //     {
    //         name: "4",
    //         value: "4",
    //     },
    // ];

    // const resolutions = {
    //     "1:1": {
    //         width: 1024,
    //         height: 1024,
    //     },
    //     "3:4": {
    //         width: 768,
    //         height: 1024,
    //     },
    //     "4:3": {
    //         width: 1024,
    //         height: 768,
    //     },
    // };

    // const [resolution, setResolution] = React.useState("1:1");

    // const handleResolutionChnage = (e: string) => {
    //     setResolution(e);
    //     updateHeight(resolutions[e as "1:1" | "3:4" | "4:3"].height.toString());
    //     updateWidth(resolutions[e as "1:1" | "3:4" | "4:3"].width.toString());
    // };
    // console.log("model " + state.model, "duaration " + state.duration, "guidance " + state.guidance_scale, "output " + state.output_file, "prompt " + state.neg_prompt, "resolutions " + state.resolution);

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
        <SidebarWrapper>
            <ScrollArea className="h-full px-2 sm:px-4">
                <form className="space-y-5 py-2  sm:py-4" action="">




                    <div className="space-y-3">
                        <Label className="flex gap-2 items-center">
                            Upload Sketch
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <CircleAlert className="text-muted-foreground size-4" />
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>Upload a initial sketch.</p>
                                </TooltipContent>
                            </Tooltip>
                        </Label>
                        <Input
                            type="file"
                            accept="image/*"
                            name="image"
                            onChange={handleImageChange}
                            className="w-full"
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


















                    <div className="space-y-2 px-2">
                        <label className="block text-sm font-medium">Output File</label>
                        <Tabs
                            onValueChange={updateOutputType}
                            value={state.output_type}
                            defaultValue="mp4" className="w-full">
                            <TabsList className="grid grid-cols-2 w-full">
                                <TabsTrigger value="mp4">mp4</TabsTrigger>
                                <TabsTrigger value="gif">gif</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>




                </form>
            </ScrollArea>
        </SidebarWrapper>
    );
};

export default Sidebar;
