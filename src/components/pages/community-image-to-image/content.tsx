"use client";

import AvgGenTime from "@/components/avg-gen-time";
import Base64ImageView from "@/components/base64-image-view";
import { useResize } from "@/components/resize-context";
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
import ViewDemo from "@/components/view-demo";
import {
  ImageToImageCommunityRequestBodyProps,
  ImageToImageCommunityResponse,
} from "@/lib/types/image-to-image-community";

import { cn } from "@/lib/utils";
import useApiKeyStore from "@/lib/zustand-states/apikey-store";
import useImageToImageCommunityStore from "@/lib/zustand-states/image-to-image-community/store";

import { CircleAlert, ImageMinus, LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Content = () => {
  const {
    state,
    updatePrompt,
    updateResults,
    updateResultHeight,
    updateResultWidth,
    updateSamples,
    updateEta,
    updateGuidanceScale,
    updateSeed,
    updateNumInferenceSteps,
    updateSafetyChecker,
    updateInitImage,
  } = useImageToImageCommunityStore();

  const { screenWidth } = useResize();
  const { apiKey } = useApiKeyStore();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (apiKey) {
      setIsAuthenticated(true);
    }
  }, [apiKey]);

  function handleReset() {
    updatePrompt("");
    updateResults([]);
    updateResultHeight("");
    updateResultWidth("");
    updateSamples("1");
    updateGuidanceScale(7.5);
    updateSeed("0");
    updateNumInferenceSteps("31");
    updateSafetyChecker("yes");
    updateInitImage("");
  }

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

    if (!state.init_image && state.init_image.length <= 0) {
      toast.error("Please provide initial image.");
      setIsSubmitting(false);
      return;
    }

    // todo: add strength in sidebar
    const requestBody: ImageToImageCommunityRequestBodyProps = {
      key: apiKey,
      model_id: state.model_id,
      prompt: state.prompt,
      negative_prompt: "",
      init_image:
        state.model_id === "flux"
          ? state.init_image.split("data:image/jpeg;base64,")[1]
          : state.init_image,
      samples: state.samples,
      num_inference_steps: state.num_inference_steps,
      safety_checker: state.safety_checker,
      safety_checker_type:
        state.safety_checker === "yes" ? state.safety_checker_type : "",
      enhance_prompt: state.enhance_prompt,
      guidance_scale: state.guidance_scale,
      strength: state.strength,
      scheduler: state.scheduler,
      seed: state.seed === "0" ? null : state.seed,
      lora_model: null,
      tomesd: state.tomesd,
      use_karras_sigmas: state.use_karras_sigmas,
      vae: null,
      lora_strength: null,
      base64: "yes",
      embeddings_model: null,
      webhook: null,
      track_id: null,
    };

    try {
      const response = await fetch(
        "https://modelslab.com/api/v6/images/img2img",
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

      const data: ImageToImageCommunityResponse = await response.json();

      if (data.status === "error") {
        toast.error(data.message);
        setIsSubmitting(false);
        return;
      }

      if (data.status === "success") {
        toast.success("Image generated successfully");
        updateResults(data.output);
        updateEta(data.generationTime);
      }

      if (data.status === "failed") {
        toast.error(data.message || "failed to generate image");
        setIsProcessing(false);
        return;
      }

      if (data.status === "processing") {
        setIsProcessing(true);
        toast.warning("Your image is processing in background.");
        updateEta(data.eta);
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

        toast.error(error.message);
        setIsSubmitting(false);
      } else {
        toast.error("Something went wrong");
        setIsSubmitting(false);
      }
    }
  }

  return (
    <div
      className={cn("h-full p-2 pl-0.5 grid gap-1", "grid-rows-[auto_1fr] ")}
    >
      <ViewDemo
        videoUrl=""
        Icon={ImageMinus}
        heading="Community (Image to Image)"
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
            placeholder="Write a prompt to generate your unique image."
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
                      <Base64ImageView
                        className={
                          state.results.length > 1 ? "w-[40%]" : "w-full"
                        }
                        key={index}
                        imgUrl={result}
                        height={state.resultHeight}
                        width={state.resultWidth}
                      />
                    ))}
                  </div>
                </ScrollArea>
              )}
            </div>
          </div>
        </ResizablePanel>
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
