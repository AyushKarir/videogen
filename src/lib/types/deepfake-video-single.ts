export type DeepfakeVideoSingleResponseProps = {
    status: "success" | "processing" | "error" | "failed";
    generationTime: number;
    id: number;
    output: string[];
    proxy_links: string[];
    meta: {
        seed: number;
        source_image: string;
        target_video_url: string;
        output_format: string;
        outdir: string;
        file_prefix: string;
        watermark: string;
        watermark_image: string | null;
    };
    future_links: string[];
};

export type DeepfakeVideoSingleRequestBodyProps = {
    key: string;
    init_image: string;
    init_video: string;
    // reference_image: string;
    webhook: string | null;
    track_id: string | null;
    base64: string | boolean;
};