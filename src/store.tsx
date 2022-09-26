import create from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  view: string;
  setView: (view: string) => void;
}

export const useStore = create(  
    persist<AppState>(
      (set, get) => ({       
        view: "home",
        setView: (view: string) => set({ view: view })        
      }),
      {
        name: "r3f_app",
        getStorage: () => sessionStorage,
        partialize: state => {
          return {...state, view: state.view}
        },        
      }
    )  
);