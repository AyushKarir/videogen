export type InteriorDesignResponse = {
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

export type InteriorDesignRequestBodyProps = {
  key: string;
  init_image: string;
  prompt: string;
  negative_prompt: string;
  seed: number | null;
  guidance_scale: number;
  strength: number;
  num_inference_steps: number;
  base64: boolean | null;
  temp: boolean;
  scale_down: number;
  webhook: string | null;
  track_id: string | null;
  results: string[];
  resultHeight: string;
  resultWidth: string;
  eta: number;
};
