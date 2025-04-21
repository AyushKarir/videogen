export type VideogenTextToVideoResponseProps = {
    status: "processing" | "success" | "error" | "failed";

    // error
    message?: string;

    // success
    generationTime: number;
    id?: number;
    output: string[];
    proxy_links?: string[];
    meta: {
        adapter_lora: string;
        base64: string;
        clip_skip: number | null;
        controlnet: string | null;
        controlnet_images: string | null;
        domain_lora_scale: number;
        file_prefix: string;
        fps: number;
        guidance_scale: number;
        height: number;
        id: number | null;
        improved_sampling_seed: number;
        instant_response: string;
        ip_adapter_id: string | null;
        ip_adapter_image: string | null;
        ip_adapter_scale: number;
        lora_models: string | null;
        lora_strength: number;
        model_id: string;
        motion_lora_strength: number;
        motion_loras: string | null;
        motion_module: string;
        negative_prompt: string;
        num_frames: number;
        num_inference_steps: number;
        output_type: string;
        prompt: string;
        seed: number;
        temp: string;
        track_id: number | null;
        upscale_guidance_scale: number;
        upscale_height: number;
        upscale_num_inference_steps: number;
        upscale_strength: number;
        upscale_width: number;
        use_improved_sampling: string;
        watermark: string;
        webhook: string | null;
        width: number;
    };

    // processing
    future_links: string[];
    fetch_result: string;
    eta: number;
}



export type VideogenTextToVideoRequestBodyProps = {
    key: string;
    model_id: string;
    prompt: string;
    negative_prompt: string;
    height: string;
    width: string;
    num_frames: number;
    num_inference_steps: number;
    guidance_scale: number;
    upscale_height: number;
    upscale_width: number;
    upscale_strength: number;
    upscale_guidance_scale: number;
    upscale_num_inference_steps: number;
    output_type: string;
    webhook: string | null;
    track_id: string | null;

}