"use client";

// import ButtonRadio from "@/components/ui/button-radio";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";

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
import useVideogenSceneCreatorStore from "@/lib/zustand-states/videogen-scene-creator/store";


const Sidebar = () => {

    const [isAdditionalSettingsOpen, setIsAdditionalSettingsOpen] =
        useState(false);

    // const [duration, setDuration] = useState("5")


    const { screenWidth } = useResize();





    const { state,
        updatePrompt1,
        updatePrompt2,
        updatePrompt3,
        updateNegPrompt,
        updateModel,
    } = useVideogenSceneCreatorStore();

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
    const updateModel2 = (value: string) => {
        useVideogenSceneCreatorStore.getState().updateOutputFile(value);
    };
    console.log("model " + state.model, "duaration " + state.prompt1, "promp1 " + state.prompt2, "prop2 " + state.prompt3, "neg " + state.neg_prompt,);
    return (
        <ScrollArea className="h-full px-2 sm:px-4">
            <form className="space-y-5 py-2  sm:py-4" action="">




                <div className="space-y-3 px-2">
                    <Label className="flex gap-2 items-center">
                        Prompt(Scene 1)
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <CircleAlert className="text-muted-foreground size-4" />
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>Write a prompt to generate your unique scene.</p>
                            </TooltipContent>
                        </Tooltip>
                    </Label>
                    <Textarea
                        onChange={(e) => updatePrompt1(e.target.value)}
                        value={state.prompt1}
                        placeholder="Write those items you don&apos;t want in the video."
                        className={cn(
                            " border px-2 border-border rounded-md resize",
                            screenWidth > 768 ? "" : ""
                        )}
                    ></Textarea>
                </div>


                <div className="space-y-3 px-2">
                    <Label className="flex gap-2 items-center">
                        Prompt(Scene 2)
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <CircleAlert className="text-muted-foreground size-4" />
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>Write a prompt to generate your unique scene.</p>
                            </TooltipContent>
                        </Tooltip>
                    </Label>
                    <Textarea
                        onChange={(e) => updatePrompt2(e.target.value)}
                        value={state.prompt2}
                        placeholder="Write those items you don&apos;t want in the video."
                        className={cn(
                            " border px-2 border-border rounded-md resize",
                            screenWidth > 768 ? "" : ""
                        )}
                    ></Textarea>
                </div>
                <div className="space-y-3 px-2">
                    <Label className="flex gap-2 items-center">
                        Prompt(Scene 3)
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <CircleAlert className="text-muted-foreground size-4" />
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>Write a prompt to generate your unique scene.</p>
                            </TooltipContent>
                        </Tooltip>
                    </Label>
                    <Textarea
                        onChange={(e) => updatePrompt3(e.target.value)}
                        value={state.prompt3}
                        placeholder="Write those items you don&apos;t want in the video."
                        className={cn(
                            " border px-2 border-border rounded-md resize",
                            screenWidth > 768 ? "" : ""
                        )}
                    ></Textarea>

                    <Button className="w-full">Add Scene</Button>
                </div>

                <div className="space-y-3 px-2">
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
                            <label className="block text-sm font-medium">Output File</label>
                            <Tabs
                                onValueChange={(value) => {
                                    // Type assertion to ensure it's either "mp4" or "gif"
                                    const model = value as "mp4" | "gif";
                                    updateModel(model);
                                }}
                                value={state.model}
                                defaultValue="mp4"
                                className="w-full"
                            >
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
