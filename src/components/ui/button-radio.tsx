import { cn } from "@/lib/utils";
import React from "react";
import { buttonVariants } from "./button";

type Item = { name: string; value: string };

type Props = {
  items: Item[];
  selectedValue: string | null;
  name: string;
  setSelectedValue: (value: string) => void;
};

const ButtonRadio = ({
  name,
  items,
  selectedValue,
  setSelectedValue,
}: Props) => {
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <React.Fragment key={item.value}>
          <label
            htmlFor={item.value}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "cursor-pointer",
              selectedValue === item.value
                ? "bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
                : ""
            )}
          >
            {item.name}
          </label>
          <input
            type="radio"
            className="sr-only" // Use sr-only instead of hidden
            name={name}
            value={item.value}
            checked={selectedValue === item.value}
            id={item.value}
            onChange={handleRadioChange}
            required
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default ButtonRadio;
