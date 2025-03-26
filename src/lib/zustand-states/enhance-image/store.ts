import { create } from "zustand";

interface EnhanceImageState {
  key: string;
  init_image: string;
  face_enhance: boolean;
  scale: number;
  model_id: string;
  webhook: string | null;
  track_id: string | null;
  results: string[];
  resultHeight: string;
  resultWidth: string;
  eta: number;
}

const useEnhanceImageStore = create<{
  state: EnhanceImageState;
  updateKey: (key: string) => void;
  updateInitImage: (init_image: string) => void;
  updateFaceEnhance: (face_enhance: boolean) => void;
  updateScale: (scale: number) => void;
  updateWebhook: (webhook: string | null) => void;
  updateTrackId: (track_id: string | null) => void;
  updateResults: (results: string[]) => void;
  addResult: (result: string) => void;
  clearResults: () => void;
  updateResultHeight: (resultHeight: string) => void;
  updateResultWidth: (resultWidth: string) => void;
  updateEta: (eta: number) => void;
  updateModelId: (model_id: string) => void;
}>((set) => ({
  state: {
    key: "",
    init_image: "",
    face_enhance: false,
    scale: 1,
    model_id: "",
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
  updateFaceEnhance: (face_enhance) =>
    set((state) => ({ state: { ...state.state, face_enhance } })),
  updateScale: (scale) =>
    set((state) => ({ state: { ...state.state, scale } })),
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
}));

export default useEnhanceImageStore;
