"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface ResizeContextType {
  screenWidth: number;
}

const ResizeContext = createContext<ResizeContextType | undefined>(undefined);

export const ResizeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [screenWidth, setScreenWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    // Set width after mount to avoid SSR mismatch
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ResizeContext.Provider value={{ screenWidth }}>
      {children}
    </ResizeContext.Provider>
  );
};

export const useResize = (): ResizeContextType => {
  const context = useContext(ResizeContext);
  if (!context) {
    throw new Error("useResize must be used within a ResizeProvider");
  }
  return context;
};
