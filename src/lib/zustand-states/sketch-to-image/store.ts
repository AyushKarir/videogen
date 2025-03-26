import { create } from "zustand";

interface SketchToImageState {
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
}

const useSketchToImageStore = create<{
  state: SketchToImageState;
  updateKey: (key: string) => void;
  updateInitImage: (init_image: string) => void;
  updateWebhook: (webhook: string | null) => void;
  updateTrackId: (track_id: string | null) => void;
  updateResults: (results: string[]) => void;
  addResult: (result: string) => void;
  clearResults: () => void;
  updateResultHeight: (resultHeight: string) => void;
  updateResultWidth: (resultWidth: string) => void;
  updateEta: (eta: number) => void;
  updateModelId: (model_id: string) => void;
  updatePrompt: (prompt: string) => void;
  updateNegativePrompt: (negative_prompt: string) => void;
  updateAutoHint: (auto_hint: string) => void;
  updateGuessMode: (guess_mode: string) => void;
  updateStrength: (strength: number) => void;
  updateControlnetConditioningScale: (scale: string) => void;
  updateGuidanceScale: (guidance_scale: number) => void;
  updateTomesd: (tomesd: string) => void;
  updateSeed: (seed: number | null) => void;
  updateSamples: (samples: number) => void;
  updateNumInferenceSteps: (steps: number) => void;
  updateScheduler: (scheduler: string) => void;
  updateUseKarrasSigmas: (use_karras: string) => void;
  updateBase64: (base64: string | null) => void;
  updateClipSkip: (clip_skip: number) => void;
  updateControlnetType: (type: string) => void;
  updateControlnetModel: (model: string) => void;
  updateLoraModel: (model: string) => void;
  updateLoraStrength: (strength: string) => void;
}>((set) => ({
  state: {
    key: "",
    init_image: "",
    model_id: "boziorealvisxlv4",
    webhook: null,
    track_id: null,
    results: [],
    resultHeight: "1024",
    resultWidth: "1024",
    eta: 20,
    prompt: "",
    negative_prompt:
      "(normal quality), (low quality), (worst quality), Living Room paintings, sketches, fog, signature, soft, blurry, drawing, sketch, poor quality, ugly text, type, word, logo, pixelated, low resolution, saturated, high contrast, over sharpened, dirt",
    auto_hint: "no",
    guess_mode: "no",
    strength: 0.8,
    controlnet_conditioning_scale: "0.9",
    guidance_scale: 5,
    tomesd: "yes",
    seed: null,
    samples: 1,
    num_inference_steps: 21,
    scheduler: "DPMSolverMultistepScheduler",
    use_karras_sigmas: "yes",
    base64: "yes",
    clip_skip: 2,
    controlnet_type: "lineart",
    controlnet_model: "lineart",
    lora_model: "more_details_XL",
    lora_strength: "0.9",
  },
  updateKey: (key) => set((state) => ({ state: { ...state.state, key } })),
  updateInitImage: (init_image) =>
    set((state) => ({ state: { ...state.state, init_image } })),
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
  updateModelId: (model_id) =>
    set((state) => ({ state: { ...state.state, model_id } })),
  updatePrompt: (prompt) =>
    set((state) => ({ state: { ...state.state, prompt } })),
  updateNegativePrompt: (negative_prompt) =>
    set((state) => ({ state: { ...state.state, negative_prompt } })),
  updateAutoHint: (auto_hint) =>
    set((state) => ({ state: { ...state.state, auto_hint } })),
  updateGuessMode: (guess_mode) =>
    set((state) => ({ state: { ...state.state, guess_mode } })),
  updateStrength: (strength) =>
    set((state) => ({ state: { ...state.state, strength } })),
  updateControlnetConditioningScale: (controlnet_conditioning_scale) =>
    set((state) => ({
      state: { ...state.state, controlnet_conditioning_scale },
    })),
  updateGuidanceScale: (guidance_scale) =>
    set((state) => ({ state: { ...state.state, guidance_scale } })),
  updateTomesd: (tomesd) =>
    set((state) => ({ state: { ...state.state, tomesd } })),
  updateSeed: (seed) => set((state) => ({ state: { ...state.state, seed } })),
  updateSamples: (samples) =>
    set((state) => ({ state: { ...state.state, samples } })),
  updateNumInferenceSteps: (num_inference_steps) =>
    set((state) => ({ state: { ...state.state, num_inference_steps } })),
  updateScheduler: (scheduler) =>
    set((state) => ({ state: { ...state.state, scheduler } })),
  updateUseKarrasSigmas: (use_karras_sigmas) =>
    set((state) => ({ state: { ...state.state, use_karras_sigmas } })),
  updateBase64: (base64) =>
    set((state) => ({ state: { ...state.state, base64 } })),
  updateClipSkip: (clip_skip) =>
    set((state) => ({ state: { ...state.state, clip_skip } })),
  updateControlnetType: (controlnet_type) =>
    set((state) => ({ state: { ...state.state, controlnet_type } })),
  updateControlnetModel: (controlnet_model) =>
    set((state) => ({ state: { ...state.state, controlnet_model } })),
  updateLoraModel: (lora_model) =>
    set((state) => ({ state: { ...state.state, lora_model } })),
  updateLoraStrength: (lora_strength) =>
    set((state) => ({ state: { ...state.state, lora_strength } })),
}));

export default useSketchToImageStore;
