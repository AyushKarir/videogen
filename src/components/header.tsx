"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ModeToggle } from "./ui/mode-toggle";
import ModelSelector from "./model-selector";
import { HomeIcon, User, X } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import Logo from "@/assets/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import UserTokens from "./user-tokens";
import { cn } from "@/lib/utils";
import useApiKeyStore from "@/lib/zustand-states/apikey-store";
import { useShowCodeStore } from "@/lib/zustand-states/show-code-store";
import { useTitleStore } from "@/lib/zustand-states/title-store";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { showCode, toggleShowCode } = useShowCodeStore();

  const { apiKey } = useApiKeyStore();
  const { title, setTitle } = useTitleStore();

  const pathname = usePathname();

  useEffect(() => {
    setTitle("Videogen");
  }, [pathname]);

  useEffect(() => {
    document.title = `${title} playground`;
  }, [title]);

  useEffect(() => {
    if (apiKey) {
      setIsAuthenticated(true);
    }
  }, [apiKey]);

  return (
    <div className="flex bg-background/70 backdrop-blur-md justify-between items-center px-2 sm:px-5 py-3 gap-1 border-b border-border top-0 w-full z-50 sticky">
      <div className="flex items-center gap-1 sm:gap-2">
        <Link href={"https://modelslab.com"} className="h-9 w-9">
          <Logo />
        </Link>
        <Link
          href={"/"}
          className={cn(
            buttonVariants({ variant: "secondary", size: "icon" }),
            "hidden sm:flex"
          )}
        >
          <HomeIcon />
        </Link>
        <Link
          href={"/playgrounds"}
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "hidden sm:block"
          )}
        >
          Back
        </Link>
        <ModelSelector />
      </div>
      <h3 className="font-bold hidden lg:block">{title} Playground</h3>
      <div className="flex items-center gap-1 sm:gap-3">
        <Button className="sm:flex hidden" onClick={toggleShowCode}>
          {showCode ? "Hide" : "Show"} API
        </Button>
        <ModeToggle />
        {isAuthenticated && <UserTokens />}

        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size={"icon"}>
                <User className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href={"https://modelslab.com/dashboard"} target="_blank">
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
              </Link>
              <Link
                href={"https://docs.modelslab.com/image-generation"}
                target="_blank"
              >
                <DropdownMenuItem>Documentation</DropdownMenuItem>
              </Link>
              <Link
                href={"https://modelslab.com/pricing#imagen"}
                target="_blank"
              >
                <DropdownMenuItem>Pricing</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild className="bg-primary">
            <Link href="https://modelslab.com/playground-login?product=imagen">
              <User />
              <span className="hidden sm:inline-block">modelslab</span>login
            </Link>
          </Button>
        )}
        <Button asChild variant={"destructive"} size={"icon"}>
          <Link href="https://modelslab.com/dashboard">
            <X />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Header;
