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
import useAvatarGeneratorStore from "@/lib/zustand-states/avatar-generator/store";
import { CircleAlert } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const Sidebar = () => {
  const {
    state,
    updateSamples,
    updateInitImage,
  } = useAvatarGeneratorStore();

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

        <div className="space-y-3 pointer-events-none opacity-50">
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

        {/* <div className="space-y-3">
          <Label className="flex gap-2 items-center">
            Model
            <Tooltip>
              <TooltipTrigger asChild>
                <CircleAlert className="text-muted-foreground size-4" />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>The model used to generate image.</p>
              </TooltipContent>
            </Tooltip>
          </Label>
          <div className="mt-2 flex gap-2 items-center">
            realistic-vision-51 <Badge variant={"secondary"}>default</Badge>
          </div>
        </div> */}
      </form>
    </ScrollArea>
  );
};

export default Sidebar;
