import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { buttonVariants } from "../ui/button";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
  className?: string;
  onlyClassName?: boolean;
};

const SidebarWrapper = ({
  children,
  onlyClassName = false,
  className,
}: Props) => {
  return (
    <div className="h-full flex flex-col justify-between">
      <ScrollArea
        className={
          onlyClassName ? className : `h-full px-2 sm:px-4 ${className}`
        }
      >
        {children}
      </ScrollArea>
      <div className="hidden md:block p-2">
        <div className="relative mt-5 border flex flex-col gap-3 pt-5 justify-center items-center border-border text-center p-3 rounded-xl">
          <ShieldCheck className="fill-background size-10 -top-5 absolute" />
          <h3 className="text-sm font-bold">
            Upgrade for more speed on dedicated GPU
          </h3>
          <Link
            href={"https://modelslab.com/pricing#imagen"}
            target="_blank"
            className={buttonVariants()}
          >
            Upgrade now <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidebarWrapper;
