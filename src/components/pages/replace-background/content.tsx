"use client";

import AvgGenTime from "@/components/avg-gen-time";
import ImageView from "@/components/image-view";
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
  ReplaceBackgroundInpaintingRequestBodyProps,
  ReplaceBackgroundMaskImageRequestBodyProps,
  ReplaceBackgroundResponse,
} from "@/lib/types/replace-background";

import uploadAndGetUrl from "@/lib/upload-and-get-url";
import { cn } from "@/lib/utils";
import useApiKeyStore from "@/lib/zustand-states/apikey-store";
import useReplaceBackgroundStore from "@/lib/zustand-states/replace-background/store";
import { CircleAlert, Eraser, LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Content = () => {
  const {
    state,
    updateResults,
    updateResultHeight,
    updateResultWidth,
    updatePrompt,
    updateEta,
  } = useReplaceBackgroundStore();

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
    updateResults([]);
    updateResultHeight("1024");
    updateResultWidth("1024");
  }

  async function getResult(init_image: string, result: string) {


    const imageBase64 = await fetch(result).then((res) => res.text());

    const requestBody: ReplaceBackgroundInpaintingRequestBodyProps = {
      key: apiKey as string,
      prompt: state.prompt,
      negative_prompt: state.negative_prompt,
      init_image: init_image,
      mask_image: imageBase64,
      width: state.width,
      height: state.height,
      samples: state.samples,
      num_inference_steps: state.num_inference_steps,
      safety_checker: "no",
      enhance_prompt: state.enhance_prompt,
      guidance_scale: state.guidance_scale,
      strength: state.strength,
      base64: state.base64,
      seed: state.seed,
      webhook: state.webhook,
      track_id: state.track_id,
    };

    try {
      const response = await fetch(
        "https://modelslab.com/api/v6/image_editing/inpaint",
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

      const data: ReplaceBackgroundResponse = await response.json();

      
      if (data.status === "error" || data.status === "failed") {
        toast.error(data.message);
        setIsSubmitting(false);
        return;
      }

      if (data.status === "success") {
        toast.success("Image generated successfully");
        updateEta(data.generationTime);
        updateResults(data.output);
      }

      if (data.status === "processing") {
        toast.warning("Your image is processing in background.");
        // updateResults(data.future_links);
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
            } else {
              setTimeout(() => checkAccessibility(url), 5000);
            }
          } catch {
            setTimeout(() => checkAccessibility(url), 5000);
          }
        };

        checkAccessibility(data.fetch_result);
      }
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
    setIsSubmitting(false);
  }

  async function handleSubmit() {
    setIsSubmitting(true);

    if (!apiKey) {
      toast.error("Please sign in to run the model.");
      setIsSubmitting(false);
      return;
    }

    if (!state.image && state.image.length <= 0) {
      toast.error("Please provide initial image.");
      setIsSubmitting(false);
      return;
    }

    // const initImageUrlRes = await uploadAndGetUrl(apiKey, state.image);

    // if (initImageUrlRes.status === "error") {
    //   toast.error(initImageUrlRes.message);
    //   setIsSubmitting(false);
    //   return;
    // }

    const requestBody: ReplaceBackgroundMaskImageRequestBodyProps = {
      key: apiKey,
      image: state.image,
      seed: null,
      post_process_mask: state.post_process_mask,
      only_mask: state.only_mask,
      inverse_mask: state.inverse_mask,
      alpha_matting: state.alpha_matting,
      webhook: state.webhook,
      base64: state.base64,
      track_id: state.track_id,
    };

    try {
      const response = await fetch(
        "https://modelslab.com/api/v6/image_editing/removebg_mask",
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

      const data: ReplaceBackgroundResponse = await response.json();

      if (data.status === "error" || data.status === "failed") {
        toast.error(data.message);
        setIsSubmitting(false);
        return;
      }

      if (data.status === "success") {
        getResult(state.image, data.output[0]);
      }

      if (data.status === "processing") {
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
              getResult(state.image, result.output[0]);
            } else if (result.status === "failed") {
              toast.error(result.message || "failed to generate image");
              setIsSubmitting(false);
            } else {
              setTimeout(() => checkAccessibility(url), 5000);
            }
          } catch {
            setTimeout(() => checkAccessibility(url), 5000);
          }
        };

        checkAccessibility(data.fetch_result);
      }
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

  return (
    <div className={cn("h-full p-2 pl-0.5 grid gap-1", "grid-rows-[auto_1fr]")}>
      <ViewDemo
        videoUrl=""
        Icon={Eraser}
        heading="Replace Background"
        subHeading="Click on 'Replace Background' to replace background of your image."
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
                      <ImageView
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
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Replace Background"
            )}
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
