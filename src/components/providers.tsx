import React, { ReactNode } from "react";
import { ResizeProvider } from "./resize-context";

const Providers = ({ children }: { children: ReactNode }) => {
  return <ResizeProvider>{children}</ResizeProvider>;
};

export default Providers;
