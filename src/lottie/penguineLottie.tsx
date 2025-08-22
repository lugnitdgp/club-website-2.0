"use client";
import Lottie from "lottie-react";
import penguineLottie from "./penguine.json";

const PenguineLottie = () => {
  return <Lottie animationData={penguineLottie} loop={true} />;
};

export default PenguineLottie;
