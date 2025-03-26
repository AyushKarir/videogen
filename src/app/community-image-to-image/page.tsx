import React from "react";
import PlaygroundWrapper from "@/components/wrappers/playground-wrapper";
import Sidebar from "@/components/pages/community-image-to-image/sidebar";
import Content from "@/components/pages/community-image-to-image/content";

const RealtimeTextToImage = () => {
  return (
    <PlaygroundWrapper sidebar={<Sidebar />}>
      <Content />
    </PlaygroundWrapper>
  );
};

export default RealtimeTextToImage;
