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
import useDeepfakeImageMulti from "@/lib/zustand-states/deepfake-image-multi/store";
import useApiKeyStore from "@/lib/zustand-states/apikey-store";
import uploadAndGetUrl from "@/lib/upload-and-get-url";
import SidebarWrapper from "@/components/wrappers/sidebar-wrapper";



const Sidebar = () => {


    // const [duration, setDuration] = useState("5")


    // const { screenWidth } = useResize();


    const [previewInit, setPreviewInit] = useState<string | null>(null);
    const [previewTarget, setPreviewTarget] = useState<string | null>(null);


    const { apiKey } = useApiKeyStore();



    const { updateInitImage, updateTargetImage } = useDeepfakeImageMulti();

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
        <SidebarWrapper>
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







                </form>
            </ScrollArea>
        </SidebarWrapper>
    );
};

export default Sidebar;
