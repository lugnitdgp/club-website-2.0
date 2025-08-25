"use client";
import dynamic from "next/dynamic";

// Dynamically import lottie-react to avoid SSR issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import penguineLottie from "./penguine.json";
import Loading from "./loading.json";

const PenguineLottie = () => {
  return <Lottie animationData={penguineLottie} loop={true} />;
};

export default PenguineLottie;

export const PenguineLoadingLottie = () => {
  return <Lottie animationData={Loading} loop={true} className="h-60" />;
};
