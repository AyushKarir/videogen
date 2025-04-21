export type DeepfakeVideoMultiResponseProps = {
    status: "success" | "processing" | "error" | "failed";
    generationTime: number;
    id: number;
    output: string[];
    proxy_links: string[];
    meta: {
        file_prefix: string;
        outdir: string;
        output_format: string;
        reference_image: string;
        seed: number;
        source_image: string;
        target_video_url: string;
        watermark: string;
        watermark_image: string | null;
    };
};

export type DeepfakeVideoMultiRequestBodyProps = {
    key: string;
    init_image: string;
    init_video: string;
    reference_image: string;
    webhook: string | null;
    track_id: string | null;
    base64: string | boolean;
};