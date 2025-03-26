import React from "react";
import PlaygroundWrapper from "@/components/wrappers/playground-wrapper";
import Sidebar from "@/components/pages/community-text-to-image/sidebar";
import Content from "@/components/pages/community-text-to-image/content";

const CommunityTextToImage = () => {
  return (
    <PlaygroundWrapper sidebar={<Sidebar />}>
      <Content />
    </PlaygroundWrapper>
  );
};

export default CommunityTextToImage;
