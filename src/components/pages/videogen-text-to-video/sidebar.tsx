"use client";

// import ButtonRadio from "@/components/ui/button-radio";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
// import useTextToImageRealtimeStore from "@/lib/zustand-states/text-to-image-realtime/store";
import { CircleAlert } from "lucide-react";
import React, { useState } from "react";
import { useResize } from "@/components/resize-context";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button, buttonVariants } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider"

import { RectangleHorizontal, Square, RectangleVertical } from 'lucide-react';
import useVideogenTextToVideo from "@/lib/zustand-states/videogen-text-to-video/store";


const Sidebar = () => {

    const [isAdditionalSettingsOpen, setIsAdditionalSettingsOpen] =
        useState(false);

    // const [duration, setDuration] = useState("5")


    const { screenWidth } = useResize();





    const { state,
        updateGuidanceScale,
        updateShiftScale,
        updateNegPrompt,
        updateResolution,
        // updateOutputFile,
        updateDuration,
        updateModel } = useVideogenTextToVideo();

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
    console.log("model " + state.model, "duaration " + state.duration, "guidance " + state.guidance_scale, "output " + state.output_file, "neg prompt " + state.neg_prompt, "resolutions " + state.resolution);
    return (
        <ScrollArea className="h-full px-2 sm:px-4">
            <form className="space-y-5 py-2  sm:py-4" action="">




                <div className="space-y-3 px-2">
                    <Label>Model</Label>
                    <Select value={state.model} onValueChange={(value) => updateModel(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a Model" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="cogvideox">cogvideox</SelectItem>
                            <SelectItem value="Wanx 2.1">Wanx 2.1</SelectItem>
                        </SelectContent>
                    </Select>
                </div>


                <div className="space-y-3">
                    <Label className="flex gap-2 items-center">
                        Resolution
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <CircleAlert className="text-muted-foreground size-4" />
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>The resolutions of images to generate.</p>
                            </TooltipContent>
                        </Tooltip>
                    </Label>
                    <Tabs
                        defaultValue="landscape"
                        className="w-full"
                        value={state.resolution}
                        onValueChange={(value) => updateResolution(value)}
                    >
                        <TabsList className="grid grid-cols-3 w-full">
                            <TabsTrigger value="landscape" className="py-0">
                                <RectangleHorizontal className="py-[1px] w-8" />
                            </TabsTrigger>
                            <TabsTrigger value="vertical" className="py-0">
                                <RectangleVertical className="py-[1px] w-8" />
                            </TabsTrigger>
                            <TabsTrigger value="square" className="py-0">
                                <Square className="py-[1px] w-8" />
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>






                <div className="space-y-3">
                    <Label className="flex gap-2 items-center">Additional Settings</Label>

                    <Button
                        variant={"outline"}
                        type="button"
                        onClick={() => {
                            setIsAdditionalSettingsOpen((prev) => !prev);
                        }}
                    >
                        {isAdditionalSettingsOpen ? (
                            <>
                                <ChevronUp />
                                Less
                            </>
                        ) : (
                            <>
                                <ChevronDown />
                                More
                            </>
                        )}
                    </Button>
                </div>

                {isAdditionalSettingsOpen && (
                    <>
                        <div className="space-y-3 px-2">
                            <Label className="flex gap-2 items-center">
                                Negative Prompt
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <CircleAlert className="text-muted-foreground size-4" />
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        <p>Write those items you don&apos;t want in the video.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </Label>
                            <Textarea
                                onChange={(e) => updateNegPrompt(e.target.value)}
                                value={state.neg_prompt}
                                placeholder="Write those items you don&apos;t want in the video."
                                className={cn(
                                    " border px-2 border-border rounded-md resize",
                                    screenWidth > 768 ? "" : ""
                                )}
                            ></Textarea>
                        </div>
                        <div className="space-y-2 px-2">
                            <Label className="flex gap-2 items-center">
                                Duration
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <CircleAlert className="text-muted-foreground size-4" />
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        <p>The resolutions of images to generate.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </Label>
                            <Select value={state.duration} onValueChange={updateDuration}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Duration" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[...Array(10)].map((_, i) => (
                                        <SelectItem key={i} value={`${i + 1}`}>
                                            {i + 1}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2 px-2">
                            <Label className="flex gap-2 items-center">
                                Guidance Scale
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <CircleAlert className="text-muted-foreground size-4" />
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        <p>
                                            The Guidance Scale of the image generations. Default value:
                                            7.5
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </Label>

                            <div className="flex items-center gap-2">
                                <span className="text-xs from-muted-foreground">3</span>
                                <Slider
                                    min={3}
                                    max={15}
                                    value={[state.guidance_scale]} // Ensure value is an array
                                    onValueChange={(value) => updateGuidanceScale(value[0])}
                                    step={0.1}
                                />
                                <span className="text-xs from-muted-foreground">15</span>
                                <p
                                    className={cn(
                                        buttonVariants({
                                            variant: "outline",
                                            size: "icon",
                                        }),
                                        "aspect-square"
                                    )}
                                >
                                    {state.guidance_scale}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2 px-2">
                            <Label className="flex gap-2 items-center">
                                Shift
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <CircleAlert className="text-muted-foreground size-4" />
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        <p>
                                            The Image Strength of the image generations. Default value:
                                            0.7
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </Label>

                            <div className="flex items-center gap-2">
                                <span className="text-xs from-muted-foreground">0</span>
                                <Slider
                                    min={0}
                                    max={1}
                                    value={[state.shift_scale]} // Ensure value is an array
                                    onValueChange={(value) => updateShiftScale(value[0])}
                                    step={0.01}
                                />
                                <span className="text-xs from-muted-foreground">1</span>
                                <p
                                    className={cn(
                                        buttonVariants({
                                            variant: "outline",
                                            size: "icon",
                                        }),
                                        "aspect-square"
                                    )}
                                >
                                    {state.shift_scale}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2 px-2">
                            <label className="block text-sm font-medium">Output File</label>
                            <Tabs
                                onValueChange={updateModel}
                                value={state.model}
                                defaultValue="mp4" className="w-full">
                                <TabsList className="grid grid-cols-2 w-full">
                                    <TabsTrigger value="mp4">mp4</TabsTrigger>
                                    <TabsTrigger value="gif">gif</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>


                    </>

                )}

            </form>
        </ScrollArea>
    );
};

export default Sidebar;
