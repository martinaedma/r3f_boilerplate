import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { link } from "fs";
import { off } from "process";
import {
  createRef,
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import { Group, MathUtils } from "three";
import { useStore } from "../store";
import { TextComponent } from "./scene/TextComponent";

interface TextContainerProps {
  containerRef: MutableRefObject<Group | null>;
}

export const TextContainer = ({
  containerRef
}: TextContainerProps): JSX.Element => {
  const cameraRef = useStore((state) => state.cameraRef);
  const scrollDirection = useStore((state) => state.scrollDirection);
  const currentItemIndex = useStore((state) => state.currentItemIndex);
  const [boxHeight, setBoxHeigth] = useState({
    min: 0,
    max: 0,
    center: 0,
    itemHeigth: 0,
  });
  const links = useStore((state) => state.links)


  useEffect(() => {
    if (cameraRef.current === null) return
    // console.log(cameraRef.current)
    // const z = cameraRef.current.position.z
    // const fov = cameraRef.current.fov
    // const halfHeight = Math.sqrt(Math.pow(fov, 2) - Math.pow(z, 2))  
    // console.log(halfHeight)
  }, [cameraRef])

  useFrame(() => {
    
  })
  
  useEffect(() => {
    if (!containerRef.current || !cameraRef.current) return;

    const box = new THREE.Box3();
    const centerVector = new THREE.Vector3();
    box.makeEmpty();
    box.expandByObject(containerRef.current, true);
    const yMin = box.min.y;
    const yMax = box.max.y;
    box.getCenter(centerVector);
    // cameraRef.current.position.y = centerVector.y;
    // cameraRef.current.position.x = centerVector.x;

    setBoxHeigth(prev => {return {
      min: yMin,
      max: yMax,
      center: centerVector.y,
      itemHeigth: (yMax - yMin) / links.length 
    }})

   

  }, [cameraRef, containerRef, links, links.length]);

  const RenderedLinks = links.map((item, i) => {
    const indexString = (i + 1).toString();
    return (
      <TextComponent
        key={item + i}
        index={(indexString.length < 2 ? "0" : "") + indexString}
        content={item}
        pos={{ x: 0, y: 0, z: 0 }}
        isEven={i % 2 === 0 ? true : false}
        i={i}
      />
    );
  });

  return (
    <group ref={containerRef} position={[0, 0, 0]}>    
      {RenderedLinks}
    </group>
  );
};
