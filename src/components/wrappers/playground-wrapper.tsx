"use client";

import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import Header from "../header";
import { useResize } from "../resize-context";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const PlaygroundWrapper = ({ sidebar, children }: Props) => {
  const { screenWidth } = useResize();

  return (
    <div
      className={cn(
        "grid",
        screenWidth > 768 ? "h-screen grid-rows-[auto,1fr]" : ""
      )}
    >
      {/* NAVBAR */}
      <Header />
      <ResizablePanelGroup
        direction={screenWidth > 768 ? "horizontal" : "vertical"}
        className="h-full"
      >
        <ResizablePanel
          defaultSize={15}
          minSize={15}
          maxSize={30}
          className="!overflow-visible"
        >
          {sidebar}
        </ResizablePanel>
        {screenWidth > 768 && <ResizableHandle className="bg-transparent" />}
        <ResizablePanel
          defaultSize={75}
          className={cn(screenWidth < 768 && "!overflow-visible")}
        >
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default PlaygroundWrapper;
