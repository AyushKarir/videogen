import { create } from "zustand";

interface GhostGenerationState {
    key: string;
    foreground_ratio: number;
    prompt: string;
    num_inference_steps: number;
    resolution: number;
    guidance_scale: number;
    ss_sampling_steps: number;
    slat_sampling_steps: number;
    seed: number;
    temp: string;
    webhook: string | null;
    track_id: string | null;
    file_format: string; // <-- new field

    results: string[];
}

const useTextTo3DStore = create<{
    state: GhostGenerationState;
    updateKey: (key: string) => void;
    updateForegroundRatio: (foreground_ratio: number) => void;
    updatePrompt: (prompt: string) => void;
    updateNumInferenceSteps: (num_inference_steps: number) => void;
    updateResolution: (resolution: number) => void;
    updateGuidanceScale: (guidance_scale: number) => void;
    updateSsSamplingSteps: (ss_sampling_steps: number) => void;
    updateSlatSamplingSteps: (slat_sampling_steps: number) => void;
    updateSeed: (seed: number) => void;
    updateTemp: (temp: string) => void;
    updateWebhook: (webhook: string | null) => void;
    updateTrackId: (track_id: string | null) => void;
    updateFileFormat: (file_format: string) => void; // <-- new updater
    updateResults: (results: string[]) => void;
}>((set) => ({
    state: {
        key: "",
        foreground_ratio: 0.85,
        prompt: "a ghost wearing white bedsheet",
        num_inference_steps: 30,
        resolution: 512,
        guidance_scale: 3,
        ss_sampling_steps: 50,
        slat_sampling_steps: 50,
        seed: 0,
        temp: "no",
        webhook: null,
        track_id: null,
        file_format: "glb", // <-- default value
        results: [],
    },
    updateKey: (key) => set((state) => ({ state: { ...state.state, key } })),
    updateForegroundRatio: (foreground_ratio) => set((state) => ({ state: { ...state.state, foreground_ratio } })),
    updatePrompt: (prompt) => set((state) => ({ state: { ...state.state, prompt } })),
    updateNumInferenceSteps: (num_inference_steps) => set((state) => ({ state: { ...state.state, num_inference_steps } })),
    updateResolution: (resolution) => set((state) => ({ state: { ...state.state, resolution } })),
    updateGuidanceScale: (guidance_scale) => set((state) => ({ state: { ...state.state, guidance_scale } })),
    updateSsSamplingSteps: (ss_sampling_steps) => set((state) => ({ state: { ...state.state, ss_sampling_steps } })),
    updateSlatSamplingSteps: (slat_sampling_steps) => set((state) => ({ state: { ...state.state, slat_sampling_steps } })),
    updateSeed: (seed) => set((state) => ({ state: { ...state.state, seed } })),
    updateTemp: (temp) => set((state) => ({ state: { ...state.state, temp } })),
    updateWebhook: (webhook) => set((state) => ({ state: { ...state.state, webhook } })),
    updateTrackId: (track_id) => set((state) => ({ state: { ...state.state, track_id } })),
    updateFileFormat: (file_format) => set((state) => ({ state: { ...state.state, file_format } })), // <-- updater
    updateResults: (results) => set((state) => ({ state: { ...state.state, results } })),
}));

export default useTextTo3DStore;
