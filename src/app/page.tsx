"use client";

import PlaygroundWrapper from "@/components/wrappers/playground-wrapper";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/realtime-text-to-image");
    setTimeout(() => {
      router.push("/realtime-text-to-image");
    }, 100);
  }, []);

  return (
    <PlaygroundWrapper sidebar={<div></div>}>
      <div></div>
    </PlaygroundWrapper>
  );
}
