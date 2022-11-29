import { Text } from "@react-three/drei";
import { extend, ReactThreeFiber, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Group, MathUtils } from "three";
import { useStore } from "../../store";
import { TextShaderMaterial } from "./materials/TextShaderMaterial";

extend({ TextShaderMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      textShaderMaterial: ReactThreeFiber.Object3DNode<
        TextShaderMaterial,
        typeof TextShaderMaterial
      >;
    }
  }
}

interface TextComponentProps {
  pos: { x: number; y: number; z: number };
  index: string;
  content: string;
  isEven: boolean;
  i: number;
}

export const TextComponent = ({
  pos,
  index,
  content,
  isEven,
  i,
}: TextComponentProps): JSX.Element => {
  const groupRef = useRef<Group>(null!);
  const currentItemIndex = useStore((state) => state.currentItemIndex);
  const cameraRef = useStore((state) => state.cameraRef);
  const animationVariables = useStore((state) => state.animationVariables);
  const links = useStore((state) => state.links)
  const [itemHeigth, setItemHeigth] = useState(0);

  useFrame((state, delta) => {
    if (
      groupRef.current === null ||
      currentItemIndex.current === null ||
      cameraRef.current === null
    )
      return;

    groupRef.current.position.y = MathUtils.damp(
      groupRef.current.position.y,
      currentItemIndex.current * itemHeigth + i * itemHeigth,
      animationVariables.animationDamp,
      delta * animationVariables.animationDeltaMultiplier
    );

    if (
      groupRef.current.position.y < 0.2 &&
      groupRef.current.position.y > -0.1
    ) {
      groupRef.current.position.z = MathUtils.damp(
        groupRef.current.position.z,
        1.5,
        6,
        delta
      );
    } else if (groupRef.current.position.z > 0) {
      groupRef.current.position.z = 0;
    }

    // console.log(groupRef.current.position.distanceTo(cameraRef.current.position))
    
  });

  useEffect(() => {
    if (groupRef.current === null) return;

    const box = new THREE.Box3();
    const centerVector = new THREE.Vector3();
    box.makeEmpty();
    box.expandByObject(groupRef.current, true);
    const yMin = box.min.y;
    const yMax = box.max.y;
    box.getCenter(centerVector);
    setItemHeigth(Math.round((yMax - yMin) * 1000) / 1000);
  }, []);

  return (
    <group ref={groupRef} position={[pos.x, i * itemHeigth, pos.z]}>
      <Text
        font={"./3D_fonts/Thermidava Black.ttf"}
        fontSize={0.25}
        position={[pos.x + (isEven ? 6.5 : -6), pos.y + 0.4, 0]}
      >
        {index}
        <textShaderMaterial />
      </Text>
      <Text
        name="test"
        position={[0, 0, 0]}
        font={"./3D_fonts/Thermidava Black.ttf"}
        anchorX="center"
        // anchorY="middle"
        fontSize={1.5}
        maxWidth={200}
        lineHeight={2}
        letterSpacing={-0.015}
      >
        {content}
        <textShaderMaterial />
      </Text>
    </group>
  );

  //   return<mesh>
  //   <planeGeometry
  //     attach="geometry"
  //     // args={[(viewSize.height * 16) / 9, viewSize.height, 1, 1]}
  //     args={[16, 9, 1, 1]}
  //   />
  //   <defaultShaderMaterial/>
  // </mesh>
};
