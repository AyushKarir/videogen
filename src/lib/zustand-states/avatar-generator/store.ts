import { create } from "zustand";

interface AvatarGeneratorState {
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
}

const useAvatarGeneratorStore = create<{
  state: AvatarGeneratorState;
  updateKey: (key: string) => void;
  updateModelId: (model_id: string) => void;
  updatePrompt: (prompt: string) => void;
  updateNegativePrompt: (negative_prompt: string) => void;
  updateInitImage: (init_image: string) => void;
  updateSamples: (samples: string) => void;
  updateNumInferenceSteps: (num_inference_steps: string) => void;
  updateSafetyChecker: (safety_checker: boolean) => void;
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
  updateIdentitynetStrengthRatio: (ratio: number) => void;
  updateAdapterStrengthRatio: (ratio: number) => void;
  updatePoseStrength: (strength: number) => void;
  updateCannyStrength: (strength: number) => void;
  updateControlnetSelection: (selection: string) => void;
}>((set) => ({
  state: {
    key: "",
    model_id: "",
    prompt: "",
    negative_prompt: "",
    init_image: "",
    samples: "1",
    num_inference_steps: "31",
    safety_checker: false,
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
    identitynet_strength_ratio: 1.0,
    adapter_strength_ratio: 1.0,
    pose_strength: 0.4,
    canny_strength: 0.3,
    controlnet_selection: "pose",
    width: "512",
    height: "512",
    base64: true,
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
  updateIdentitynetStrengthRatio: (identitynet_strength_ratio) =>
    set((state) => ({ state: { ...state.state, identitynet_strength_ratio } })),
  updateAdapterStrengthRatio: (adapter_strength_ratio) =>
    set((state) => ({ state: { ...state.state, adapter_strength_ratio } })),
  updatePoseStrength: (pose_strength) =>
    set((state) => ({ state: { ...state.state, pose_strength } })),
  updateCannyStrength: (canny_strength) =>
    set((state) => ({ state: { ...state.state, canny_strength } })),
  updateControlnetSelection: (controlnet_selection) =>
    set((state) => ({ state: { ...state.state, controlnet_selection } })),
}));

export default useAvatarGeneratorStore;
