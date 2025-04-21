import { create } from "zustand";

interface TitleState {
    title: string;
    setTitle: (title: string) => void;
    resetTitle: () => void;
}

const DEFAULT_TITLE = "Videogen";

export const useTitleStore = create<TitleState>((set) => ({
    title: DEFAULT_TITLE,
    setTitle: (title: string) => set({ title }),
    resetTitle: () => set({ title: DEFAULT_TITLE }),
}));
