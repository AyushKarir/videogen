"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import convertToBase64 from "@/lib/convert-to-base-64";
import useEnhanceImageStore from "@/lib/zustand-states/enhance-image/store";
import { CircleAlert } from "lucide-react";
import Image from "next/image";
import React from "react";

const Sidebar = () => {
  const { state, updateInitImage, updateScale, updateModelId } =
    useEnhanceImageStore();

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const base64 = await convertToBase64(file);

      updateInitImage(base64 as string);
    }
  };

  const handleQualityChange = (value: string) => {
    switch (value) {
      case "1":
        updateScale(2);
        break;
      case "2":
        updateScale(3);
        break;
      case "3":
        updateModelId("ultra_resolution");
        break;
      case "4":
        updateScale(2);
        updateModelId("ultra_resolution");
        break;
      case "5":
        updateScale(3);
        updateModelId("ultra_resolution");
        break;
    }
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
            name="image"
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
            Quality
            <Tooltip>
              <TooltipTrigger asChild>
                <CircleAlert className="text-muted-foreground size-4" />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Select quality for Enhanced Image.</p>
              </TooltipContent>
            </Tooltip>
          </Label>
          <Select onValueChange={handleQualityChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an quality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Upscale to 2x</SelectItem>
              <SelectItem value="2">Upscale to 3x</SelectItem>
              <SelectItem value="3">Enhance Details (AI-powered)</SelectItem>
              <SelectItem value="4">Enhance 2x (AI-powered)</SelectItem>
              <SelectItem value="5">Enhance 3x (AI-powered)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </form>
    </ScrollArea>
  );
};

export default Sidebar;
