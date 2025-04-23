"use client";

// import ButtonRadio from "@/components/ui/button-radio";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

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
import React from "react";



import useTextTo3DStore from "@/lib/zustand-states/text-to-3d/store";

import SidebarWrapper from "@/components/wrappers/sidebar-wrapper";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useResize } from "@/components/resize-context";



const Sidebar = () => {



    // const [duration, setDuration] = useState("5")


    const { screenWidth } = useResize();




    const { state, updateFileFormat, updatePrompt } = useTextTo3DStore();

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


    return (
        <SidebarWrapper>
            <ScrollArea className="h-full px-2 sm:px-4">
                <form className="space-y-5 py-2  sm:py-4" action="">











                    <div className="space-y-3">
                        <Label className="flex gap-2 items-center">
                            Prompt
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <CircleAlert className="text-muted-foreground size-4" />
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>Write those items you want in the 3D model.</p>
                                </TooltipContent>
                            </Tooltip>
                        </Label>
                        <Textarea
                            onChange={(e) => updatePrompt(e.target.value)}
                            value={state.prompt}
                            placeholder="Write those things you want in the 3D model."
                            className={cn(
                                " border px-2 border-border rounded-md resize",
                                screenWidth > 768 ? "" : ""
                            )}
                        ></Textarea>
                    </div>











                    <div className="space-y-2">
                        <Label className="flex gap-2 items-center">
                            File Format
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <CircleAlert className="text-muted-foreground size-4" />
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>The file format for the generated 3D model.</p>
                                </TooltipContent>
                            </Tooltip>
                        </Label>
                        <Select value={state.file_format} onValueChange={updateFileFormat}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select File Format" />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                                {["glb", "stl", "obj", "ply"].map((format) => (
                                    <SelectItem key={format} value={format}>
                                        {format.toUpperCase()}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>




                </form>
            </ScrollArea>
        </SidebarWrapper>
    );
};

export default Sidebar;
