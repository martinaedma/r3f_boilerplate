import { Box } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import type { NextPage } from 'next'
import { useStore } from '../src/store'

const Home: NextPage = () => {
  const view = useStore((state) => state.view)

  return (
    <div>
    </div>
  )
}

export default Home
