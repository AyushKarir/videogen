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



// import useVideogenImageToVideoStore from "@/lib/zustand-states/videogen-image-to-video/store";
import { Input } from "@/components/ui/input";
import convertToBase64 from "@/lib/convert-to-base-64";
import useDeepfakeImageSingle from "@/lib/zustand-states/deepfake-image-single/store";
import PreviousMap_ from "postcss/lib/previous-map";
import uploadAndGetUrl from "@/lib/upload-and-get-url";
import useApiKeyStore from "@/lib/zustand-states/apikey-store";



const Sidebar = () => {





    // const [duration, setDuration] = useState("5")


    // const { screenWidth } = useResize();

    const [previewInit, setPreviewInit] = useState<string | null>(null);
    const [previewReference, setPreviewReference] = useState<string | null>(null);
    const [previewTarget, setPreviewTarget] = useState<string | null>(null);

    const { apiKey } = useApiKeyStore();

    const { updateInitImage, updateReferenceImage, updateTargetImage } = useDeepfakeImageSingle();

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

    const handleInitImageChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (file) {

            const base64 = await convertToBase64(file) as string;
            const imageUrl = await uploadAndGetUrl(apiKey || 'apikey', base64);

            updateInitImage(imageUrl.link as string);

        }

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewInit(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewInit(null);
        }
    };

    const handleReferenceImageChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (file) {

            const base64 = await convertToBase64(file) as string;
            const imageUrl = await uploadAndGetUrl(apiKey || 'apikey', base64);

            updateReferenceImage(imageUrl.link as string);
        }

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewReference(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewReference(null);
        }
    };
    const handleTargetImageChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (file) {

            const base64 = await convertToBase64(file) as string;
            const imageUrl = await uploadAndGetUrl(apiKey || 'apikey', base64);

            updateTargetImage(imageUrl.link as string);
        }

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewTarget(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewTarget(null);
        }
    };

    return (
        <ScrollArea className="h-full px-2 sm:px-4">
            <form className="space-y-5 py-2  sm:py-4" action="">














                <Label className="flex gap-2 items-center">Image</Label>





                <div className="space-y-3">
                    <Label className="flex gap-2 items-center">
                        Upload Image
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
                        onChange={handleInitImageChange}
                        className="w-fit"
                    />
                    {previewInit && (
                        <Image
                            height={512}
                            width={512}
                            src={previewInit}
                            alt="Selected preview"
                            className="mx-auto mt-2 rounded-lg"
                        />
                    )}
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
                        onChange={handleTargetImageChange}
                        className="w-fit"
                    />
                    {previewTarget && (
                        <Image
                            height={512}
                            width={512}
                            src={previewTarget}
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
                        onChange={handleReferenceImageChange}
                        className="w-fit"
                    />
                    {previewReference && (
                        <Image
                            height={512}
                            width={512}
                            src={previewReference}
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
