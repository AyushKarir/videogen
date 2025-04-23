export type textTo3DResponseProps = {
    status: "processing" | "success" | "error" | "failed";

    // success
    generationTime: number;
    id?: number;
    output: string[];
    proxy_links?: string[];

    meta: {
        chunk_size: number;
        file_prefix: string;
        foreground_ratio: string | number;
        guidance_scale: number;
        negative_prompt: string;
        num_inference_steps: number;
        prompt: string;
        remove_bg: boolean;
        render: boolean;
        resolution: number;
        seed: number;
        temp: string;
    };
}
export type textTo3DRequestBodyProps = {
    key: string;
    foreground_ratio: string;
    prompt: string;
    num_inference_steps: string;
    resolution: number;
    guidance_scale: string;
    ss_sampling_steps: number;
    slat_sampling_steps: number;
    seed: number;
    temp: string;
    webhook: string | null;
    track_id: string | null;

}