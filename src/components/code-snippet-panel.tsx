import React, { useState } from "react";
import { Button } from "./ui/button";
import { Copy, Check } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Prism as SyntaxHighlighterPrism } from "react-syntax-highlighter";
import {
    coldarkCold,
    coldarkDark,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useTheme } from "next-themes";
import {
    buildApiRequestCodeSnippet,
    SupportedLanguage,
} from "@/lib/code-snippet-builder";

// Use the imported type directly
const SyntaxHighlighter = SyntaxHighlighterPrism;

type Props = {
    request: string;
    apiEndpoint: string;
};

const CodeSnippetPanel = ({ request, apiEndpoint }: Props) => {
    const { resolvedTheme } = useTheme();
    const [language, setLanguage] = useState<SupportedLanguage>("javascript");
    const [copied, setCopied] = useState(false);

    // Generate the code snippet based on selected language
    const codeSnippet = buildApiRequestCodeSnippet(
        apiEndpoint,
        request,
        language
    );

    const handleCopyCode = async () => {
        try {
            await navigator.clipboard.writeText(codeSnippet);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy code:", err);
        }
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={"outline"}>View Snippet</Button>
                </DialogTrigger>
                <DialogContent className="w-auto min-w-96 max-h-[90vh] overflow-auto max-w-[90vw]">
                    <DialogHeader>
                        <DialogTitle>Code Snippet</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Select Language</p>

                        <Select
                            defaultValue={language}
                            onValueChange={(val) => setLanguage(val as SupportedLanguage)}
                        >
                            <SelectTrigger className="w-32 bg-background">
                                <SelectValue placeholder="Language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="javascript">JavaScript</SelectItem>
                                <SelectItem value="php">PHP</SelectItem>
                                <SelectItem value="python">Python</SelectItem>
                                <SelectItem value="go">Go</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="hi min-h-32 border border-border rounded-md overflow-auto relative">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 bg-background/80 hover:bg-background/80"
                            onClick={handleCopyCode}
                            title="Copy to clipboard"
                        >
                            {copied ? (
                                <Check className="h-4 w-4" />
                            ) : (
                                <Copy className="h-4 w-4" />
                            )}
                        </Button>
                        <SyntaxHighlighter
                            language={language}
                            style={resolvedTheme === "dark" ? coldarkDark : coldarkCold}
                            showLineNumbers
                            customStyle={{
                                height: "100%",
                                backgroundColor: resolvedTheme === "dark" ? "transparent" : "",
                                margin: 0,
                            }}
                        >
                            {request.length > 0 ? codeSnippet : "make a request"}
                        </SyntaxHighlighter>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CodeSnippetPanel;
