import { Center, Text, Text3D } from "@react-three/drei";
import { extend, ReactThreeFiber, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";
import { DefaultShaderMaterial } from "./materials/DefaultShaderMaterial";

extend({ DefaultShaderMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      defaultShaderMaterial: ReactThreeFiber.Object3DNode<
        DefaultShaderMaterial,
        typeof DefaultShaderMaterial
      >;
    }
  }
}

interface TextComponentProps {
  pos: {x: number, y: number, z: number};
  index: string;
  content: string;
}

export const TextComponent = ({
  pos,
  index,
  content,
}: TextComponentProps): JSX.Element => {
  const groupRef = useRef<Group>(null!);

  // useFrame(({ clock }, dt) => {
  //   groupRef.current.position.y += dt * 1.0
  // })

  return (
    <group ref={groupRef} position={[pos.x, pos.y, pos.z]}>
        <Text
          font={"./3D_fonts/Roboto-Regular.ttf"}
          fontSize={0.2}
          position={[pos.x - 0.2, pos.y + 0.46, 0]}
        >
          {index}
          <defaultShaderMaterial />
        </Text>
        <Text
          position={[pos.x, pos.y, 0]}
          font={"./3D_fonts/Roboto-Medium.ttf"}
          anchorX="left"
          // anchorY="middle"
          fontSize={1.5}
          maxWidth={200}
          lineHeight={1}
          letterSpacing={-0.065}
        >
          {content}
          <defaultShaderMaterial />
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
