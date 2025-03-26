import React from "react";
import PlaygroundWrapper from "@/components/wrappers/playground-wrapper";
import Sidebar from "@/components/pages/interior-design/sidebar";
import Content from "@/components/pages/interior-design/content";


const RealtimeTextToImage = () => {
    return (
        <PlaygroundWrapper sidebar={<Sidebar />}>
            <Content />
        </PlaygroundWrapper>
    );
};

export default RealtimeTextToImage;
