import { create } from "zustand";
import { CaseCategory, ICase } from "../types";

interface CaseState {
  cases: ICase[];
  setCases: (cases: ICase[]) => void;
  getCaseById: (caseId: number) => ICase | undefined;
  getCasesByCategory: (category: CaseCategory) => ICase[];
}

export const useCaseStore = create<CaseState>((set, get) => ({
  cases: [],

  setCases: (cases) => set({ cases }),

  getCaseById: (caseId) => {
    const state = get();
    return state.cases.find((c) => c.id === caseId);
  },

  getCasesByCategory: (category) => {
    const state = get();
    return state.cases.filter((c) => c.category === category);
  },
}));
