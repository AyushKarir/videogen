export type ImageToImageCommunityResponse = {
  status: "processing" | "success" | "error" | "failed";

  // error
  message: string;

  // success
  generationTime: number;
  id: number;
  output: string[];
  proxy_links: string[];
  meta: {
    base64: string;
    enhance_prompt: string;
    enhance_style: string | null;
    file_prefix: string;
    guidance_scale: number;
    height: number;
    id: number | null;
    instant_response: string;
    n_samples: number;
    negative_prompt: string;
    opacity: number;
    outdir: string;
    padding_down: number;
    padding_right: number;
    pag_scale: number;
    prompt: string;
    rescale: string;
    safety_checker: string;
    safety_checker_type: string;
    scale_down: number;
    seed: number;
    temp: string;
    track_id: number | null;
    watermark: string;
    webhook: string | null;
    width: number;
  };

  // processing
  future_links: string[];
  fetch_result: string;
  eta: number;
};

export type ImageToImageCommunityRequestBodyProps = {
  key: string;
  prompt: string;
  model_id: string;
  negative_prompt: string;
  init_image: string;
  samples: string;
  num_inference_steps: string;
  safety_checker: string;
  safety_checker_type: string;
  enhance_prompt: boolean;
  guidance_scale: number;
  strength: number;
  scheduler: string;
  seed: null | string;
  lora_model: null;
  tomesd: string;
  use_karras_sigmas: string;
  vae: null;
  base64: string;
  lora_strength: null;
  embeddings_model: null;
  webhook: null;
  track_id: null;
};
