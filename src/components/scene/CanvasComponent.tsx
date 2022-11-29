import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  Line,
  OrbitControls,
  PerspectiveCamera,
  Plane,
  Scroll,
  ScrollControls,
} from "@react-three/drei";
import { TextContainer } from "../TextContainer";
import { useStore } from "../../store";
import { ImagePlane } from "./ImagePlane";

const CanvasComponent = (): JSX.Element => {
  const cameraRef = useStore((state) => state.cameraRef);
  const textContainerFirstRef = useStore(
    (state) => state.textContainerFirstRef
  );
  const textContainerSecondRef = useStore(
    (state) => state.textContainerSecondRef
  );

  return (
    <div className="canvas-container">
      <Canvas>
        <color attach="background" args={["#FFF4F0"]} />
        {/* <OrbitControls/> */}
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 15]}
          fov={50}
          aspect={window.innerWidth / window.innerHeight}
          near={1}
          far={500}
          ref={cameraRef}
        >
          <ImagePlane/>
        </PerspectiveCamera>

        <ScrollControls infinite={true} pages={1} damping={4} distance={1}>
          <Scroll>
            <TextContainer containerRef={textContainerFirstRef} />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
};

export default CanvasComponent;
