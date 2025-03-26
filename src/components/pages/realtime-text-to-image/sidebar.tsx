"use client";

import ButtonRadio from "@/components/ui/button-radio";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useTextToImageRealtimeStore from "@/lib/zustand-states/text-to-image-realtime/store";
import { CircleAlert } from "lucide-react";
import React from "react";

const Sidebar = () => {
  const { state, updateSamples, updateHeight, updateWidth } =
    useTextToImageRealtimeStore();

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
      </form>
    </ScrollArea>
  );
};

export default Sidebar;
