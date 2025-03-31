// import { create } from "zustand";


// type Resolution = "640x480" | "520x480" | "480x360";

// interface Scene {
//     prompt: string;
//     negative_prompt: string;
//     duration: number;
// }

// interface videogenState {
//     key: string;
//     neg_prompt: string;
//     prompt1: string;
//     prompt2: string;
//     prompt3: string;
//     output_file: string;
//     model: "mp4" | "gif";
//     height: number;
//     width: number;
//     temp: boolean;

//     scenes: Scene[];
//     visibleScenes: number;
//     globalNegativePrompt: string;
//     // num_frames: number;
//     // num_inference_steps: number;
//     // min_guidance_scale: number;
//     // max_guidance_scale: number;
//     // motion_bucket_id: number;
//     // noise_aug_strength: number;

//     // webhook: boolean;
//     // track_id: boolean;
//     eta: number;
//     results: string[];
//     resolution: Resolution;
// }

// const useVideogenSceneCreatorStore = create<{
//     state: videogenState;
//     updateKey: (key: string) => void;
//     updateNegPrompt: (neg_prompt: string) => void;
//     updatePrompt1: (prompt1: string) => void;
//     updatePrompt2: (prompt2: string) => void;
//     updatePrompt3: (prompt3: string) => void;
//     updateOutputFile: (output_file: string) => void;
//     updateModel: (model: "mp4" | "gif") => void;
//     updateEta: (eta: number) => void;
//     updateHeight: (height: number) => void;
//     updateWeight: (width: number) => void;
//     updateTemp: (width: boolean) => void;
//     updateResults: (results: string[]) => void;
//     updateResolution: (resolution: Resolution) => void;



//     updateScenePrompt: (index: number, prompt: string) => void;
//     updateGlobalNegativePrompt: (prompt: string) => void;
//     addScene: () => void;
// }>((set) => ({
//     state: {
//         key: "",
//         neg_prompt: "",
//         prompt1: "",
//         prompt2: "",
//         prompt3: "",
//         // duration: "5",
//         output_file: "",
//         model: "mp4",
//         eta: 20,
//         results: [],
//         scenes: [
//             { prompt: "", negative_prompt: "", duration: 3 },
//             { prompt: "", negative_prompt: "", duration: 3 },
//             { prompt: "", negative_prompt: "", duration: 3 },
//             { prompt: "", negative_prompt: "", duration: 3 },
//             { prompt: "", negative_prompt: "", duration: 3 },
//         ],
//         globalNegativePrompt: "",
//         visibleScenes: 3,
//         temp: false,
//         // webhook: false,
//         height: 640,
//         width: 640,
//     },
//     updateKey: (key) => set((state) => ({ state: { ...state.state, key } })),
//     updatePrompt1: (prompt1) =>
//         set((state) => ({ state: { ...state.state, prompt1 } })),
//     updatePrompt2: (prompt2) =>
//         set((state) => ({ state: { ...state.state, prompt2 } })),
//     updatePrompt3: (prompt3) =>
//         set((state) => ({ state: { ...state.state, prompt3 } })),
//     updateNegPrompt: (neg_prompt) =>
//         set((state) => ({ state: { ...state.state, neg_prompt } })),

//     updateOutputFile: (output_file) =>
//         set((state) => ({ state: { ...state.state, output_file } })),
//     updateModel: (model) =>
//         set((state) => ({ state: { ...state.state, model } })),
//     updateEta: (eta) => set((state) => ({ state: { ...state.state, eta } })),
//     updateResults: (results) =>
//         set((state) => ({ state: { ...state.state, results } })),
//     updateResolution: (resolution) =>
//         set((state) => ({ state: { ...state.state, resolution } })),
//     updateTemp: (temp) =>
//         set((state) => ({ state: { ...state.state, temp } })),


//     updateScenePrompt: (index, prompt) =>
//         set((state) => {
//             const newScenes = [...state.state.scenes];
//             newScenes[index] = { ...newScenes[index], prompt };
//             return { state: { ...state.state, scenes: newScenes } };
//         }),

//     updateGlobalNegativePrompt: (prompt) =>
//         set((state) => ({ state: { ...state.state, globalNegativePrompt: prompt } })),
//     addScene: () =>
//         set((state) => {
//             const newVisibleScenes = Math.min(state.state.visibleScenes + 1, 5);
//             return { state: { ...state.state, visibleScenes: newVisibleScenes } };
//         }),
// }))

// export default useVideogenSceneCreatorStore;













import { create } from "zustand";

type Resolution = "640x480" | "520x480" | "480x360";

// Define the scene interface
interface Scene {
    prompt: string;
    duration: number;
}

interface VideogenState {
    key: string;
    neg_prompt: string;
    scenes: Scene[];
    output_file: string;
    // model: "mp4" | "gif";
    height: number;
    width: number;
    temp: boolean;
    webhook: boolean;
    track_id: boolean;
    eta: number;
    results: string[];
    resolution: Resolution;

    resultHeight: string;
    resultWidth: string;
}

const useVideogenSceneCreatorStore = create<{
    state: VideogenState;
    updateKey: (key: string) => void;
    updateNegPrompt: (neg_prompt: string) => void;
    updateScenes: (scenes: Scene[]) => void;
    addScene: (scene: Scene) => void;
    updateScene: (index: number, sceneData: Partial<Scene>) => void;
    deleteScene: (index: number) => void;
    updateOutputFile: (output_file: string) => void;
    updateModel: (model: "mp4" | "gif") => void;
    updateEta: (eta: number) => void;
    updateHeight: (height: number) => void;
    updateWeight: (width: number) => void;
    updateTemp: (temp: boolean) => void;
    updateResults: (results: string[]) => void;
    updateResolution: (resolution: Resolution) => void;
    getFormattedData: () => { scene: any[], negative_prompt: string };


    updateResultHeight: (resultHeight: string) => void;
    updateResultWidth: (resultWidth: string) => void;
}>((set, get) => ({
    state: {
        key: "",
        neg_prompt: "",
        scenes: [
            // Initialize with 3 empty scenes
            { prompt: "", duration: 3 },
            { prompt: "", duration: 3 },
            { prompt: "", duration: 3 },
        ],
        output_file: "",
        // model: "mp4",
        eta: 20,
        results: [],
        resolution: "640x480",
        height: 640,
        width: 640,
        temp: false,
        webhook: false,
        track_id: false,

        resultHeight: "640",
        resultWidth: "480",
    },

    // Update functions
    updateKey: (key) => set((state) => ({ state: { ...state.state, key } })),

    updateNegPrompt: (neg_prompt) =>
        set((state) => ({ state: { ...state.state, neg_prompt } })),

    updateScenes: (scenes) =>
        set((state) => ({ state: { ...state.state, scenes } })),

    addScene: (scene) =>
        set((state) => ({
            state: {
                ...state.state,
                scenes: [...state.state.scenes, scene],
            }
        })),

    updateScene: (index, sceneData) =>
        set((state) => {
            const updatedScenes = [...state.state.scenes];
            updatedScenes[index] = { ...updatedScenes[index], ...sceneData };
            return { state: { ...state.state, scenes: updatedScenes } };
        }),

    deleteScene: (index) =>
        set((state) => {
            const updatedScenes = [...state.state.scenes];
            updatedScenes.splice(index, 1);
            return { state: { ...state.state, scenes: updatedScenes } };
        }),

    updateOutputFile: (output_file) =>
        set((state) => ({ state: { ...state.state, output_file } })),

    updateModel: (model) =>
        set((state) => ({ state: { ...state.state, model } })),

    updateEta: (eta) =>
        set((state) => ({ state: { ...state.state, eta } })),

    updateResults: (results) =>
        set((state) => ({ state: { ...state.state, results } })),

    updateResolution: (resolution) =>
        set((state) => ({ state: { ...state.state, resolution } })),

    updateHeight: (height) =>
        set((state) => ({ state: { ...state.state, height } })),

    updateWeight: (width) =>
        set((state) => ({ state: { ...state.state, width } })),

    updateTemp: (temp) =>
        set((state) => ({ state: { ...state.state, temp } })),


    updateResultHeight: (resultHeight) =>
        set((state) => ({ state: { ...state.state, resultHeight } })),
    updateResultWidth: (resultWidth) =>
        set((state) => ({ state: { ...state.state, resultWidth } })),

    // Format data for API submission
    getFormattedData: () => {
        const { scenes, neg_prompt } = get().state;

        const formattedScenes = scenes.map(scene => ({
            prompt: scene.prompt,
            negative_prompt: neg_prompt,
            duration: scene.duration
        }));

        return {
            scene: formattedScenes,
            negative_prompt: neg_prompt
        };
    }
}));

export default useVideogenSceneCreatorStore;