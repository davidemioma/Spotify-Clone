import { create } from "zustand";

interface Props {
  ids: string[];
  activeId?: string;
  setIds: (ids: string[]) => void;
  setActiveId: (id: string) => void;
  reset: () => void;
}

const usePlayer = create<Props>((set) => ({
  ids: [],
  activeId: undefined,
  setIds: (ids: string[]) => set({ ids: ids }),
  setActiveId: (id: string) => set({ activeId: id }),
  reset: () =>
    set({
      ids: [],
      activeId: undefined,
    }),
}));

export default usePlayer;
