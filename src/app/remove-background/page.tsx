import React from "react";
import PlaygroundWrapper from "@/components/wrappers/playground-wrapper";
import Content from "@/components/pages/remove-background/content";
import Sidebar from "@/components/pages/remove-background/sidebar";

const RealtimeTextToImage = () => {
    return (
        <PlaygroundWrapper sidebar={<Sidebar />}>
            <Content />
        </PlaygroundWrapper>
    );
};

export default RealtimeTextToImage;
