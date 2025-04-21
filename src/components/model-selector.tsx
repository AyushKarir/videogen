"use client";

import {

  CheckCheck,
  ChevronsUpDown,
  Waves,
  Video,
  ScanFace,
  Film,
  Badge

} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type modelItem = {
  label: string;
  route: string;
  type: "item";
  disabled?: boolean;
  isNew?: boolean;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

type modelGroup = {
  title: string;
  type: "group";
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  items: modelItem[];
};

const models: modelGroup[] = [

  {
    title: "Text to Video Generation",
    type: "group",
    icon: Video,
    items: [
      {
        label: "Text to Video Generation",
        route: "/videogen-text-to-video",
        type: "item",
        icon: CheckCheck,
      },
      {
        label: "Motion (Image to Video)",
        route: "/videogen-image-to-video",
        type: "item",
        icon: Waves,
      },
      {
        label: "Scene Creator",
        route: "/videogen-scene-creator",
        type: "item",
        icon: Film,
      },
    ],

  },
  {
    title: "Deepfake",
    type: "group",
    icon: ScanFace,
    items: [
      {
        label: "Image Single",
        route: "/deepfake-image-single",
        type: "item",
        icon: Film,
      },
      {
        label: "Image Multi",
        route: "/deepfake-image-multi",
        type: "item",
        icon: Film,
        isNew: true,
      },
      {
        label: "Video Single",
        route: "/deepfake-video-single",
        type: "item",
        icon: Film,
      },
      {
        label: "Video Multi",
        route: "/deepfake-video-multi",
        type: "item",
        icon: Film,
      },
    ]
  }
  // {
  //   label: "Text to Image",
  //   route: "/text-to-image",
  //   icon: TextCursorInput,
  // },
  // {
  //   label: "Image to Image",
  //   route: "/image-to-image",
  //   icon: ImageMinus,
  // },
];

export default function ModelSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [Selected, setSelected] = useState<undefined | modelItem>(undefined);

  useEffect(() => {
    models.forEach((group) => {
      const selected = group.items.find((model) => model.route === pathname);
      if (selected) {
        setSelected(selected);
      }
    });
  }, [pathname]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="md:min-w-[300px] justify-between"
        >
          {Selected ? (
            <div className="flex items-center gap-2">
              <Selected.icon />
              <span className="hidden md:inline-block">
                {
                  models
                    .find((group) => group.items.includes(Selected))
                    ?.title.split(" ")[0]
                }
                {" ("}
                {Selected.label}
                {")"}
              </span>
            </div>
          ) : (
            <span>
              <span className="hidden md:inline-block">Select a</span> model
            </span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="md:min-w-[300px] border p-0">
        <Command>
          <CommandInput placeholder="Search model..." />
          <CommandList className="max-h-[80vh]">
            <CommandEmpty>No model found.</CommandEmpty>
            {models.map((group) => (
              <CommandGroup
                key={group.title}
                heading={
                  <div className="flex items-center gap-1">
                    <group.icon className="size-3" /> {group.title}
                  </div>
                }
              >
                {group.items.map((model) => (
                  <CommandItem
                    disabled={model.disabled}
                    key={model.label}
                    value={model.route}
                    onSelect={() => {
                      setOpen(false);
                      router.push(model.route);
                    }}
                    className={cn(model.route === pathname && "bg-primary/30")}
                  >
                    {model.route === pathname ? (
                      <CheckCheck className={cn("mr-1 h-4 w-4")} />
                    ) : (
                      <model.icon className={cn("mr-1 h-4 w-4")} />
                    )}
                    {model.label}{" "}
                    {model.isNew && (
                      <Badge className="pointer-events-none text-xs rounded-full bg-foreground">
                        New
                      </Badge>
                    )}
                  </CommandItem>
                ))}
                <CommandSeparator className="mt-1" />
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
