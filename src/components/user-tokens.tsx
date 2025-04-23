import React, { useEffect, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { CircleArrowUp, LoaderCircle, Sparkle } from "lucide-react";
import { toast } from "sonner";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import useApiKeyStore from "@/lib/zustand-states/apikey-store";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

const UserTokens = () => {
  const [tokens, setTokens] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState<null | string>(null);

  const { apiKey } = useApiKeyStore();

  async function getuserTokens() {
    if (apiKey) {
      const response = await fetch("/api/user-tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: apiKey }),
      });

      const result = await response.json();

      if (result.status === "error") {
        toast.error("faild to fetch api calls", {
          description: "Try logging in again!",
        });
        setIsLoading(false);
        setErr("Failed!");
      }

      if (result.status === "success") {
        if (result.data.trial) {
          setTokens(result.data.trial.api_call_remaining);
          setErr("Free Plan!");
        } else if (result.is_paid_user === false) {
          setErr("Free Plan!");
        } else if (result.data.imagen) {
          setTokens(result.data.imagen.api_call_remaining);
        } else {
          setTokens(0);
          setErr("Free Plan!");
        }
        setIsLoading(false);
      }

      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getuserTokens();
  }, [apiKey]);

  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger asChild>
        <Button variant="outline" className="gap-1">
          <Sparkle />{" "}
          {isLoading ? (
            <span className="animate-spin">
              <LoaderCircle className="size-4" />
            </span>
          ) : (
            <span className="hidden sm:block">
              {tokens}{" "}
              {err && (
                <Badge className="hidden md:inline-block" variant={"secondary"}>
                  {err}
                </Badge>
              )}
            </span>
          )}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="px-3 py-2 w-full sm:whitespace-nowrap ">
        <div className="flex items-center gap-2">
          <span className="text-sm">Remaining API Calls: </span>

          {isLoading ? (
            <span className="animate-spin">
              <LoaderCircle className="size-4" />
            </span>
          ) : (
            <>
              <span className="font-bold">{tokens}</span>
              {err && (
                <Badge className="" variant={"secondary"}>
                  {err}
                </Badge>
              )}
            </>
          )}
        </div>
        {err === "Free Plan!" && (
          <Link
            href={"https://modelslab.com/pricing#imagen"}
            target="_blank"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "w-full mt-3"
            )}
          >
            <CircleArrowUp /> Upgrade plan
          </Link>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserTokens;
