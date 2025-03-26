"use client";

import ButtonRadio from "@/components/ui/button-radio";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import convertToBase64 from "@/lib/convert-to-base-64";
import useImageToImageRealtimeStore from "@/lib/zustand-states/image-to-image-realtime/store";
import { CircleAlert } from "lucide-react";
import Image from "next/image";
import React from "react";

const Sidebar = () => {
  const { state, updateSamples, updateInitImage } =
    useImageToImageRealtimeStore();

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
      </form>
    </ScrollArea>
  );
};

export default Sidebar;
