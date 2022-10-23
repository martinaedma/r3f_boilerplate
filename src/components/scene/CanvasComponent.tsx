import React, { useEffect, useRef, useState, MutableRefObject } from "react";
import * as THREE from "three";
import {
  Canvas,
  ReactThreeFiber,
  ThreeEvent,
  useFrame,
  extend,
  invalidate,
} from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { DefaultPlane } from "./DefaultPlane";
import { TextComponent } from "./TextComponent";
import { TextContainer } from "../TextContainer";
import { useStore } from "../../store";
import { Camera, Raycaster } from "three";

const CanvasComponent = (): JSX.Element => {

  const cameraRef = useStore((state) => state.cameraRef)
  const textContainerFirstRef = useStore((state) => state.textContainerFirstRef)
  const textContainerSecondRef = useStore((state) => state.textContainerSecondRef)

  


  return (
    <div className="canvas-container">
      {/* TODO: frameloop="demand" */}
      <Canvas>
        <Rays camera={cameraRef} first={textContainerFirstRef} second={textContainerSecondRef}/>
        <color attach='background' args={['#FFF4F0']}/>
        {/* <OrbitControls /> */}
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 15]}
          fov={50}
          aspect={window.innerWidth / window.innerHeight}
          near={1}
          far={500}
          ref={cameraRef}
        />
        {/* <DefaultPlane/> */}
        {/* <TextComponent/> */}
        <TextContainer containerRef={textContainerFirstRef} yPos={0}/>
        <TextContainer containerRef={textContainerSecondRef} yPos={-20.5}/>
      </Canvas>
    </div>
  );
};


interface RaysProps {
  camera: MutableRefObject<Camera | null>
  first: MutableRefObject<THREE.Group | null>
  second: MutableRefObject<THREE.Group | null>
}

const Rays = ({camera, first, second}: RaysProps) => {  
  // useFrame((state) => {
  //   if (!camera.current || !first.current || !second.current) return

  //   state.raycaster.setFromCamera(new THREE.Vector2(), camera.current)

  //   // const intersects = state.raycaster.intersectObjects([first.current, second.current], false)
  //   const intersects = state.raycaster.intersectObject(second.current, true)
  //   console.log(intersects)
  //  })

   
 
  return <>
  </>
}

export default CanvasComponent;
