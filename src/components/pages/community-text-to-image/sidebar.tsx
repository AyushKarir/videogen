"use client";

import SelectModel from "@/components/select-model";
import { Button, buttonVariants } from "@/components/ui/button";
import ButtonRadio from "@/components/ui/button-radio";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import useTextToImageCommunityStore from "@/lib/zustand-states/community-text-to-image/store";
import { ChevronDown, ChevronUp, CircleAlert, RefreshCcw } from "lucide-react";
import React, { useState } from "react";

const Sidebar = () => {
  const {
    state,
    updateSamples,
    updateHeight,
    updateWidth,
    updateSteps,
    updateGuidanceScale,
    updateSafetyChecker,
    updateSeed,
    updateModelId,
  } = useTextToImageCommunityStore();

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

  const resolutions = {
    "1:1": {
      width: 1024,
      height: 1024,
    },
    "3:4": {
      width: 768,
      height: 1024,
    },
    "4:3": {
      width: 1024,
      height: 768,
    },
  };

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

  const [resolution, setResolution] = React.useState("1:1");
  const [isAdditionalSettingsOpen, setIsAdditionalSettingsOpen] =
    useState(false);
  const handleResolutionChnage = (e: string) => {
    setResolution(e);
    updateHeight(resolutions[e as "1:1" | "3:4" | "4:3"].height.toString());
    updateWidth(resolutions[e as "1:1" | "3:4" | "4:3"].width.toString());
  };

  const handleSeedChange = () => {
    updateSeed(Math.floor(Math.random() * 100000).toString());
  };

  return (
    <ScrollArea className="h-full px-2 sm:px-4">
      <form className="space-y-5 py-2 sm:py-4" action="">
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
            Resolution
            <Tooltip>
              <TooltipTrigger asChild>
                <CircleAlert className="text-muted-foreground size-4" />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>The resolutions of images to generate.</p>
              </TooltipContent>
            </Tooltip>
          </Label>
          <Tabs
            defaultValue="1:1"
            onValueChange={handleResolutionChnage}
            value={resolution}
            className=""
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="1:1">1:1</TabsTrigger>
              <TabsTrigger value="3:4">3:4</TabsTrigger>
              <TabsTrigger value="4:3">4:3</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-3">
          <Label className="flex gap-2 items-center">
            Model{" "}
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
          <Label className="flex gap-2 items-center">
            Additional Settings
            <Tooltip>
              <TooltipTrigger asChild>
                <CircleAlert className="text-muted-foreground size-4" />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>More settings.</p>
              </TooltipContent>
            </Tooltip>
          </Label>
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
                      The Guidance Scale of the image generations. Default
                      value: 7.5
                    </p>
                  </TooltipContent>
                </Tooltip>
              </Label>

              <div className="flex items-center gap-2">
                <span className="text-xs from-muted-foreground">3</span>
                <Slider
                  min={3}
                  max={15}
                  value={[state.guidance_scale]}
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
                  selectedValue={state.steps}
                  setSelectedValue={updateSteps}
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
                        be replaced by a blank image. Default is
                        &quot;yes&quot;.
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
                />{" "}
              </div>
            </div>
          )}
        </div>
      </form>
    </ScrollArea>
  );
};

export default Sidebar;
