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
    init_image: string;
}

const useVideogenImageToVideoStore = create<{
    state: videogenState;
    updateKey: (key: string) => void;
    updatePrompt: (prompt: string) => void;
    updateGuidanceScale: (guidance_scale: number) => void;
    updateModel: (model: string) => void;
    updateDuration: (duration: string) => void;
    updateOutputFile: (output_file: string) => void;
    updateShiftScale: (shift_scale: number) => void;
    updateInitImage: (init_image: string) => void;
}>((set) => ({
    state: {
        key: "",
        init_image: "",
        neg_prompt: "",
        guidance_scale: 6.5,
        shift_scale: 6.5,
        resolution: "",
        model: "",
        duration: "5",
        output_file: "",
    },
    updateKey: (key) => set((state) => ({ state: { ...state.state, key } })),
    updatePrompt: (neg_prompt) =>
        set((state) => ({ state: { ...state.state, neg_prompt } })),
    updateGuidanceScale: (guidance_scale) =>
        set((state) => ({ state: { ...state.state, guidance_scale } })),
    updateShiftScale: (shift_scale) =>
        set((state) => ({ state: { ...state.state, shift_scale } })),
    updateModel: (model) =>
        set((state) => ({ state: { ...state.state, model } })),
    updateDuration: (duration) =>
        set((state) => ({ state: { ...state.state, duration } })),
    updateOutputFile: (output_file) =>
        set((state) => ({ state: { ...state.state, output_file } })),
    updateInitImage: (init_image) =>
        set((state) => ({ state: { ...state.state, init_image } })),

}))

export default useVideogenImageToVideoStore;