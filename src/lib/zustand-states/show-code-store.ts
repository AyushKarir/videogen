import { create } from "zustand";

interface ShowCodeState {
    showCode: boolean;
    setShowCode: (show: boolean) => void;
    toggleShowCode: () => void;
}

export const useShowCodeStore = create<ShowCodeState>((set) => ({
    showCode: false,
    setShowCode: (show: boolean) => set({ showCode: show }),
    toggleShowCode: () => set((state) => ({ showCode: !state.showCode })),
}));
