import { create } from "zustand";

interface ReplaceBackgroundState {
  key: string;
  image: string;
  seed: number | null;
  prompt: string;
  negative_prompt: string | null;
  inpainting_init_image: string;
  inpainting_mask_image: string;
  post_process_mask: boolean;
  samples: number;
  height: number;
  width: number;
  num_inference_steps: number;
  safety_checker: boolean;
  enhance_prompt: string; // changed type to string
  guidance_scale: number;
  strength: number;
  only_mask: boolean;
  alpha_matting: boolean;
  webhook: string | null;
  track_id: string | null;
  results: string[];
  resultHeight: string;
  resultWidth: string;
  eta: number;
  inverse_mask: boolean;
  base64: boolean; // new property
}

const useReplaceBackgroundStore = create<{
  state: ReplaceBackgroundState;
  updateKey: (key: string) => void;
  updateImage: (image: string) => void;
  updateSeed: (seed: number | null) => void;
  updatePrompt: (prompt: string) => void;
  updateNegativePrompt: (negative_prompt: string) => void;
  updateInpaintingInitImage: (inpainting_init_image: string) => void;
  updateInpaintingMaskImage: (inpainting_mask_image: string) => void;
  updatePostProcessMask: (post_process_mask: boolean) => void;
  updateSamples: (samples: number) => void;
  updateHeight: (height: number) => void;
  updateWidth: (width: number) => void;
  updateNumInferenceSteps: (num_inference_steps: number) => void;
  updateSafetyChecker: (safety_checker: boolean) => void;
  updateEnhancePrompt: (enhance_prompt: string) => void;
  updateGuidanceScale: (guidance_scale: number) => void;
  updateStrength: (strength: number) => void;
  updateOnlyMask: (only_mask: boolean) => void;
  updateAlphaMatting: (alpha_matting: boolean) => void;
  updateWebhook: (webhook: string | null) => void;
  updateTrackId: (track_id: string | null) => void;
  updateResults: (results: string[]) => void;
  updateResultHeight: (resultHeight: string) => void;
  updateResultWidth: (resultWidth: string) => void;
  updateEta: (eta: number) => void;
  updateInverseMask: (inverse_mask: boolean) => void;
  updateBase64: (base64: boolean) => void; // new update function
}>((set) => ({
  state: {
    key: "",
    image: "",
    seed: null,
    prompt: "",
    negative_prompt: "",
    inpainting_init_image: "",
    inpainting_mask_image: "",
    post_process_mask: false,
    samples: 1,
    height: 512,
    width: 512,
    num_inference_steps: 30,
    safety_checker: false,
    enhance_prompt: "yes", // changed default value to "yes"
    guidance_scale: 5,
    strength: 0.7,
    only_mask: true,
    alpha_matting: false,
    webhook: null,
    track_id: null,
    results: [],
    resultHeight: "1024",
    resultWidth: "1024",
    eta: 20,
    inverse_mask: true,
    base64: true, // default value
  },
  updateKey: (key) => set((state) => ({ state: { ...state.state, key } })),
  updateImage: (image) =>
    set((state) => ({ state: { ...state.state, image } })),
  updateSeed: (seed) => set((state) => ({ state: { ...state.state, seed } })),
  updatePrompt: (prompt) =>
    set((state) => ({ state: { ...state.state, prompt } })),
  updateNegativePrompt: (negative_prompt) =>
    set((state) => ({ state: { ...state.state, negative_prompt } })),
  updateInpaintingInitImage: (inpainting_init_image) =>
    set((state) => ({ state: { ...state.state, inpainting_init_image } })),
  updateInpaintingMaskImage: (inpainting_mask_image) =>
    set((state) => ({ state: { ...state.state, inpainting_mask_image } })),
  updatePostProcessMask: (post_process_mask) =>
    set((state) => ({ state: { ...state.state, post_process_mask } })),
  updateSamples: (samples) =>
    set((state) => ({ state: { ...state.state, samples } })),
  updateHeight: (height) =>
    set((state) => ({ state: { ...state.state, height } })),
  updateWidth: (width) =>
    set((state) => ({ state: { ...state.state, width } })),
  updateNumInferenceSteps: (num_inference_steps) =>
    set((state) => ({ state: { ...state.state, num_inference_steps } })),
  updateSafetyChecker: (safety_checker) =>
    set((state) => ({ state: { ...state.state, safety_checker } })),
  updateEnhancePrompt: (enhance_prompt) =>
    set((state) => ({ state: { ...state.state, enhance_prompt } })), // updated function implementation
  updateGuidanceScale: (guidance_scale) =>
    set((state) => ({ state: { ...state.state, guidance_scale } })),
  updateStrength: (strength) =>
    set((state) => ({ state: { ...state.state, strength } })),
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
  updateResultHeight: (resultHeight) =>
    set((state) => ({ state: { ...state.state, resultHeight } })),
  updateResultWidth: (resultWidth) =>
    set((state) => ({ state: { ...state.state, resultWidth } })),
  updateEta: (eta) => set((state) => ({ state: { ...state.state, eta } })),
  updateInverseMask: (inverse_mask) =>
    set((state) => ({ state: { ...state.state, inverse_mask } })),
  updateBase64: (base64) =>
    set((state) => ({ state: { ...state.state, base64 } })), // new update function implementation
}));

export default useReplaceBackgroundStore;
