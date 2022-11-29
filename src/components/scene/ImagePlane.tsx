import { Sphere } from "@react-three/drei";
import { extend, ReactThreeFiber, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils } from "three";
import { useStore } from "../../store"
import { PlaneShaderMaterial } from "./materials/PlaneShaderMaterial"

extend({ PlaneShaderMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      planeShaderMaterial: ReactThreeFiber.Object3DNode<
        PlaneShaderMaterial,
        typeof PlaneShaderMaterial
      >;
    }
  }
}

export const ImagePlane = () => {

  const sphereRef = useRef<THREE.Mesh>(null!)
  const tiltRef = useStore((state) => state.tiltRef)
  const currentItemIndex = useStore((state) => state.currentItemIndex)
  const animationVariables = useStore((state) => state.animationVariables);

  useFrame((clock, delta) => {
    if (currentItemIndex.current === null || tiltRef.current === null) return
    sphereRef.current.rotation.y = MathUtils.damp(sphereRef.current.rotation.y, Math.PI * 2 * currentItemIndex.current, animationVariables.animationDamp, delta * 2)
    sphereRef.current.rotation.z = MathUtils.damp(sphereRef.current.rotation.z, 0.05 * tiltRef.current, animationVariables.animationDamp, delta * animationVariables.animationDeltaMultiplier)
  })

  return (
    <Sphere ref={sphereRef} position={[0, 0, -30]} args={[15, 24, 24]}>
    <meshBasicMaterial color="hotpink" opacity={0} transparent={true}/>
        <mesh position={[0, 0, 16.4]}>
          <planeGeometry attach="geometry" args={[16, 9, 38, 38]} />
          <planeShaderMaterial/>
        </mesh>
    </Sphere>
  );
};
