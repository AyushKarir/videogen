import { create } from "zustand";

const useApiKeyStore = create<{
  apiKey: string | null;
  updateApiKey: (apiKey: string | null) => void;
}>((set) => ({
  apiKey: null,
  updateApiKey: (apiKey) => set({ apiKey }),
}));

export default useApiKeyStore;
