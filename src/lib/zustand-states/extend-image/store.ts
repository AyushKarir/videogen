import { create } from "zustand";

interface ExtendImageState {
  key: string;
  seed: number | null;
  width: string;
  height: string;
  prompt: string;
  image: string;
  negative_prompt: string;
  num_inference_steps: number;
  guidance_scale: number;
  temp: boolean;
  base64: boolean;
  webhook: string | null;
  track_id: string | null;
  results: string[];
  resultHeight: string;
  resultWidth: string;
  eta: number;
  overlap_width: number;
}

const useExtendImageStore = create<{
  state: ExtendImageState;
  updateKey: (key: string) => void;
  updateSeed: (seed: number | null) => void;
  updateWidth: (width: string) => void;
  updateHeight: (height: string) => void;
  updatePrompt: (prompt: string) => void;
  updateInitImage: (image: string) => void;
  updateNegativePrompt: (negative_prompt: string) => void;
  updateNumInferenceSteps: (num_inference_steps: number) => void;
  updateGuidanceScale: (guidance_scale: number) => void;
  updateTemp: (temp: boolean) => void;
  updateBase64: (base64: boolean) => void;
  updateWebhook: (webhook: string | null) => void;
  updateTrackId: (track_id: string | null) => void;
  updateResults: (results: string[]) => void;
  addResult: (result: string) => void;
  clearResults: () => void;
  updateResultHeight: (resultHeight: string) => void;
  updateResultWidth: (resultWidth: string) => void;
  updateEta: (eta: number) => void;
  updateOverlapWidth: (overlap_width: number) => void;
}>((set) => ({
  state: {
    key: "",
    seed: null,
    width: "1024",
    height: "1024",
    prompt: "",
    image: "",
    negative_prompt: "",
    num_inference_steps: 15,
    guidance_scale: 8.0,
    temp: false,
    base64: true,
    webhook: null,
    track_id: null,
    results: [],
    resultHeight: "1024",
    resultWidth: "1024",
    eta: 20,
    overlap_width: 32,
  },
  updateKey: (key) => set((state) => ({ state: { ...state.state, key } })),
  updateSeed: (seed) => set((state) => ({ state: { ...state.state, seed } })),
  updateWidth: (width) =>
    set((state) => ({ state: { ...state.state, width } })),
  updateHeight: (height) =>
    set((state) => ({ state: { ...state.state, height } })),
  updatePrompt: (prompt) =>
    set((state) => ({ state: { ...state.state, prompt } })),
  updateInitImage: (image) =>
    set((state) => ({ state: { ...state.state, image } })),
  updateNegativePrompt: (negative_prompt) =>
    set((state) => ({ state: { ...state.state, negative_prompt } })),
  updateNumInferenceSteps: (num_inference_steps) =>
    set((state) => ({ state: { ...state.state, num_inference_steps } })),
  updateGuidanceScale: (guidance_scale) =>
    set((state) => ({ state: { ...state.state, guidance_scale } })),
  updateTemp: (temp) => set((state) => ({ state: { ...state.state, temp } })),
  updateBase64: (base64) =>
    set((state) => ({ state: { ...state.state, base64 } })),
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
  updateOverlapWidth: (overlap_width) =>
    set((state) => ({ state: { ...state.state, overlap_width } })),
}));

export default useExtendImageStore;
