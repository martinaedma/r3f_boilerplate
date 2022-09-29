import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useStore } from "../src/store";

const CanvasComponent = dynamic(
  () => import('../src/components/scene/CanvasComponent'),
  { ssr: false }
);

const Home: NextPage = () => {
  const textContainerRef = useStore((state) => state.textContainerRef)

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if(!textContainerRef.current) return    
    textContainerRef.current.position.y += e.deltaY * 0.01
  }

  return (
    <div className="app-container" onWheel={(e) => handleWheel(e)}>
      <Suspense fallback={null}>
        <CanvasComponent />
      </Suspense>
    </div>
  );
};

export default Home;
