import React from "react";
import PlaygroundWrapper from "@/components/wrappers/playground-wrapper";
import Content from "@/components/pages/videogen-text-to-video/content";
import Sidebar from "@/components/pages/videogen-text-to-video/sidebar";

const RealtimeTextToImage = () => {
    return (
        <PlaygroundWrapper sidebar={<Sidebar />}>
            <Content />
        </PlaygroundWrapper>
    );
};

export default RealtimeTextToImage;
