import { useFrame } from "@react-three/fiber"
import { createRef, MutableRefObject, useEffect, useLayoutEffect, useRef } from "react"
import * as THREE from "three"
import { Group } from "three"
import { useStore } from "../store"
import { TextComponent } from "./scene/TextComponent"

interface TextContainerProps {
  containerRef: MutableRefObject<Group | null>
  yPos: number
}

export const TextContainer = ({containerRef, yPos}: TextContainerProps):JSX.Element => {

  const text: string[] = [
    'MARTIN AEDMA',
    'B. JIU JITSU',
    'S. WRESTLING',
    'MARTIN AEDMA',
    'B. JIU JITSU',
    'S. WRESTLING',
    'MARTIN AEDMA',
    'B. JIU JITSU',
    'S. WRESTLING',
    'MARTIN AEDMA',
    'B. JIU JITSU',
    'S. WRESTLING',
    'MARTIN AEDMA',
    'B. JIU JITSU',
    'S. WRESTLING',
  ]

  // useFrame(() => {
  //   if (!ref.current) return
  //   console.log(ref.current)
  //   ref.current.position.set()
  // })

  return <group ref={containerRef} position={[0, yPos, 0]}>
    {text.map((text, index) => {
      const indexString = (index + 1).toString()
      return <TextComponent
        key={text + index}
        index={ (indexString.length < 2 ? '0' : '') + indexString}
        content={text}
        pos={{x: -1.95, y: index-0.32 * index, z: 0}}
      />
    })}
  </group>
}