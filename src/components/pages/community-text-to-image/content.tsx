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
  TextToImageCommunityRequestBodyProps,
  TextToImageCommunityResponse,
} from "@/lib/types/text-to-image-community";
import { cn } from "@/lib/utils";
import useApiKeyStore from "@/lib/zustand-states/apikey-store";
import useTextToImageCommunityStore from "@/lib/zustand-states/community-text-to-image/store";
import { CircleAlert, LoaderCircle, Zap } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Content = () => {
  const {
    state,
    updatePrompt,
    updateResults,
    updateResultHeight,
    updateResultWidth,
    updateHeight,
    updateWidth,
    updateSamples,
    updateEta,
    updateSeed,
    updateGuidanceScale,
    updateSteps,
    updateSafetyChecker,
  } = useTextToImageCommunityStore();

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

    const requestBody: TextToImageCommunityRequestBodyProps = {
      key: apiKey,
      prompt: state.prompt,
      negative_prompt: state.negative_prompt,
      model_id: state.model_id,
      scheduler: state.scheduler,
      safety_checker: state.safety_checker,
      width: state.width,
      height: state.height,
      guidance_scale: state.guidance_scale,
      num_inference_steps: state.num_inference_steps,
      seed: state.seed,
      steps: state.steps,
      samples: state.samples,
      full_url: state.full_url,
      instant_response: state.instant_response,
      tomesd: state.tomesd,
      free_u: state.free_u,
      upscale: state.upscale,
      multi_lingual: state.multi_lingual,
      panorama: state.panorama,
      self_attention: state.self_attention,
      use_karras_sigmas: state.use_karras_sigmas,
      algorithm_type: state.algorithm_type,
      safety_checker_type:
        state.safety_checker === "yes" ? state.safety_checker_type : "",
      embeddings: state.embeddings,
      vae: state.vae,
      lora: state.lora,
      enhance_prompt: false,
      lora_strength: state.lora_strength,
      clip_skip: state.clip_skip,
      temp: state.temp,
      base64: state.base64,
    };

    try {
      const response = await fetch(
        "https://modelslab.com/api/v6/images/text2img",
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

      const data: TextToImageCommunityResponse = await response.json();

      if (data.status === "error") {
        toast.error(data.message);
        setIsSubmitting(false);
        return;
      }

      if (data.status === "success") {
        toast.success("Image generated successfully");
        updateResults(data.output);

        if (data.meta.H && data.meta.W) {
          updateResultHeight(data.meta.H.toString());
          updateResultWidth(data.meta.W.toString());
        } else {
          updateResultHeight(state.height);
          updateResultWidth(state.width);
        }
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
        // updateResults(data.future_links);
        updateEta(data.eta);

        if (data.meta.H && data.meta.W) {
          updateResultHeight(data.meta.H.toString());
          updateResultWidth(data.meta.W.toString());
        } else {
          updateResultHeight(state.height);
          updateResultWidth(state.width);
        }

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
        setIsSubmitting(false);
      } else {
        toast.error("Something went wrong");
        setIsSubmitting(false);
      }
    }
  }

  function handleReset() {
    updatePrompt("");
    updateResults([]);
    updateResultHeight("");
    updateResultWidth("");
    updateHeight("1024");
    updateWidth("1024");
    updateSamples("1");
    updateGuidanceScale(7.5);
    updateSeed("0");
    updateSteps("21");
    updateSafetyChecker("yes");
  }
  return (
    <div
      className={cn("h-full p-2 pl-0.5 grid gap-1", "grid-rows-[auto_1fr] ")}
    >
      <ViewDemo
        videoUrl=""
        Icon={Zap}
        heading="Community (Text to Image)"
        subHeading="Click on 'View Demo' to watch a tutorial video and see
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
                    {" "}
                    {isProcessing
                      ? "Image is processing in background..."
                      : "Generating..."}{" "}
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
