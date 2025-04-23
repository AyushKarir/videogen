"use client";

import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { CircleAlert } from "lucide-react";
import React, { useState } from "react";
import { useResize } from "@/components/resize-context";
import { Button } from "@/components/ui/button";
import useVideogenSceneCreatorStore from "@/lib/zustand-states/videogen-scene-creator/store";

const Sidebar = () => {
    const [isAdditionalSettingsOpen, setIsAdditionalSettingsOpen] = useState(false);
    const { screenWidth } = useResize();
    const {
        state,
        addScene,
        updateScene,
        updateNegPrompt,
        updateResolution,
        deleteScene
    } = useVideogenSceneCreatorStore();

    const DEFAULT_DURATION = 3;

    const handleAddScene = () => {
        addScene({
            prompt: "",
            duration: DEFAULT_DURATION,
            negative_prompt: ""
        });
    };

    const handleDeleteScene = (index: number) => {
        deleteScene(index);
    };

    const handleUpdateScenePrompt = (index: number, value: string) => {
        updateScene(index, { prompt: value });
    };

    return (
        <ScrollArea className="h-full px-2 sm:px-4">
            <form className="space-y-5 py-2 sm:py-4" action="">
                {state.scene.map((sceneSc, index) => (
                    <div key={index} className="space-y-3 px-2">
                        <div className="flex justify-between items-center">
                            <Label className="flex gap-2 items-center">
                                Prompt(Scene {index + 1})
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <CircleAlert className="text-muted-foreground size-4" />
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        <p>Write a prompt to generate your unique scene.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </Label>
                            {index > 0 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDeleteScene(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                        <Textarea
                            onChange={(e) => handleUpdateScenePrompt(index, e.target.value)}
                            value={sceneSc.prompt}
                            placeholder="Write a prompt for this scene"
                            className={cn(
                                "border px-2 border-border rounded-md resize-y",
                                screenWidth > 768 ? "" : ""
                            )}
                        />
                    </div>
                ))}
                <div className="px-2">

                    <Button
                        type="button"
                        className="w-full"
                        onClick={handleAddScene}
                        disabled={state.scene.length >= 5}
                    >
                        Add Scene
                    </Button>
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
                                    updateResolution(value as "640x480" | "520x480" | "480x360");
                                }}
                                value={state.resolution}
                                defaultValue="640x480"
                                className="w-full"
                            >
                                <TabsList className="grid grid-cols-3 w-full">
                                    <TabsTrigger value="640x480">640x480</TabsTrigger>
                                    <TabsTrigger value="520x480">520x480</TabsTrigger>
                                    <TabsTrigger value="480x360">480x360</TabsTrigger>
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