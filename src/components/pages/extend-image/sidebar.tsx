"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import convertToBase64 from "@/lib/convert-to-base-64";
import useExtendImageStore from "@/lib/zustand-states/extend-image/store";

import { CircleAlert } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const Sidebar = () => {
  const { updateInitImage, updateHeight, updateWidth } = useExtendImageStore();

  const [preview, setPreview] = useState<string | null>(null);

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

  const [resolution, setResolution] = React.useState("1:1");

  const handleResolutionChnage = (e: string) => {
    setResolution(e);
    updateHeight(resolutions[e as "1:1" | "3:4" | "4:3"].height.toString());
    updateWidth(resolutions[e as "1:1" | "3:4" | "4:3"].width.toString());
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
            Extend Resolution
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
      </form>
    </ScrollArea>
  );
};

export default Sidebar;
