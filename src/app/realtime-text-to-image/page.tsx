import React from "react";
import PlaygroundWrapper from "@/components/wrappers/playground-wrapper";
import Content from "@/components/pages/realtime-text-to-image/content";
import Sidebar from "@/components/pages/realtime-text-to-image/sidebar";

const RealtimeTextToImage = () => {
  return (
    <PlaygroundWrapper sidebar={<Sidebar />}>
      <Content />
    </PlaygroundWrapper>
  );
};

export default RealtimeTextToImage;
