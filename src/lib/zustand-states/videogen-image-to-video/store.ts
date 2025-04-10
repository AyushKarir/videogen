import { create } from "zustand";

interface VideogenImagetoVideoState {
    key: string;
    model_id: string;
    init_image: string;
    height: number;
    width: number;
    num_frames: number;
    num_inference_steps: number;
    min_guidance_scale: number;
    max_guidance_scale: number;
    motion_bucket_id: number;
    noise_aug_strength: number;
    webhook: string | null;
    track_id: string | null;

    results: string[];
    eta: number;

}

const useVideogenImageToVideoStore = create<{
    state: VideogenImagetoVideoState;
    updateKey: (key: string) => void;
    updateModelId: (model_id: string) => void;
    updateInitImage: (init_image: string) => void;
    updateHeight: (height: number) => void;
    updateWidth: (width: number) => void;
    updateNumFrames: (num_frames: number) => void;
    updateNumInferenceSteps: (num_inference_steps: number) => void;
    updateMinGuidanceScale: (min_guidance_scale: number) => void;
    updateMaxGuidanceScale: (max_guidance_scale: number) => void;
    updateMotionBucketId: (motion_bucket_id: number) => void;
    updateNoiseAugStrength: (noise_aug_strength: number) => void;
    updateWebhook: (webhook: string | null) => void;
    updateTrackId: (track_id: string | null) => void;

    updateResults: (results: string[]) => void;
    updateEta: (eta: number) => void;
}>((set) => ({
    state: {
        key: "",
        model_id: "svd",
        init_image: "",
        height: 512,
        width: 512,
        num_frames: 25,
        num_inference_steps: 20,
        min_guidance_scale: 1,
        max_guidance_scale: 3,
        motion_bucket_id: 20,
        noise_aug_strength: 0.02,
        webhook: null,
        track_id: null,

        results: [],
        eta: 20,
    },
    updateKey: (key) => set((state) => ({ state: { ...state.state, key } })),
    updateModelId: (model_id) => set((state) => ({ state: { ...state.state, model_id } })),
    updateInitImage: (init_image) => set((state) => ({ state: { ...state.state, init_image } })),
    updateHeight: (height) => set((state) => ({ state: { ...state.state, height } })),
    updateWidth: (width) => set((state) => ({ state: { ...state.state, width } })),
    updateNumFrames: (num_frames) => set((state) => ({ state: { ...state.state, num_frames } })),
    updateNumInferenceSteps: (num_inference_steps) =>
        set((state) => ({ state: { ...state.state, num_inference_steps } })),
    updateMinGuidanceScale: (min_guidance_scale) =>
        set((state) => ({ state: { ...state.state, min_guidance_scale } })),
    updateMaxGuidanceScale: (max_guidance_scale) =>
        set((state) => ({ state: { ...state.state, max_guidance_scale } })),
    updateMotionBucketId: (motion_bucket_id) =>
        set((state) => ({ state: { ...state.state, motion_bucket_id } })),
    updateNoiseAugStrength: (noise_aug_strength) =>
        set((state) => ({ state: { ...state.state, noise_aug_strength } })),
    updateWebhook: (webhook) => set((state) => ({ state: { ...state.state, webhook } })),
    updateTrackId: (track_id) => set((state) => ({ state: { ...state.state, track_id } })),


    updateResults: (results) =>
        set((state) => ({ state: { ...state.state, results } })),
    updateEta: (eta) => set((state) => ({ state: { ...state.state, eta } })),

}))

export default useVideogenImageToVideoStore;