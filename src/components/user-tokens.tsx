import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { Sparkle } from "lucide-react";
import { toast } from "sonner";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import useApiKeyStore from "@/lib/zustand-states/apikey-store";

const UserTokens = () => {
  const [tokens, setTokens] = React.useState(0);

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
        toast.error(result.message);
      }

      if (result.status === "success") {
        if (result.data.uncensored_chat) {
          setTokens(result.data.uncensored_chat.api_call_remaining);
        } else if (result.is_paid_user) {
          setTokens(result.data.imagen.api_call_remaining);
        } else {
          setTokens(0);
        }
      }
    }
  }

  useEffect(() => {
    getuserTokens();
  }, [apiKey]);

  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger asChild>
        <Button variant="outline">
          <Sparkle /> <span className="hidden sm:block">{tokens}</span>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="px-2 py-1 flex items-center gap-2">
        <span className="text-sm">Remaining API Calls: </span>
        <span className="font-bold">{tokens}</span>
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserTokens;
