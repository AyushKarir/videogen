import { create } from "zustand";

interface TextToImageCommunityState {
  key: string;
  model_id: string;
  prompt: string;
  negative_prompt: string;
  scheduler: string;
  safety_checker: string; // Changed from boolean to string
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
  results: string[];
  resultHeight: string;
  resultWidth: string;
  eta: number;
}

const useTextToImageCommunityStore = create<{
  state: TextToImageCommunityState;
  updateKey: (key: string) => void;
  updatePrompt: (prompt: string) => void;
  updateNegativePrompt: (negative_prompt: string) => void;
  updateInitImage: (init_image: string) => void;
  updateWidth: (width: string) => void;
  updateHeight: (height: string) => void;
  updateSafetyChecker: (safety_checker: string) => void; // Updated type
  updateSeed: (seed: string) => void;
  updateSamples: (samples: string) => void;
  updateBase64: (base64: string) => void;
  updateStrength: (strength: number) => void;
  updateEnhancePrompt: (enhance_prompt: string) => void;
  updateEnhanceStyle: (enhance_style: string) => void;
  updateWebhook: (webhook: string | null) => void;
  updateTrackId: (track_id: string | null) => void;
  updateResults: (results: string[]) => void;
  addResult: (result: string) => void;
  clearResults: () => void;
  updateResultHeight: (resultHeight: string) => void;
  updateResultWidth: (resultWidth: string) => void;
  updateTemp: (temp: string) => void;
  updateModelId: (model_id: string) => void;
  updateScheduler: (scheduler: string) => void;
  updateGuidanceScale: (guidance_scale: number) => void;
  updateSteps: (steps: string) => void;
  updateFullUrl: (full_url: string) => void;
  updateInstantResponse: (instant_response: string) => void;
  updateTomesd: (tomesd: string) => void;
  updateFreeU: (free_u: string) => void;
  updateUpscale: (upscale: number) => void;
  updateMultiLingual: (multi_lingual: string) => void;
  updatePanorama: (panorama: string) => void;
  updateSelfAttention: (self_attention: string) => void;
  updateUseKarrasSigmas: (use_karras_sigmas: string) => void;
  updateAlgorithmType: (algorithm_type: string) => void;
  updateSafetyCheckerType: (safety_checker_type: string) => void;
  updateEmbeddings: (embeddings: string | null) => void;
  updateVae: (vae: string | null) => void;
  updateLora: (lora: string) => void;
  updateLoraStrength: (lora_strength: number) => void;
  updateClipSkip: (clip_skip: number) => void;
  updateEta: (eta: number) => void;
}>((set) => ({
  state: {
    key: "",
    model_id: "flux",
    prompt: "",
    negative_prompt: "",
    scheduler: "UniPCMultistepScheduler",
    safety_checker: "yes", // Updated default value
    width: "1024",
    height: "1024",
    guidance_scale: 7.5,
    num_inference_steps: "31",
    seed: "0",
    steps: "21",
    samples: "1",
    full_url: "no",
    instant_response: "no",
    tomesd: "yes",
    free_u: "no",
    upscale: 0,
    multi_lingual: "no",
    panorama: "no",
    self_attention: "no",
    use_karras_sigmas: "no",
    algorithm_type: "no",
    safety_checker_type: "sensitive_content_text",
    embeddings: null,
    vae: null,
    lora: "more_details",
    lora_strength: 1,
    clip_skip: 1,
    temp: "no",
    base64: "yes",
    results: [],
    resultHeight: "1024",
    resultWidth: "1024",
    eta: 20,
  },
  updateKey: (key) => set((state) => ({ state: { ...state.state, key } })),
  updatePrompt: (prompt) =>
    set((state) => ({ state: { ...state.state, prompt } })),
  updateNegativePrompt: (negative_prompt) =>
    set((state) => ({ state: { ...state.state, negative_prompt } })),
  updateInitImage: (init_image) =>
    set((state) => ({ state: { ...state.state, init_image } })),
  updateWidth: (width) =>
    set((state) => ({ state: { ...state.state, width } })),
  updateHeight: (height) =>
    set((state) => ({ state: { ...state.state, height } })),
  updateSafetyChecker: (safety_checker) =>
    set((state) => ({ state: { ...state.state, safety_checker } })), // Updated type
  updateSeed: (seed) => set((state) => ({ state: { ...state.state, seed } })),
  updateSamples: (samples) =>
    set((state) => ({ state: { ...state.state, samples } })),
  updateBase64: (base64) =>
    set((state) => ({ state: { ...state.state, base64 } })),
  updateStrength: (strength) =>
    set((state) => ({ state: { ...state.state, strength } })),
  updateEnhancePrompt: (enhance_prompt) =>
    set((state) => ({ state: { ...state.state, enhance_prompt } })),
  updateEnhanceStyle: (enhance_style) =>
    set((state) => ({ state: { ...state.state, enhance_style } })),
  updateWebhook: (webhook) =>
    set((state) => ({ state: { ...state.state, webhook } })),
  updateTrackId: (track_id) =>
    set((state) => ({ state: { ...state.state, track_id } })),
  updateResults: (results) =>
    set((state) => ({ state: { ...state.state, results } })),
  addResult: (result) =>
    set((state) => ({
      state: { ...state.state, results: [...state.state.results, result] },
    })),
  clearResults: () =>
    set((state) => ({ state: { ...state.state, results: [] } })),
  updateResultHeight: (resultHeight) =>
    set((state) => ({ state: { ...state.state, resultHeight } })),
  updateResultWidth: (resultWidth) =>
    set((state) => ({ state: { ...state.state, resultWidth } })),
  updateTemp: (temp) => set((state) => ({ state: { ...state.state, temp } })),
  updateModelId: (model_id) =>
    set((state) => ({ state: { ...state.state, model_id } })),
  updateScheduler: (scheduler) =>
    set((state) => ({ state: { ...state.state, scheduler } })),
  updateGuidanceScale: (guidance_scale) =>
    set((state) => ({ state: { ...state.state, guidance_scale } })),
  updateSteps: (steps) =>
    set((state) => ({ state: { ...state.state, steps } })),
  updateFullUrl: (full_url) =>
    set((state) => ({ state: { ...state.state, full_url } })),
  updateInstantResponse: (instant_response) =>
    set((state) => ({ state: { ...state.state, instant_response } })),
  updateTomesd: (tomesd) =>
    set((state) => ({ state: { ...state.state, tomesd } })),
  updateFreeU: (free_u) =>
    set((state) => ({ state: { ...state.state, free_u } })),
  updateUpscale: (upscale) =>
    set((state) => ({ state: { ...state.state, upscale } })),
  updateMultiLingual: (multi_lingual) =>
    set((state) => ({ state: { ...state.state, multi_lingual } })),
  updatePanorama: (panorama) =>
    set((state) => ({ state: { ...state.state, panorama } })),
  updateSelfAttention: (self_attention) =>
    set((state) => ({ state: { ...state.state, self_attention } })),
  updateUseKarrasSigmas: (use_karras_sigmas) =>
    set((state) => ({ state: { ...state.state, use_karras_sigmas } })),
  updateAlgorithmType: (algorithm_type) =>
    set((state) => ({ state: { ...state.state, algorithm_type } })),
  updateSafetyCheckerType: (safety_checker_type) =>
    set((state) => ({ state: { ...state.state, safety_checker_type } })),
  updateEmbeddings: (embeddings) =>
    set((state) => ({ state: { ...state.state, embeddings } })),
  updateVae: (vae) => set((state) => ({ state: { ...state.state, vae } })),
  updateLora: (lora) => set((state) => ({ state: { ...state.state, lora } })),
  updateLoraStrength: (lora_strength) =>
    set((state) => ({ state: { ...state.state, lora_strength } })),
  updateClipSkip: (clip_skip) =>
    set((state) => ({ state: { ...state.state, clip_skip } })),
  updateEta: (eta) => set((state) => ({ state: { ...state.state, eta } })),
}));

export default useTextToImageCommunityStore;
