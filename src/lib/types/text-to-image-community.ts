export type TextToImageCommunityResponse = {
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
    H: number;
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
    W: number;
  };

  // processing
  future_links: string[];
  fetch_result: string;
  eta: number;
};

export type TextToImageCommunityRequestBodyProps = {
  key: string;
  prompt: string;
  negative_prompt: string;
  model_id: string;
  scheduler: string;
  safety_checker: string;
  width: string;
  height: string;
  guidance_scale: number;
  num_inference_steps: string;
  seed: string;
  steps: string;
  samples: string;
  full_url: string;
  instant_response: string;
  tomesd: string;
  free_u: string;
  upscale: number;
  multi_lingual: string;
  panorama: string;
  enhance_prompt: boolean;
  self_attention: string;
  use_karras_sigmas: string;
  algorithm_type: string;
  safety_checker_type: string;
  embeddings: string | null;
  vae: string | null;
  lora: string;
  lora_strength: number;
  clip_skip: number;
  temp: string;
  base64: string;
};
