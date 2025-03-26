export type ReplaceBackgroundResponse = {
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

export type ReplaceBackgroundMaskImageRequestBodyProps = {
  key: string;
  image: string;
  seed: number | null;
  post_process_mask: boolean;
  only_mask: boolean;
  alpha_matting: boolean;
  inverse_mask: boolean;
  webhook: string | null;
  base64: boolean;
  track_id: string | null;
};

export type ReplaceBackgroundInpaintingRequestBodyProps = {
  key: string;
  prompt: string;
  negative_prompt: string | null;
  init_image: string;
  mask_image: string;
  width: number;
  height: number;
  samples: number;
  num_inference_steps: number;
  safety_checker: string;
  enhance_prompt: string;
  guidance_scale: number;
  strength: number;
  base64: boolean;
  seed: number | null;
  webhook: string | null;
  track_id: string | null;
};
