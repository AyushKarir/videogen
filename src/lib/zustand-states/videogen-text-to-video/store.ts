import { create } from "zustand";

interface videogenState {
    key: string;

    neg_prompt: string;
    guidance_scale: number;
    shift_scale: number;
    resolution: string;
    model: string;
    duration: string;
    output_file: string;
    height: string;

    prompt: string;
    num_frames: number;
    num_inference_steps: number;
    upscale_height: number;
    upscale_width: number;
    upscale_strength: number;
    upscale_guidance_scale: number;
    upscale_num_inference_steps: number;
    results: string[];
    eta: number;

    webhook: string | null;
    track_id: string | null;
}

const useVideogenTextToVideo = create<{
    state: videogenState;
    updateKey: (key: string) => void;
    updateNegPrompt: (prompt: string) => void;
    updateGuidanceScale: (guidance_scale: number) => void;
    updateModel: (model: string) => void;
    updateResolution: (resolution: string) => void;
    updateDuration: (duration: string) => void;
    updateOutputFile: (output_file: string) => void;
    updateShiftScale: (shift_scale: number) => void;

    updatePrompt: (prompt: string) => void;
    updateNumFrames: (num_frames: number) => void;
    updateUpscaleHeight: (upscale_height: number) => void;
    updateUpscaleWidth: (upscale_width: number) => void;
    updateUpscaleStrength: (upscale_strength: number) => void;
    updateUpscaleGuidance: (upscale_guidance_scale: number) => void;
    updateNumInferenceSteps: (upscale_num_inference_steps: number) => void;

    updateWebhook: (webhook: string | null) => void;
    updateTrackId: (track_id: string | null) => void;
    updateResults: (results: string[]) => void;
    updateEta: (eta: number) => void;

}>((set) => ({
    state: {
        key: "",
        neg_prompt: "",
        guidance_scale: 6.5,
        shift_scale: 6.5,
        resolution: "landscape", //default resoltiion
        model: "cogvideox",  // Default model
        duration: "5",
        output_file: "",
        height: "512",

        prompt: "",
        num_frames: 25,
        num_inference_steps: 20,
        upscale_height: 640,
        upscale_width: 1024,
        upscale_strength: 0.6,
        upscale_guidance_scale: 12,
        upscale_num_inference_steps: 20,
        results: [],
        eta: 20,
        webhook: null,
        track_id: null,
    },
    updateKey: (key) => set((state) => ({ state: { ...state.state, key } })),
    updateNegPrompt: (neg_prompt) =>
        set((state) => ({ state: { ...state.state, neg_prompt } })),
    updateGuidanceScale: (guidance_scale) =>
        set((state) => ({ state: { ...state.state, guidance_scale } })),
    updateShiftScale: (shift_scale) =>
        set((state) => ({ state: { ...state.state, shift_scale } })),
    updateModel: (model) =>
        set((state) => ({ state: { ...state.state, model } })),
    updateResolution: (resolution) =>
        set((state) => ({ state: { ...state.state, resolution } })),
    updateDuration: (duration) =>
        set((state) => ({ state: { ...state.state, duration } })),
    updateOutputFile: (output_file) =>
        set((state) => ({ state: { ...state.state, output_file } })),


    updatePrompt: (prompt) =>
        set((state) => ({ state: { ...state.state, prompt } })),
    updateNumFrames: (num_frames) =>
        set((state) => ({ state: { ...state.state, num_frames } })),
    updateUpscaleHeight: (upscale_height) =>
        set((state) => ({ state: { ...state.state, upscale_height } })),
    updateUpscaleWidth: (upscale_width) =>
        set((state) => ({ state: { ...state.state, upscale_width } })),
    updateUpscaleStrength: (upscale_strength) =>
        set((state) => ({ state: { ...state.state, upscale_strength } })),
    updateUpscaleGuidance: (upscale_guidance_scale) =>
        set((state) => ({ state: { ...state.state, upscale_guidance_scale } })),
    updateNumInferenceSteps: (num_inference_steps) =>
        set((state) => ({ state: { ...state.state, num_inference_steps } })),

    updateWebhook: (webhook) =>
        set((state) => ({ state: { ...state.state, webhook } })),
    updateTrackId: (track_id) =>
        set((state) => ({ state: { ...state.state, track_id } })),
    updateResults: (results) =>
        set((state) => ({ state: { ...state.state, results } })),
    updateEta: (eta) => set((state) => ({ state: { ...state.state, eta } })),
}))

export default useVideogenTextToVideo;