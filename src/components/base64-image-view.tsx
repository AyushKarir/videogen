import React, { useEffect, useState } from "react";
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
  isBase64String?: boolean;
};

const Base64ImageView = ({ imgUrl, height, width, className, isBase64String }: Props) => {
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState(0);
  const [base64Url, setBase64Url] = useState("");

  function handleDownload() {
    if (base64Url.startsWith("data:image/")) {
      const link = document.createElement("a");
      link.href = base64Url;
      link.download = "image-modelslab.jpg";
      link.click();
    } else {
      downloadFile(base64Url, "image-modelslab", "jpg");
    }
  }

  const getImage = async () => {
    try {
      const response = await fetch(imgUrl);
      const data = await response.text();

      if (data) {
        if (isBase64String) {
          setBase64Url(data);
        } else {
          setBase64Url("data:image/png;base64," + data);
        }
        setLoading(false);
        setKey((prevKey) => prevKey + 1); // Update key to force re-render
      } else {
        getImage();
      }
    } catch (error) {
      getImage();
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getImage();
  }, [imgUrl]);

  return (
    <div className={`relative ${className} ${loading && "!h-52 !w-52"}`}>
      {loading && (
        <Skeleton
          className={`rounded-lg absolute flex items-center justify-center h-52 w-52`}
        >
          <LoaderCircle className="animate-spin" />
        </Skeleton>
      )}
      {base64Url && (
        <img
          key={key} // Add key to force re-render
          src={base64Url}
          alt="Result Image"
          className={`rounded-lg h-full w-full object-cover ${
            loading ? "hidden" : ""
          }`}
          height={parseInt(height)}
          width={parseInt(width)}
        />
      )}
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
              {base64Url && (
                <img
                  key={key}
                  src={base64Url}
                  alt="Result Image"
                  className="rounded-lg h-full w-full object-cover"
                  height={parseInt(height)}
                  width={parseInt(width)}
                />
              )}
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Base64ImageView;
