import create from "zustand";
import { persist } from "zustand/middleware";
import { createRef, MutableRefObject } from 'react';
import { Group, PerspectiveCamera } from "three";
import { Camera } from "@react-three/fiber";

interface AppState {
  view: string;
  textContainerFirstRef: MutableRefObject<Group | null>;
  textContainerSecondRef: MutableRefObject<Group | null>;
  cameraRef: MutableRefObject<PerspectiveCamera | null>;
  scrollDirection: MutableRefObject<number | null>;
  currentItemIndex: MutableRefObject<number | null>;
  tiltRef: MutableRefObject<number | null>;
  sphereRadius: number;
  animationVariables: AnimationVariables;
  links: string[];
  setView: (view: string) => void;
}

interface AnimationVariables {
  animationDamp: number;
  animationDeltaMultiplier: number
}

export const useStore = create<AppState>()(  
    persist(
      (set, get) => ({       
        view: "home",
        sphereRadius: 16,
        textContainerFirstRef: createRef(),
        textContainerSecondRef: createRef(),
        scrollDirection: createRef(),
        currentItemIndex: createRef(),
        cameraRef: createRef(),
        tiltRef: createRef(),
        animationVariables: {
          animationDamp: 2,
          animationDeltaMultiplier: 2.5
        },
        links: [
          "SOME TEXT", 
          "ANOTHER THING", 
          "TESTING",
          "SOME TEXT", 
          "ANOTHER THING", 
          "TESTING",
          "SOME TEXT", 
          "ANOTHER THING", 
          "TESTING",
          "SOME TEXT", 
          "ANOTHER THING", 
          "TESTING",
          "SOME TEXT", 
          "ANOTHER THING", 
          "TESTING",
          "SOME TEXT", 
          "ANOTHER THING", 
          "TESTING",
        ],
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