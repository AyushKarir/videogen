export type AvatarGeneratorResponse = {
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

export type AvatarGeneratorRequestBodyProps = {
  key: string;
  prompt: string;
  negative_prompt: string;
  init_image: string;
  width: string;
  height: string;
  samples: string;
  num_inference_steps: string;
  safety_checker: boolean;
  base64: boolean;
  seed: string;
  guidance_scale: number;
  identitynet_strength_ratio: number;
  adapter_strength_ratio: number;
  pose_strength: number;
  canny_strength: number;
  controlnet_selection: string;
  webhook: string | null;
  track_id: string | null;
  results: string[];
  resultHeight: string;
  resultWidth: string;
  eta: number;
};
