import create from "zustand";
import { persist } from "zustand/middleware";
import { createRef, MutableRefObject } from 'react';
import { Group } from "three";
import { Camera } from "@react-three/fiber";

interface AppState {
  view: string;
  textContainerFirstRef: MutableRefObject<Group | null>;
  textContainerSecondRef: MutableRefObject<Group | null>;
  cameraRef: MutableRefObject<Camera | null>;
  setView: (view: string) => void;
}

export const useStore = create<AppState>()(  
    persist(
      (set, get) => ({       
        view: "home",
        textContainerFirstRef: createRef(),
        textContainerSecondRef: createRef(),
        cameraRef: createRef(),
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