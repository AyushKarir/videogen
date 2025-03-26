import { create } from "zustand";

interface InteriorDesignState {
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
}

const useInteriorDesignStore = create<{
  state: InteriorDesignState;
  updateKey: (key: string) => void;
  updateInitImage: (init_image: string) => void;
  updatePrompt: (prompt: string) => void;
  updateNegativePrompt: (negative_prompt: string) => void;
  updateSeed: (seed: number | null) => void;
  updateGuidanceScale: (guidance_scale: number) => void;
  updateStrength: (strength: number) => void;
  updateNumInferenceSteps: (steps: number) => void;
  updateBase64: (base64: boolean | null) => void;
  updateTempState: (temp: boolean) => void;
  updateScaleDown: (scale_down: number) => void;
  updateWebhook: (webhook: string | null) => void;
  updateTrackId: (track_id: string | null) => void;
  updateResults: (results: string[]) => void;
  updateResultHeight: (resultHeight: string) => void;
  updateResultWidth: (resultWidth: string) => void;
  updateEta: (eta: number) => void;
}>((set) => ({
  state: {
    key: "",
    init_image: "",
    prompt: "",
    negative_prompt:
      "(normal quality), (low quality), (worst quality), sketches, fog, signature, soft, blurry, drawing, sketch, poor quality, ugly text, type, word, logo, pixelated, low resolution, saturated, high contrast, over sharpened, dirt",
    seed: 0,
    guidance_scale: 8,
    strength: 0.99,
    num_inference_steps: 51,
    base64: true,
    temp: false,
    scale_down: 1,
    webhook: null,
    track_id: null,
    results: [],
    resultHeight: "1024",
    resultWidth: "1024",
    eta: 20,
  },
  updateKey: (key) => set((state) => ({ state: { ...state.state, key } })),
  updateInitImage: (init_image) =>
    set((state) => ({ state: { ...state.state, init_image } })),
  updatePrompt: (prompt) =>
    set((state) => ({ state: { ...state.state, prompt } })),
  updateNegativePrompt: (negative_prompt) =>
    set((state) => ({ state: { ...state.state, negative_prompt } })),
  updateSeed: (seed) => set((state) => ({ state: { ...state.state, seed } })),
  updateGuidanceScale: (guidance_scale) =>
    set((state) => ({ state: { ...state.state, guidance_scale } })),
  updateStrength: (strength) =>
    set((state) => ({ state: { ...state.state, strength } })),
  updateNumInferenceSteps: (num_inference_steps) =>
    set((state) => ({ state: { ...state.state, num_inference_steps } })),
  updateBase64: (base64) =>
    set((state) => ({ state: { ...state.state, base64 } })),
  updateTempState: (temp) =>
    set((state) => ({ state: { ...state.state, temp } })),
  updateScaleDown: (scale_down) =>
    set((state) => ({ state: { ...state.state, scale_down } })),
  updateWebhook: (webhook) =>
    set((state) => ({ state: { ...state.state, webhook } })),
  updateTrackId: (track_id) =>
    set((state) => ({ state: { ...state.state, track_id } })),
  updateResults: (results) =>
    set((state) => ({ state: { ...state.state, results } })),
  updateResultHeight: (resultHeight) =>
    set((state) => ({ state: { ...state.state, resultHeight } })),
  updateResultWidth: (resultWidth) =>
    set((state) => ({ state: { ...state.state, resultWidth } })),
  updateEta: (eta) => set((state) => ({ state: { ...state.state, eta } })),
}));

export default useInteriorDesignStore;
