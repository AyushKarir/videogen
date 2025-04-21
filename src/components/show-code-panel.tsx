import React, { useState } from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "./ui/resizable";
import { cn } from "@/lib/utils";
import { useResize } from "./resize-context";

import { Button } from "./ui/button";
import { Prism as SyntaxHighlighterPrism } from "react-syntax-highlighter";
import {
    coldarkCold,
    coldarkDark,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CopyIcon, CheckIcon, LoaderCircle } from "lucide-react";
import { useTheme } from "next-themes";
import CodeSnippetPanel from "./code-snippet-panel";
import { Badge } from "./ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

// Use the imported type directly
const SyntaxHighlighter = SyntaxHighlighterPrism;

/**
 * Replaces base64 strings with a placeholder for display purposes
 */
function replaceBase64Strings(jsonString: string): string {
    // Regex to detect base64 data URLs
    const base64Regex = /"data:([^;]+);base64,([^"]+)"/g;

    // Replace all base64 strings with a placeholder
    return jsonString.replace(base64Regex, '"<base 64 string>"');
}

type Props = {
    request: string;
    response: string;

    apiEndpoint: string;
    isLoading: boolean;
};

const ShowCodePanel = ({
    request,
    response,
    apiEndpoint,
    isLoading,
}: Props) => {
    const { screenWidth } = useResize();
    const [copied, setCopied] = useState<"none" | "request" | "response">("none");

    const { resolvedTheme } = useTheme();

    // Process strings for display
    const displayRequest =
        request.length > 0 ? replaceBase64Strings(request) : "make a request";
    const displayResponse =
        response.length > 0 ? replaceBase64Strings(response) : "make a request";

    const copyToClipboard = (text: string, type: "request" | "response") => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied("none"), 2000);
    };

    return (
        <ResizablePanel
            defaultSize={30}
            minSize={20}
            maxSize={80}
            className={cn(
                "p-1 relative",
                screenWidth > 768 ? "hide-scrollbar pl-2" : "!overflow-visible pt-2"
            )}
        >
            <div className="absolute left-4 top-4 z-10">
                <CodeSnippetPanel apiEndpoint={apiEndpoint} request={request} />
            </div>
            <ResizablePanelGroup direction={"vertical"} className="h-full">
                <ResizablePanel
                    className={cn(screenWidth > 768 ? "pb-2" : "!overflow-visible pt-2")}
                >
                    <div
                        className={cn(
                            "relative h-full border border-border rounded-md overflow-auto",
                            screenWidth < 768 ? "min-h-96" : ""
                        )}
                    >
                        <div className="absolute flex items-center gap-2 right-2 top-2 z-10">
                            <Badge variant={"secondary"}>request</Badge>
                            <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => copyToClipboard(request, "request")}
                            >
                                {copied === "request" ? (
                                    <CheckIcon size={16} />
                                ) : (
                                    <CopyIcon size={16} />
                                )}
                            </Button>
                        </div>

                        <div className="mt-14 w-full px-2">
                            <div className="flex bg-secondary gap-1 items-center rounded-md p-1 overflow-hidden text-ellipsis">
                                <Badge variant={"outline"} className="bg-background">
                                    POST
                                </Badge>{" "}
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="text-ellipsis text-sm">{apiEndpoint}</div>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                        <p>{apiEndpoint}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </div>

                        <SyntaxHighlighter
                            language={"json"}
                            style={resolvedTheme === "dark" ? coldarkDark : coldarkCold}
                            showLineNumbers
                            customStyle={{
                                height: "100%",
                                backgroundColor: resolvedTheme === "dark" ? "transparent" : "",
                                margin: 0,
                                paddingTop: "5px",
                            }}
                        >
                            {displayRequest}
                        </SyntaxHighlighter>
                    </div>
                </ResizablePanel>
                {screenWidth > 768 && (
                    <ResizableHandle className="bg-transparent" withHandle />
                )}
                <ResizablePanel
                    className={cn(screenWidth > 768 ? "pt-2" : "!overflow-visible pt-2")}
                >
                    <div
                        className={cn(
                            "relative h-full border border-border rounded-md overflow-auto",
                            screenWidth < 768 ? "min-h-96" : ""
                        )}
                    >
                        {isLoading ? (
                            <div className="h-full w-full flex justify-center items-center">
                                <LoaderCircle className="animate-spin" />
                            </div>
                        ) : (
                            <>
                                <div className="absolute flex items-center gap-2 right-2 top-2 z-10">
                                    <Badge variant={"secondary"}>response</Badge>

                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        onClick={() => copyToClipboard(response, "response")}
                                    >
                                        {copied === "response" ? (
                                            <CheckIcon size={16} />
                                        ) : (
                                            <CopyIcon size={16} />
                                        )}
                                    </Button>
                                </div>
                                <SyntaxHighlighter
                                    language={"json"}
                                    style={resolvedTheme === "dark" ? coldarkDark : coldarkCold}
                                    showLineNumbers
                                    customStyle={{
                                        height: "100%",
                                        backgroundColor:
                                            resolvedTheme === "dark" ? "transparent" : "",
                                        margin: 0,
                                    }}
                                >
                                    {displayResponse}
                                </SyntaxHighlighter>
                            </>
                        )}
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </ResizablePanel>
    );
};

export default ShowCodePanel;
