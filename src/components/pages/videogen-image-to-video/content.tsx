"use client";

import AvgGenTime from "@/components/avg-gen-time";
import { useResize } from "@/components/resize-context";
import ShowCodePanel from "@/components/show-code-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import GenerationLoader from "@/components/ui/generation-loader";
import {

    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,

} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import VideoView from "@/components/video-view";
// import { Textarea } from "@/components/ui/textarea";
import ViewDemo from "@/components/view-demo";
import { VideogenImageToVideoRequestBodyProps, VideogenImageToVideoResponseProps } from "@/lib/types/videogen-image-to-video";
// import { VideogenTextToVideoResponseProps } from "@/lib/types/videogen-text-to-video";
import { cn } from "@/lib/utils";
import useApiKeyStore from "@/lib/zustand-states/apikey-store";
import { useShowCodeStore } from "@/lib/zustand-states/show-code-store";
import useVideogenImageToVideoStore from "@/lib/zustand-states/videogen-image-to-video/store";
import { CircleAlert, LoaderCircle, Waves } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Content = () => {
    const {
        state,
        updateResults,
        updateHeight,
        updateWidth,
        updateEta,
    } = useVideogenImageToVideoStore();


    const { screenWidth } = useResize();
    const { apiKey } = useApiKeyStore();
    const { showCode } = useShowCodeStore();
    const [requestData, setRequestData] = useState("");
    const [responseData, setResponseData] = useState("");

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (apiKey) {
            setIsAuthenticated(true);
        }
    }, [apiKey]);

    useEffect(() => {
        const requestBody: VideogenImageToVideoRequestBodyProps = {
            key: apiKey,

            height: state.height,
            width: state.width,

            model_id: state.model_id,
            init_image: state.init_image,
            num_frames: state.num_frames,
            num_inference_steps: state.num_inference_steps,
            min_guidance_scale: state.min_guidance_scale,
            max_guidance_scale: state.max_guidance_scale,
            motion_bucket_id: state.motion_bucket_id,
            noise_aug_strength: state.noise_aug_strength,
            output_type: state.output_type,

            base64: true,
            webhook: null,
            track_id: null,
        };
        setRequestData(JSON.stringify(requestBody, null, 2));
    }, [state, apiKey]);



    async function handleSubmit() {
        setIsSubmitting(true);

        console.log("submitting..")

        if (!apiKey) {
            toast.error("Please sign in to run the model.");
            setIsSubmitting(false);
            return;
        }


        const requestBody: VideogenImageToVideoRequestBodyProps = {
            key: apiKey,

            height: state.height,
            width: state.width,

            model_id: state.model_id,
            init_image: state.init_image,
            num_frames: state.num_frames,
            num_inference_steps: state.num_inference_steps,
            min_guidance_scale: state.min_guidance_scale,
            max_guidance_scale: state.max_guidance_scale,
            motion_bucket_id: state.motion_bucket_id,
            noise_aug_strength: state.noise_aug_strength,
            output_type: state.output_type,

            base64: true,

            webhook: null,
            track_id: null,
        };



        try {
            const response = await fetch(
                "https://modelslab.com/api/v6/video/img2video",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                }
            );

            if ("error" in response) {
                toast.error("Error generating video");
                setIsSubmitting(false);
                return;
            }

            const data: VideogenImageToVideoResponseProps = await response.json();

            if (data.status === "error") {
                toast.error(data.message);
                setIsSubmitting(false);
                return;
            }

            if (data.status === "success") {
                toast.success("Video generated successfully");
                updateResults(data.output);
                (data.meta.height.toString());
                updateWidth(data.meta.width);
                updateEta(data.generationTime);
            }

            if (data.status === "failed") {
                toast.error(data.message || "failed to generate Video");
                setIsProcessing(false);
                return;
            }

            if (data.status === "processing") {
                toast.warning("Your video is processing in background.");
                // updateResults(data.future_links);
                setIsProcessing(true);
                updateEta(data.eta);


                // Store response data as formatted JSON string
                setResponseData(JSON.stringify(data, null, 2));


                const checkAccessibility = async (url: string) => {
                    try {
                        const response = await fetch(url, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ key: apiKey }),
                        });
                        const result = await response.json();
                        if (result.status === "success") {
                            updateResults(data.future_links);
                            setIsProcessing(false);
                        } else if (result.status === "failed") {
                            toast.error("failed to generate image");
                            setIsProcessing(false);
                        } else {
                            setTimeout(() => checkAccessibility(url), 5000);
                        }
                    } catch {
                        setTimeout(() => checkAccessibility(url), 5000);
                    }
                };

                checkAccessibility(data.fetch_result);
            }

            setIsSubmitting(false);
        } catch (error) {
            console.log(error);

            if (error instanceof Error) {
                // toast.error(error.message);
                console.log(error.message);

                toast.error("Something went wrong");
            } else {
                toast.error("Something went wrong");
                setIsSubmitting(false);
            }
        }
    }

    function handleReset() {

        updateResults([]);

        updateHeight(1024);
        updateWidth(1024);

    }
    return (
        <div
            className={cn("h-full p-2 pl-0.5 grid gap-1", "grid-rows-[auto_1fr] ")}
        >
            <ViewDemo
                videoUrl=""
                Icon={Waves}
                heading="VideoFusion (Image to Video)"
                subHeading="Click on 'Make it Move' to see how images move in videos."
            />
            {/* <ResizablePanelGroup
                direction={screenWidth > 768 ? "horizontal" : "vertical"}
                className="rounded-lg"
            > */}

            <ResizablePanelGroup
                direction={screenWidth > 768 ? "horizontal" : "vertical"}
                className="rounded-lg"
            >

                {/* {screenWidth > 768 && ( */}
                {/* )} */}
                {/* <ResizableHandle withHandle className="bg-transparent" /> */}
                <ResizablePanel
                    defaultSize={50}
                    minSize={30}
                    className={cn(
                        "p-1",
                        screenWidth > 768 ? "pl-2" : "!overflow-visible pt-2"
                    )}
                >
                    <div
                        className={cn(
                            "relative h-full border border-border rounded-md",
                            screenWidth < 768 ? "min-h-96" : ""
                        )}
                    >
                        <Badge
                            variant={"outline"}
                            className="bg-background z-10 absolute top-2 left-2"
                        >
                            Result
                        </Badge>
                        <AvgGenTime eta={state.eta} />
                        <div className="h-full">
                            {/*  */}
                            {(isSubmitting || isProcessing) && (
                                <div className="flex items-center justify-center flex-col gap-2 h-full">
                                    <GenerationLoader />
                                    <p className="text-sm">
                                        {isProcessing
                                            ? "Image is processing in background..."
                                            : "Generating..."}
                                    </p>
                                </div>
                            )}
                            {state.results.length > 0 && (
                                <ScrollArea className="flex flex-wrap rounded-lg h-full p-3 gap-3 pt-10">
                                    <div
                                        className={cn(
                                            "flex flex-wrap gap-2 p-2 pt-10 justify-center items-center h-full rounded-lg"
                                        )}
                                    >


                                        {state.results.map((result, index) => (
                                            <VideoView
                                                key={index}
                                                videoUrl={result}
                                                height={state.height}
                                                width={state.width}
                                                className="w-full"
                                            />


                                        ))}


                                    </div>
                                </ScrollArea>
                            )}
                        </div>
                    </div>
                </ResizablePanel>

                {showCode && (
                    <>
                        {screenWidth > 768 && (
                            <ResizableHandle withHandle className="bg-transparent" />
                        )}
                        <ShowCodePanel
                            apiEndpoint="https://modelslab.com/api/v1/enterprise/video/img2video"
                            isLoading={isSubmitting}
                            request={requestData}
                            response={responseData}
                        />
                    </>
                )}


            </ResizablePanelGroup>
            {/* </ResizablePanelGroup> */}

            <div className="mx-1 flex gap-2 flex-col">
                {!isAuthenticated && (
                    <p className="text-xs text-muted-foreground flex gap-1 items-center">
                        <CircleAlert className="size-4" /> Sign in to run the model
                    </p>
                )}

                <div className="flex gap-2 items-center">
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? <LoaderCircle className="animate-spin" /> : "Make it Move"}
                    </Button>

                    <Button
                        variant={"secondary"}
                        disabled={isSubmitting}
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Content;
