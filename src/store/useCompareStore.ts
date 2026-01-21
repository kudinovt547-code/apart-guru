import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Project } from "@/types/project";

interface CompareStore {
  projects: Project[];
  addProject: (project: Project) => void;
  removeProject: (slug: string) => void;
  clearAll: () => void;
  isInCompare: (slug: string) => boolean;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      projects: [],
      addProject: (project) => {
        const current = get().projects;
        if (current.length >= 5) {
          return;
        }
        if (current.some((p) => p.slug === project.slug)) {
          return;
        }
        set({ projects: [...current, project] });
      },
      removeProject: (slug) => {
        set({ projects: get().projects.filter((p) => p.slug !== slug) });
      },
      clearAll: () => {
        set({ projects: [] });
      },
      isInCompare: (slug) => {
        return get().projects.some((p) => p.slug === slug);
      },
    }),
    {
      name: "apart-guru-compare",
    }
  )
);
