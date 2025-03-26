import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Download, LoaderCircle, ScanEye } from "lucide-react";
import downloadFile from "@/lib/download-file";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";

type Props = {
  imgUrl: string;
  height: string;
  width: string;
  className: string;
};

const ImageView = ({ imgUrl, height, width, className }: Props) => {
  function handleDownload() {
    downloadFile(imgUrl, "image - modelslab", "jpg");
  }

  const [loading, setLoading] = useState(true);

  return (
    <div className={`relative ${className} ${loading && "!h-52 !w-52"}`}>
      {loading && (
        <Skeleton
          className={`rounded-lg absolute flex items-center justify-center h-52 w-52`}
        >
          <LoaderCircle className="animate-spin" />
        </Skeleton>
      )}
      <img
        onLoad={() => setLoading(false)}
        src={imgUrl}
        alt="Result Image"
        className={`rounded-lg h-full w-full object-cover ${
          loading ? "hidden" : ""
        }`}
        height={parseInt(height)}
        width={parseInt(width)}
      />
      <div className="absolute top-1 right-1 flex gap-1">
        <Button
          variant={"outline"}
          disabled={loading}
          size={"icon"}
          onClick={handleDownload}
        >
          <Download />
        </Button>
        <Dialog>
          <DialogTrigger className="relative" asChild>
            <Button disabled={loading} variant={"outline"} size={"icon"}>
              <ScanEye />
            </Button>
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-screen overflow-auto">
              <img
                onLoad={() => setLoading(false)}
                src={imgUrl}
                alt="Result Image"
                className="rounded-lg h-full w-full object-cover"
                height={parseInt(height)}
                width={parseInt(width)}
              />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ImageView;
