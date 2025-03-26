export type SketchToImageResponse = {
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

export type SketchToImageRequestBodyProps = {
  key: string;
  model_id: string;
  init_image: string;
  prompt: string;
  negative_prompt: string;
  auto_hint: string;
  guess_mode: string;
  strength: number;
  controlnet_conditioning_scale: string;
  guidance_scale: number;
  tomesd: string;
  seed: number | null;
  samples: number;
  num_inference_steps: number;
  scheduler: string;
  use_karras_sigmas: string;
  base64: string | null;
  clip_skip: number;
  controlnet_type: string;
  controlnet_model: string;
  lora_model: string;
  lora_strength: string;
  webhook: string | null;
  track_id: string | null;
  results: string[];
  resultHeight: string;
  resultWidth: string;
  eta: number;
};
