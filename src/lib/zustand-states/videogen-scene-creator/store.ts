import { create } from "zustand";

interface videogenState {
    key: string;
    neg_prompt: string;
    prompt1: string;
    prompt2: string;
    prompt3: string;
    output_file: string;
    model: "mp4" | "gif";
}

const useVideogenSceneCreatorStore = create<{
    state: videogenState;
    updateKey: (key: string) => void;
    updateNegPrompt: (neg_prompt: string) => void;
    updatePrompt1: (prompt1: string) => void;
    updatePrompt2: (prompt2: string) => void;
    updatePrompt3: (prompt3: string) => void;
    updateOutputFile: (output_file: string) => void;
    updateModel: (model: "mp4" | "gif") => void;
}>((set) => ({
    state: {
        key: "",
        neg_prompt: "",
        prompt1: "",
        prompt2: "",
        prompt3: "",
        // duration: "5",
        output_file: "",
        model: "mp4",
    },
    updateKey: (key) => set((state) => ({ state: { ...state.state, key } })),
    updatePrompt1: (prompt1) =>
        set((state) => ({ state: { ...state.state, prompt1 } })),
    updatePrompt2: (prompt2) =>
        set((state) => ({ state: { ...state.state, prompt2 } })),
    updatePrompt3: (prompt3) =>
        set((state) => ({ state: { ...state.state, prompt3 } })),
    updateNegPrompt: (neg_prompt) =>
        set((state) => ({ state: { ...state.state, neg_prompt } })),

    updateOutputFile: (output_file) =>
        set((state) => ({ state: { ...state.state, output_file } })),
    updateModel: (model) =>
        set((state) => ({ state: { ...state.state, model } })),

}))

export default useVideogenSceneCreatorStore;