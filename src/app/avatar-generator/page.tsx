import React from "react";
import PlaygroundWrapper from "@/components/wrappers/playground-wrapper";
import Sidebar from "@/components/pages/avatar-generator/sidebar";
import Content from "@/components/pages/avatar-generator/content";

const RealtimeTextToImage = () => {
  return (
    <PlaygroundWrapper sidebar={<Sidebar />}>
      <Content />
    </PlaygroundWrapper>
  );
};

export default RealtimeTextToImage;
