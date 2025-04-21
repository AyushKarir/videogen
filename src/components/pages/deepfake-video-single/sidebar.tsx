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
import ReactPlayer from "react-player";

// import { Button } from "@/components/ui/button";



import useDeepfakeVideoSingle from "@/lib/zustand-states/deepfake-video-single/store";
import { Input } from "@/components/ui/input";
import convertToBase64 from "@/lib/convert-to-base-64";
import uploadAndGetUrl from "@/lib/upload-and-get-url";
import useApiKeyStore from "@/lib/zustand-states/apikey-store";



const Sidebar = () => {


    // const [duration, setDuration] = useState("5")


    // const { screenWidth } = useResize();

    const { apiKey } = useApiKeyStore();

    // const [previewInit, setPreviewInit] = useState<string | null>(null);
    const [previewReference, setPreviewReference] = useState<string | null>(null);
    // const [previewTarget, setPreviewTarget] = useState<string | null>(null);


    const [ytLink, setYtLink] = useState("");
    const [videoPreviewVideo, setVideoPreviewVideo] = useState<string | null>(
        null
    );



    const { updateInitVideo, updateReferenceImage } = useDeepfakeVideoSingle();



    const handleVideoChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (file) {
            const base64 = await convertToBase64(file) as string;
            const imageUrl = await uploadAndGetUrl(apiKey || 'apikey', base64);

            updateInitVideo(imageUrl.link as string);
        }


        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setVideoPreviewVideo(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setVideoPreviewVideo(null);
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
                        accept="video/*"
                        name="video"
                        onChange={handleVideoChange}
                        className="w-fit"
                    />

                    {ytLink.length <= 0 && (
                        <>
                            {videoPreviewVideo && (
                                <div className="mt-4 max-w-full mb-5 w-auto rounded-md h-32 m-auto">
                                    <ReactPlayer
                                        url={videoPreviewVideo}
                                        controls
                                        width="100%"
                                        height="100%"
                                        playing={false}
                                        className=""
                                    />
                                </div>
                            )}
                        </>

                    )}
                    <center>or</center>

                    <Input type="text"
                        onChange={(e) => setYtLink(e.target.value)}
                        value={ytLink}
                        className="mx-auto rounded-lg" placeholder="Enter youtube video link" />

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
