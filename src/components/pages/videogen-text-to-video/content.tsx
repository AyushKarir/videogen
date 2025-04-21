"use client";

import AvgGenTime from "@/components/avg-gen-time";
// import Base64ImageView from "@/components/base64-image-view";
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
import { Textarea } from "@/components/ui/textarea";
import VideoView from "@/components/video-view";
import ViewDemo from "@/components/view-demo";
import {
    VideogenTextToVideoResponseProps,
    VideogenTextToVideoRequestBodyProps,
} from "@/lib/types/videogen-text-to-video";
import { cn } from "@/lib/utils";
import useApiKeyStore from "@/lib/zustand-states/apikey-store";
import { useShowCodeStore } from "@/lib/zustand-states/show-code-store";
// import useTextToImageRealtimeStore from "@/lib/zustand-states/text-to-image-realtime/store";
import useVideogenTextToVideo from "@/lib/zustand-states/videogen-text-to-video/store";
import { CircleAlert, LoaderCircle, Zap } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Content = () => {
    // const {
    //     state,
    //     updatePrompt,
    //     updateResults,
    //     updateResultHeight,
    //     updateResultWidth,
    //     updateHeight,
    //     updateWidth,
    //     updateSamples,
    //     updateEta,
    // } = useTextToImageRealtimeStore();


    const {
        state,
        updatePrompt,
        updateResults,
        updateUpscaleWidth,
        updateUpscaleHeight,
        updateEta,
        updateNegPrompt,
        updateDuration,
        updateGuidanceScale,
        updateShiftScale,
        updateOutputFile,
        updateModel,
    } = useVideogenTextToVideo();

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
        const requestBody: VideogenTextToVideoRequestBodyProps = {
            key: apiKey || "apiKey",
            prompt: state.prompt,
            negative_prompt: state.neg_prompt,

            // safety_checker: false,
            // seed: null,
            webhook: null,
            track_id: null,
            model_id: state.model,

            height: state.height,
            width: state.width,
            num_frames: state.num_frames,
            num_inference_steps: state.num_inference_steps,
            guidance_scale: state.guidance_scale,
            upscale_height: state.upscale_height,
            upscale_width: state.upscale_width,
            upscale_strength: state.upscale_strength,
            upscale_guidance_scale: state.upscale_guidance_scale,
            upscale_num_inference_steps: state.upscale_num_inference_steps,
            output_type: state.output_file,

        };
        setRequestData(JSON.stringify(requestBody, null, 2));
    }, [state, apiKey]);



    async function handleSubmit() {
        setIsSubmitting(true);

        if (!apiKey) {
            toast.error("Please sign in to run the model.");
            setIsSubmitting(false);
            return;
        }

        if (!state.prompt && state.prompt.length <= 0) {
            toast.error("Please provide prompt.");
            setIsSubmitting(false);
            return;
        }

        const requestBody: VideogenTextToVideoRequestBodyProps = {
            key: apiKey,
            prompt: state.prompt,
            negative_prompt: state.neg_prompt,

            // safety_checker: false,
            // seed: null,
            webhook: null,
            track_id: null,
            model_id: state.model,

            height: state.height,
            width: state.width,
            num_frames: state.num_frames,
            num_inference_steps: state.num_inference_steps,
            guidance_scale: state.guidance_scale,
            upscale_height: state.upscale_height,
            upscale_width: state.upscale_width,
            upscale_strength: state.upscale_strength,
            upscale_guidance_scale: state.upscale_guidance_scale,
            upscale_num_inference_steps: state.upscale_num_inference_steps,
            output_type: state.output_file,

        };

        try {
            const response = await fetch(
                "https://modelslab.com/api/v6/video/text2video",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                }
            );

            if ("error" in response) {
                toast.error("Error generating image");
                setIsSubmitting(false);
                return;
            }

            const data: VideogenTextToVideoResponseProps = await response.json();

            const { id } = data;

            if (data.status === "error") {
                toast.error(data.message);
                setIsSubmitting(false);
                return;
            }

            if (data.status === "success") {
                toast.success("Video generated successfully");
                // updateResults(data.output);
                updateUpscaleHeight(data.meta.height);
                updateUpscaleWidth(data.meta.width);
                updateEta(data.generationTime);
            }

            if (data.status === "failed") {
                toast.error(data.message || "failed to generate video");
                setIsProcessing(false);
                return;
            }
            setResponseData(JSON.stringify(data, null, 2));

            if (data.status === "processing") {
                toast.warning("Your video is processing in background.");
                // updateResults(data.future_links);
                setIsProcessing(true);
                updateEta(data.eta);
                updateUpscaleHeight(data.meta.height);
                updateUpscaleWidth(data.meta.width);



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
                            updateResults(data.output || []);
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
        updatePrompt("");
        updateResults([]);
        updateUpscaleWidth(0);
        updateUpscaleHeight(0);


        updateNegPrompt("");
        updateDuration("5");
        updateGuidanceScale(6.5);
        updateShiftScale(6.5);
        updateOutputFile("mp4");
        updateModel("cogvideox");
    }
    return (
        <div
            className={cn("h-full p-2 pl-0.5 grid gap-1", "grid-rows-[auto_1fr] ")}
        >
            <ViewDemo
                videoUrl=""
                Icon={Zap}
                heading="VideoFusion (Text to Video)"
                subHeading=" Click on 'View Demo' to watch a tutorial video and see
                how it works."
            />
            <ResizablePanelGroup
                direction={screenWidth > 768 ? "horizontal" : "vertical"}
                className="rounded-lg"
            >
                <ResizablePanel
                    defaultSize={50}
                    minSize={30}
                    className={cn(
                        "p-1",
                        screenWidth > 768 ? "pr-2" : "!overflow-visible pb-2"
                    )}
                >
                    <Textarea
                        onChange={(e) => updatePrompt(e.target.value)}
                        value={state.prompt}
                        placeholder="Write a prompt to generate your unique video."
                        className={cn(
                            "h-full border border-border rounded-md resize-none",
                            screenWidth > 768 ? "" : "min-h-72"
                        )}
                    ></Textarea>
                </ResizablePanel>
                {screenWidth > 768 && (
                    <ResizableHandle withHandle className="bg-transparent" />
                )}
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
                                            ? "Video is processing in background..."
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
                                            // <Base64ImageView
                                            //     className={
                                            //         state.results.length > 1 ? "w-[40%]" : "w-full"
                                            //     }
                                            //     key={index}
                                            //     imgUrl={result}
                                            //     height={state.resultHeight}
                                            //     width={state.resultWidth}
                                            // />

                                            <VideoView
                                                className={state.results.length > 1 ? "w-[40%]" : "w-full"}
                                                key={index}
                                                videoUrl={result}
                                                height={state.upscale_height}
                                                width={state.upscale_width}
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
                            apiEndpoint="https://modelslab.com/api/v6/video/text2video"
                            isLoading={isSubmitting}
                            request={requestData}
                            response={responseData}
                        />
                    </>
                )}


            </ResizablePanelGroup>

            <div className="mx-1 flex gap-2 flex-col">
                {!isAuthenticated && (
                    <p className="text-xs text-muted-foreground flex gap-1 items-center">
                        <CircleAlert className="size-4" /> Sign in to run the model
                    </p>
                )}

                <div className="flex gap-2 items-center">
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? <LoaderCircle className="animate-spin" /> : "run"}
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
