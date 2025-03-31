export type VideogenSceneCreatorResponse = {
    status: "processing" | "success" | "error" | "failed";
    message?: string; // Only for error status
    generationTime?: number; // Only for success status
    id?: number;
    output?: string[];
    proxy_links?: string[];
    meta?: {
        base64: string;
        file_prefix: string;
        fps?: number;
        guidance_scale: number;
        height: number;
        num_frames?: number;
        num_inference_steps?: number;
        output_type?: string;
        scenes?: {
            duration: number;
            negative_prompt: string;
            prompt: string;
        }[];
        seed: number;
        temp: string;
        watermark: string;
        width: number;
        enhance_prompt?: string;
        enhance_style?: string | null;
        id?: number | null;
        instant_response?: string;
        n_samples?: number;
        negative_prompt?: string;
        opacity?: number;
        outdir?: string;
        padding_down?: number;
        padding_right?: number;
        pag_scale?: number;
        prompt?: string;
        rescale?: string;
        safety_checker?: boolean;
        safety_checker_type?: string;
        scale_down?: number;
        track_id?: number | null;
        webhook?: string | null;
    };
    future_links?: string[]; // Only for processing status
    fetch_result?: string; // Only for processing status
    eta?: number; // Only for processing status
}

export type VideogenSceneCreatorRequestBodyProps = {
    key: string;
    scenes: {
        prompt: string;
        negative_prompt: string;
        duration: number;
    }[];
    negative_prompt: string;
    height?: number;
    width?: number;
    safety_checker?: boolean;
    seed?: number | null;
    base64?: boolean;
    webhook?: string | null;
    track_id?: number | null;
}