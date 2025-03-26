import { create } from "zustand";

interface ImageToImageCommunityState {
  key: string;
  model_id: string;
  prompt: string;
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
  seed: string;
  lora_model: string | null;
  tomesd: string;
  use_karras_sigmas: string;
  vae: string | null;
  lora_strength: number | null;
  embeddings_model: string | null;
  webhook: string | null;
  track_id: string | null;
  results: string[];
  resultHeight: string;
  resultWidth: string;
  eta: number;
}

const useImageToImageCommunityStore = create<{
  state: ImageToImageCommunityState;
  updateKey: (key: string) => void;
  updateModelId: (model_id: string) => void;
  updatePrompt: (prompt: string) => void;
  updateNegativePrompt: (negative_prompt: string) => void;
  updateInitImage: (init_image: string) => void;
  updateSamples: (samples: string) => void;
  updateNumInferenceSteps: (num_inference_steps: string) => void;
  updateSafetyChecker: (safety_checker: string) => void;
  updateSafetyCheckerType: (safety_checker_type: string) => void;
  updateEnhancePrompt: (enhance_prompt: boolean) => void;
  updateGuidanceScale: (guidance_scale: number) => void;
  updateStrength: (strength: number) => void;
  updateScheduler: (scheduler: string) => void;
  updateSeed: (seed: string) => void;
  updateLoraModel: (lora_model: string | null) => void;
  updateTomesd: (tomesd: string) => void;
  updateUseKarrasSigmas: (use_karras_sigmas: string) => void;
  updateVae: (vae: string | null) => void;
  updateLoraStrength: (lora_strength: number | null) => void;
  updateEmbeddingsModel: (embeddings_model: string | null) => void;
  updateWebhook: (webhook: string | null) => void;
  updateTrackId: (track_id: string | null) => void;
  updateResults: (results: string[]) => void;
  addResult: (result: string) => void;
  clearResults: () => void;
  updateResultHeight: (resultHeight: string) => void;
  updateResultWidth: (resultWidth: string) => void;
  updateEta: (eta: number) => void;
}>((set) => ({
  state: {
    key: "",
    model_id: "flux",
    prompt: "",
    negative_prompt: "",
    init_image: "",
    samples: "1",
    num_inference_steps: "31",
    safety_checker: "yes",
    safety_checker_type: "sensitive_content_text",
    enhance_prompt: false,
    guidance_scale: 7.5,
    strength: 0.7,
    scheduler: "UniPCMultistepScheduler",
    seed: "",
    lora_model: null,
    tomesd: "",
    use_karras_sigmas: "",
    vae: null,
    lora_strength: null,
    embeddings_model: null,
    webhook: null,
    track_id: null,
    results: [],
    resultHeight: "1024",
    resultWidth: "1024",
    eta: 20,
  },
  updateKey: (key) => set((state) => ({ state: { ...state.state, key } })),
  updateModelId: (model_id) =>
    set((state) => ({ state: { ...state.state, model_id } })),
  updatePrompt: (prompt) =>
    set((state) => ({ state: { ...state.state, prompt } })),
  updateNegativePrompt: (negative_prompt) =>
    set((state) => ({ state: { ...state.state, negative_prompt } })),
  updateInitImage: (init_image) =>
    set((state) => ({ state: { ...state.state, init_image } })),
  updateSamples: (samples) =>
    set((state) => ({ state: { ...state.state, samples } })),
  updateNumInferenceSteps: (num_inference_steps) =>
    set((state) => ({ state: { ...state.state, num_inference_steps } })),
  updateSafetyChecker: (safety_checker) =>
    set((state) => ({ state: { ...state.state, safety_checker } })),
  updateSafetyCheckerType: (safety_checker_type) =>
    set((state) => ({ state: { ...state.state, safety_checker_type } })),
  updateEnhancePrompt: (enhance_prompt) =>
    set((state) => ({ state: { ...state.state, enhance_prompt } })),
  updateGuidanceScale: (guidance_scale) =>
    set((state) => ({ state: { ...state.state, guidance_scale } })),
  updateStrength: (strength) =>
    set((state) => ({ state: { ...state.state, strength } })),
  updateScheduler: (scheduler) =>
    set((state) => ({ state: { ...state.state, scheduler } })),
  updateSeed: (seed) => set((state) => ({ state: { ...state.state, seed } })),
  updateLoraModel: (lora_model) =>
    set((state) => ({ state: { ...state.state, lora_model } })),
  updateTomesd: (tomesd) =>
    set((state) => ({ state: { ...state.state, tomesd } })),
  updateUseKarrasSigmas: (use_karras_sigmas) =>
    set((state) => ({ state: { ...state.state, use_karras_sigmas } })),
  updateVae: (vae) => set((state) => ({ state: { ...state.state, vae } })),
  updateLoraStrength: (lora_strength) =>
    set((state) => ({ state: { ...state.state, lora_strength } })),
  updateEmbeddingsModel: (embeddings_model) =>
    set((state) => ({ state: { ...state.state, embeddings_model } })),
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
  updateEta: (eta) => set((state) => ({ state: { ...state.state, eta } })),
}));

export default useImageToImageCommunityStore;
