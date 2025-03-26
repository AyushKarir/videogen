"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import convertToBase64 from "@/lib/convert-to-base-64";
import { cn } from "@/lib/utils";
import useSketchToImageStore from "@/lib/zustand-states/sketch-to-image/store";
import { ChevronDown, ChevronUp, CircleAlert } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const Sidebar = () => {
  const { state, updateInitImage, updateControlnetConditioningScale } = useSketchToImageStore();

  const [preview, setPreview] = useState<string | null>(null);
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

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <ScrollArea className="h-full px-2 sm:px-4">
      <form className="space-y-5 py-2 sm:py-4" action="">
        <div className="space-y-3">
          <Label className="flex gap-2 items-center">
            Upload Sketch
            <Tooltip>
              <TooltipTrigger asChild>
                <CircleAlert className="text-muted-foreground size-4" />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Upload a initial sketch.</p>
              </TooltipContent>
            </Tooltip>
          </Label>
          <Input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleImageChange}
          />
          {preview && (
            <Image
              height={512}
              width={512}
              src={preview}
              alt="Selected preview"
              className="mx-auto mt-2 rounded-lg"
            />
          )}
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
                Control Strength
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CircleAlert className="text-muted-foreground size-4" />
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>
                      The Control Strength of the image generations. Default
                      value: 0.9
                    </p>
                  </TooltipContent>
                </Tooltip>
              </Label>

              <div className="flex items-center gap-2">
                <span className="text-xs from-muted-foreground">0</span>
                <Slider
                  min={0}
                  max={1}
                  value={[Number(state.controlnet_conditioning_scale)]}
                  onValueChange={(value) => updateControlnetConditioningScale(value[0].toString())}
                  step={0.1}
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
                  {state.controlnet_conditioning_scale}
                </p>
              </div>
            </div>
          )}
        </div>
      </form>
    </ScrollArea>
  );
};

export default Sidebar;
