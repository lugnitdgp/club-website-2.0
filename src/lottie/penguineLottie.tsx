"use client";
import Lottie from "lottie-react";
import penguineLottie from "./penguine.json";
import Loading from "./loading.json";

const PenguineLottie = () => {
  return <Lottie animationData={penguineLottie} loop={true} />;
};

export default PenguineLottie;

export const PenguineLoadingLottie = () => {
  return <Lottie animationData={Loading} loop={true}  className=" h-60" />;
};
 