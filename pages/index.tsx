import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef } from "react";
import { useStore } from "../src/store";

const CanvasComponent = dynamic(
  () => import("../src/components/scene/CanvasComponent"),
  { ssr: false }
);

const Home: NextPage = () => {
  const cameraRef = useStore((state) => state.cameraRef);
  const scrollDirection = useStore((state) => state.scrollDirection);
  const currentItemIndex = useStore((state) => state.currentItemIndex);
  const tiltRef = useStore((state) => state.tiltRef);
  const tiltTrajectory = useRef<number>(1);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (
      cameraRef.current === null ||
      currentItemIndex.current === null ||
      tiltRef.current === null
    )
      return;
    // cameraRef.current.position.y += e.deltaY * -0.01

    if (e.deltaY > 0) {
      scrollDirection.current = -1;
      currentItemIndex.current++;
    }
    if (e.deltaY < 0) {
      scrollDirection.current = 1;
      currentItemIndex.current--;
    }

    if (tiltRef.current === 7) {
      tiltTrajectory.current = -1;
    }

    if (tiltRef.current === -1) {
      tiltTrajectory.current = 1;
    }

    tiltRef.current += tiltTrajectory.current;
  };

  useEffect(() => {
    // if (!scrollDirection.current || !currentItemIndex.current)  return
    scrollDirection.current = 1;
    currentItemIndex.current = 0;
    tiltRef.current = 0;
  }, [currentItemIndex, scrollDirection, tiltRef]);

  return (
    <div className="app-container" onWheel={(e) => handleWheel(e)}>
      <Suspense fallback={null}>
        <CanvasComponent />
      </Suspense>
    </div>
  );
};

export default Home;
