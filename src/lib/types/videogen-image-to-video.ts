export type VideogenImageToVideoResponseProps = {
    status: "processing" | "success" | "error" | "failed";

    // error
    message?: string;

    // success
    generationTime: number;
    id?: number;
    output: string[];
    proxy_links?: string[];
    meta: {
        file_prefix: string;
        fps: number;
        height: number;
        init_image: string;
        instant_response: string;
        max_guidance_scale: number;
        min_guidance_scale: number;
        model_id: string;
        motion_bucket_id: number;
        noise_aug_strength: number;
        num_frames: number;
        num_inference_steps: number;
        seed: number;
        temp: string;
        width: number;
    };

    // processing
    future_links: string[];
    fetch_result: string;
    eta: number;

}

export type VideogenImageToVideoRequestBodyProps = {
    key: string;
    model_id: string;
    init_image: string;
    height: number;
    width: number;
    num_frames: number;
    num_inference_steps: number;
    min_guidance_scale: number;
    max_guidance_scale: number;
    motion_bucket_id: number;
    noise_aug_strength: number;
    webhook: string | null;
    track_id: string | null;

}