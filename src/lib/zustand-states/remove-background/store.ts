import { create } from "zustand";

interface RemoveBackgroundState {
  key: string;
  image: string;
  seed: number | null;
  post_process_mask: boolean;
  only_mask: boolean;
  alpha_matting: boolean;
  webhook: string | null;
  track_id: string | null;
  results: string[];
  resultHeight: string;
  resultWidth: string;
  eta: number;
}

const useRemoveBackgroundStore = create<{
  state: RemoveBackgroundState;
  updateKey: (key: string) => void;
  updateImage: (image: string) => void;
  updateSeed: (seed: number | null) => void;
  updatePostProcessMask: (post_process_mask: boolean) => void;
  updateOnlyMask: (only_mask: boolean) => void;
  updateAlphaMatting: (alpha_matting: boolean) => void;
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
    image: "",
    seed: null,
    post_process_mask: false,
    only_mask: false,
    alpha_matting: false,
    webhook: null,
    track_id: null,
    results: [],
    resultHeight: "1024",
    resultWidth: "1024",
    eta: 20,
  },
  updateKey: (key) => set((state) => ({ state: { ...state.state, key } })),
  updateImage: (image) =>
    set((state) => ({ state: { ...state.state, image } })),
  updateSeed: (seed) => set((state) => ({ state: { ...state.state, seed } })),
  updatePostProcessMask: (post_process_mask) =>
    set((state) => ({ state: { ...state.state, post_process_mask } })),
  updateOnlyMask: (only_mask) =>
    set((state) => ({ state: { ...state.state, only_mask } })),
  updateAlphaMatting: (alpha_matting) =>
    set((state) => ({ state: { ...state.state, alpha_matting } })),
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

export default useRemoveBackgroundStore;
