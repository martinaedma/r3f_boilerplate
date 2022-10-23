import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { TestComponent } from "../src/components/TestComponent";
import { useStore } from "../src/store";

const CanvasComponent = dynamic(
  () => import('../src/components/scene/CanvasComponent'),
  { ssr: false }
);

const Home: NextPage = () => {
  const cameraRef = useStore((state) => state.cameraRef)
  const textContainerFirstRef = useStore((state) => state.textContainerFirstRef)
  const textContainerSecondRef = useStore((state) => state.textContainerSecondRef)

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!cameraRef.current || !textContainerFirstRef || !textContainerSecondRef) return
    cameraRef.current.position.y += e.deltaY * -0.01
  }

  return (
    <div className="app-container" onWheel={(e) => handleWheel(e)}>
      <Suspense fallback={null}>
        <CanvasComponent />
      </Suspense>
      <TestComponent/>
    </div>    
  );
};

export default Home;
