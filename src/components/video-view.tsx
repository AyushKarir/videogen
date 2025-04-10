import React, { useEffect, useState, useRef, useCallback } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Download, LoaderCircle, ScanEye, AlertTriangle } from "lucide-react";
import downloadFile from "@/lib/download-file";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";

type Props = {
    videoUrl: string;
    height: number;
    width: number;
    className: string;
};

const VideoView = ({ videoUrl, height, width, className }: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [key, setKey] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Memoize the reset function
    const resetVideoState = useCallback(() => {
        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Reset states
        setLoading(true);
        setError(null);
        setKey(prevKey => prevKey + 1);

        // Set a new timeout
        timeoutRef.current = setTimeout(() => {
            setLoading(false);
            setError("Video loading timed out");
        }, 10000);
    }, []);

    // Use the memoized function in useEffect
    useEffect(() => {
        resetVideoState();

        // Cleanup function
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [videoUrl, resetVideoState]);

    function handleDownload() {
        downloadFile(videoUrl, "video-modelslab", "mp4");
    }

    const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        console.error("Video loading error:", e);
        setError("Could not load video. Please check URL or format.");
        setLoading(false);

        // Clear timeout on error
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const handleVideoLoad = () => {
        console.log("Video loaded successfully:", videoUrl);
        setLoading(false);
        setError(null);

        // Clear timeout on successful load
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    return (
        <div className={`relative ${className} min-h-52 min-w-52`}>
            {loading && (
                <Skeleton
                    className="rounded-lg absolute flex items-center justify-center h-52 w-52"
                >
                    <LoaderCircle className="animate-spin" />
                </Skeleton>
            )}

            {error && (
                <div className="rounded-lg absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-red-500 p-2">
                    <AlertTriangle size={24} />
                    <p className="text-xs text-center mt-2">{error}</p>
                    <p className="text-xs mt-1 break-all overflow-hidden">{videoUrl}</p>
                </div>
            )}

            {videoUrl && (
                <video
                    ref={videoRef}
                    key={key}
                    src={videoUrl}
                    controls
                    autoPlay
                    className={`rounded-lg h-full w-full object-cover ${loading || error ? "opacity-0" : "opacity-100"}`}
                    height={height}
                    width={width}
                    onLoadedData={handleVideoLoad}
                    onError={handleVideoError}
                />
            )}

            <div className="absolute top-1 right-1 flex gap-1">
                <Button
                    variant={"outline"}
                    disabled={loading || !!error}
                    size={"icon"}
                    onClick={handleDownload}
                >
                    <Download />
                </Button>
                <Dialog>
                    <DialogTrigger className="relative" asChild>
                        <Button disabled={loading || !!error} variant={"outline"} size={"icon"}>
                            <ScanEye />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="">
                        <DialogHeader>
                            <DialogTitle>{error ? "Error Loading Video" : "Video Preview"}</DialogTitle>
                            <DialogDescription>
                                {error ? error : "Full size video preview"}
                            </DialogDescription>
                        </DialogHeader>
                        <ScrollArea className="max-h-screen overflow-auto">
                            {!error && videoUrl && (
                                <video
                                    key={key}
                                    src={videoUrl}
                                    controls
                                    className="rounded-lg h-full w-full object-contain"
                                    height={height}
                                    width={width}
                                />
                            )}
                            {error && (
                                <div className="p-4 text-center">
                                    <AlertTriangle size={48} className="mx-auto mb-4 text-red-500" />
                                    <p>{error}</p>
                                    <p className="text-sm break-all mt-2">{videoUrl}</p>
                                </div>
                            )}
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default VideoView;