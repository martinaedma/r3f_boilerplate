import * as THREE from "three"
import { useStore } from "../store"
import { TextComponent } from "./scene/TextComponent"

export const TextContainer = ():JSX.Element => {
  
  const textContainerRef = useStore((state) => state.textContainerRef)

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

  return <group ref={textContainerRef}>
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