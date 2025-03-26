"use client";

import SelectModel from "@/components/select-model";
import { Button, buttonVariants } from "@/components/ui/button";
import ButtonRadio from "@/components/ui/button-radio";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import convertToBase64 from "@/lib/convert-to-base-64";
import { cn } from "@/lib/utils";
import useImageToImageCommunityStore from "@/lib/zustand-states/image-to-image-community/store";

import { ChevronDown, ChevronUp, CircleAlert, RefreshCcw } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const Sidebar = () => {
  const {
    state,
    updateSamples,
    updateInitImage,
    updateNumInferenceSteps,
    updateGuidanceScale,
    updateSeed,
    updateModelId,
    updateSafetyChecker,
    updateStrength,
  } = useImageToImageCommunityStore();

  const [isAdditionalSettingsOpen, setIsAdditionalSettingsOpen] =
    useState(false);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const base64 = await convertToBase64(file);
      updateInitImage(base64 as string);
    }
  };

  const samples = [
    {
      name: "1",
      value: "1",
    },
    {
      name: "2",
      value: "2",
    },
    {
      name: "3",
      value: "3",
    },
    {
      name: "4",
      value: "4",
    },
  ];

  const steps = [
    {
      name: "21",
      value: "21",
    },
    {
      name: "31",
      value: "31",
    },
    {
      name: "41",
      value: "41",
    },
  ];

  const handleSeedChange = () => {
    updateSeed(Math.floor(Math.random() * 100000).toString());
  };

  return (
    <ScrollArea className="h-full px-2 sm:px-4">
      <form className="space-y-5 py-2 sm:py-4" action="">
        <div className="space-y-3">
          <Label className="flex gap-2 items-center">
            Picture
            <Tooltip>
              <TooltipTrigger asChild>
                <CircleAlert className="text-muted-foreground size-4" />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Upload a initial image.</p>
              </TooltipContent>
            </Tooltip>
          </Label>
          <Input
            type="file"
            accept="image/*"
            name="init_image"
            onChange={handleImageChange}
          />
          {state.init_image && (
            <Image
              height={512}
              width={512}
              src={state.init_image}
              alt="Selected preview"
              className="mx-auto mt-2 rounded-lg"
            />
          )}
        </div>

        <div className="space-y-3">
          <Label className="flex gap-2 items-center">
            Number of Images
            <Tooltip>
              <TooltipTrigger asChild>
                <CircleAlert className="text-muted-foreground size-4" />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>The number of images to generate. Default value: 1</p>
              </TooltipContent>
            </Tooltip>
          </Label>
          <ButtonRadio
            items={samples}
            name="imgno"
            selectedValue={state.samples}
            setSelectedValue={updateSamples}
          />
        </div>

        <div className="space-y-3">
          <Label className="flex gap-2 items-center">
            Model
            <Tooltip>
              <TooltipTrigger asChild>
                {state.model_id && (
                  <div className="bg-muted p-1 rounded-md w-20 whitespace-nowrap overflow-hidden text-ellipsis">
                    {state.model_id}
                  </div>
                )}
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{state.model_id}</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <CircleAlert className="text-muted-foreground size-4" />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>The model used to generate images.</p>
              </TooltipContent>
            </Tooltip>
          </Label>
          {/* todo:  */}
          <SelectModel updateFunction={updateModelId} />
        </div>

        <div className="space-y-3">
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
          <div className="space-y-3">
            <Label className="flex gap-2 items-center">
              Guidance Scale
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleAlert className="text-muted-foreground size-4" />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>
                    The Guidance Scale of the image generations. Default value:
                    7.5
                  </p>
                </TooltipContent>
              </Tooltip>
            </Label>

            <div className="flex items-center gap-2">
              <span className="text-xs from-muted-foreground">3</span>
              <Slider
                min={3}
                max={15}
                value={[state.guidance_scale]} // Ensure value is an array
                onValueChange={(value) => updateGuidanceScale(value[0])}
                step={0.1}
              />
              <span className="text-xs from-muted-foreground">15</span>
              <p
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "icon",
                  }),
                  "aspect-square"
                )}
              >
                {state.guidance_scale}
              </p>
            </div>

            <Label className="flex gap-2 items-center">
              Image Strength
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleAlert className="text-muted-foreground size-4" />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>
                    The Image Strength of the image generations. Default value:
                    0.7
                  </p>
                </TooltipContent>
              </Tooltip>
            </Label>

            <div className="flex items-center gap-2">
              <span className="text-xs from-muted-foreground">0</span>
              <Slider
                min={0}
                max={1}
                value={[state.strength]} // Ensure value is an array
                onValueChange={(value) => updateStrength(value[0])}
                step={0.01}
              />
              <span className="text-xs from-muted-foreground">1</span>
              <p
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "icon",
                  }),
                  "aspect-square"
                )}
              >
                {state.strength}
              </p>
            </div>

            <div className="space-y-3">
              <Label className="flex gap-2 items-center">
                Steps
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CircleAlert className="text-muted-foreground size-4" />
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>The number of denoising steps.</p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <ButtonRadio
                items={steps}
                name="steps"
                selectedValue={state.num_inference_steps}
                setSelectedValue={updateNumInferenceSteps}
              />
            </div>

            <div className="space-y-3">
              <Label className="flex gap-2 items-center">
                Seed
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CircleAlert className="text-muted-foreground size-4" />
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>The same seed will generate the same image again.</p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={state.seed}
                  onChange={(e) => updateSeed(e.target.value)}
                  placeholder="12345"
                />
                <Button
                  onClick={handleSeedChange}
                  variant={"outline"}
                  size={"icon"}
                  className="aspect-square"
                  type="button"
                >
                  <RefreshCcw />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="flex gap-2 items-center">
                Enable Safety Checker
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CircleAlert className="text-muted-foreground size-4" />
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>
                      A checker for NSFW images. If detected, such images will
                      be replaced by a blank image. Default is &quot;yes&quot;.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <Switch
                id="safety_checker"
                checked={state.safety_checker === "yes" ? true : false}
                onCheckedChange={(e) =>
                  updateSafetyChecker(e === true ? "yes" : "no")
                }
              />
            </div>
          </div>
        )}
      </form>
    </ScrollArea>
  );
};

export default Sidebar;
