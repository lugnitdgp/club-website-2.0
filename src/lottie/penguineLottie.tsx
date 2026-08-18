"use client";
import dynamic from "next/dynamic";

// Dynamically import lottie-react to avoid SSR issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import penguineLottie from "./penguine.json";
import Loading from "./loading.json";

// Optional: static penguin (if you use it somewhere else)
const PenguineLottie = () => {
  return (
    <Lottie
      animationData={penguineLottie}
      loop
      className="w-full h-full object-contain"
    />
  );
};

export default PenguineLottie;

export const PenguineLoadingLottie = () => {
  return (
    <Lottie
      animationData={Loading}
      loop
      className="w-full h-full object-contain"
    />
  );
};