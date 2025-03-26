import { X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
    DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  heading: string;
  subHeading: string;
  videoUrl: string;
};

const ViewDemo = ({ Icon, heading, subHeading, videoUrl }: Props) => {
  console.log(videoUrl);

  const [demoOpen, setDemoOpen] = useState(true);

  return (
    <div
      className={cn(
        "mx-1 border border-border rounded-md flex justify-between items-center flex-col sm:flex-row gap-3 p-2",
        !demoOpen && "h-0 overflow-hidden p-0 border-none"
      )}
    >
      <div className="flex gap-2 sm:w-fit w-full items-start">
        <Icon className="size-4" />
        <div className="flex flex-col gap-1">
          <h4 className="font-bold text-sm">{heading}</h4>
          <p className="text-xs">{subHeading}</p>
        </div>
      </div>

      <div className="flex items-center justify-between sm:w-fit w-full gap-2">
        {/* todo: add video player */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>View Demo</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{heading}</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">demo videos comming soon...</div>
          </DialogContent>
        </Dialog>

        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => setDemoOpen(false)}
        >
          <X />
        </Button>
      </div>
    </div>
  );
};

export default ViewDemo;
