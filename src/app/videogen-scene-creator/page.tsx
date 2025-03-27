import React from "react";
import PlaygroundWrapper from "@/components/wrappers/playground-wrapper";
import Content from "@/components/pages/videogen-scene-creator/content";
import Sidebar from "@/components/pages/videogen-scene-creator/sidebar";

const RealtimeTextToImage = () => {
    return (
        <PlaygroundWrapper sidebar={<Sidebar />}>
            <Content />
        </PlaygroundWrapper>
    );
};

export default RealtimeTextToImage;
