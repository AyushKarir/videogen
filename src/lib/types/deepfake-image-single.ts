export type DeepfakeImageSingleResponseProps = {
    status: "processing" | "success" | "error" | "failed";

    // error
    message?: string;

    // success
    generationTime: number;
    id?: number;
    output: string[];
    proxy_links?: string[];
    meta: {
        init_image: string;
        target_image: string;
        reference_image: string;
        seed: number;
        temp: string;
        file_prefix: string;
        model_save_format: string;
        watermark: string;
        watermark_image: string | null;
    };

    // processing
    future_links: string[];
    fetch_result: string;
    eta: number;
};

export type DeepfakeImageSingleRequestBodyProps = {
    key: string;
    init_image: string;
    target_image: string;
    reference_image: string;
    webhook: string | null;
    track_id: string | null;
    base64: string | boolean;
};