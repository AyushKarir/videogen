import { create } from "zustand";

interface ImageToImageRealtimeState {
  key: string;
  prompt: string;
  negative_prompt: string;
  init_image: string;
  width: string;
  height: string;
  samples: string;
  safety_checker: boolean;
  base64: boolean;
  strength: number;
  seed: number | null;
  enhance_prompt: string;
  enhance_style: string;
  webhook: string | null;
  track_id: string | null;
  results: string[];
  resultHeight: string;
  resultWidth: string;
  temp: boolean;
  eta: number;
}

const useImageToImageRealtimeStore = create<{
  state: ImageToImageRealtimeState;
  updateKey: (key: string) => void;
  updatePrompt: (prompt: string) => void;
  updateNegativePrompt: (negative_prompt: string) => void;
  updateInitImage: (init_image: string) => void;
  updateWidth: (width: string) => void;
  updateHeight: (height: string) => void;
  updateSafetyChecker: (safety_checker: boolean) => void;
  updateSeed: (seed: number | null) => void;
  updateSamples: (samples: string) => void;
  updateBase64: (base64: boolean) => void;
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
  updateTemp: (temp: boolean) => void;
  updateEta: (eta: number) => void;
}>((set) => ({
  state: {
    key: "",
    prompt: "",
    negative_prompt: "",
    init_image: "",
    width: "1024",
    height: "1024",
    safety_checker: false,
    seed: null,
    samples: "1",
    base64: false,
    strength: 0.7,
    enhance_prompt: "",
    enhance_style: "",
    webhook: null,
    track_id: null,
    results: [],
    resultHeight: "1024",
    resultWidth: "1024",
    temp: false,
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
    set((state) => ({ state: { ...state.state, safety_checker } })),
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
  updateEta: (eta) => set((state) => ({ state: { ...state.state, eta } })),
}));

export default useImageToImageRealtimeStore;
