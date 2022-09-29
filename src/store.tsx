import create from "zustand";
import { persist } from "zustand/middleware";
import { createRef, MutableRefObject } from 'react';
import { Group } from "three";

interface AppState {
  view: string;
  textContainerRef: MutableRefObject<Group | null>;
  setView: (view: string) => void;
}

export const useStore = create<AppState>()(  
    persist(
      (set, get) => ({       
        view: "home",
        textContainerRef: createRef(),
        setView: (view: string) => set({ view: view })        
      }),
      {
        name: "r3f_app",
        getStorage: () => localStorage,
        partialize: (state) => ({
          view: state.view
        }),        
      }
    )  
);