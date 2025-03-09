import { PenguineLoadingLottie } from "@/lottie/penguineLottie";
import React from "react";

function DataLoader({ text }: { text: string }) {
  return (
    <div className=" h-[70vh] w-full flex flex-col gap-4 justify-center items-center">
      <PenguineLoadingLottie />
      <p className=" capitalize mb-2 text-center">
        {text}
      </p>
    </div>
  );
}
export default DataLoader;
