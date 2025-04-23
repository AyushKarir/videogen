import React from "react";
import PlaygroundWrapper from "@/components/wrappers/playground-wrapper";
import Content from "@/components/pages/text-to-3d/content";
import Sidebar from "@/components/pages/text-to-3d/sidebar";

const TextTo3D = () => {
    return (
        <PlaygroundWrapper sidebar={<Sidebar />}>
            <Content />
        </PlaygroundWrapper>
    );
};

export default TextTo3D;