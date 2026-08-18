import { PenguineLoadingLottie } from "@/lottie/penguineLottie";
import React from "react";

function DataLoader({ text }: { text: string }) {
  return (
    <div className=" h-[70vh] w-full flex flex-col gap-4 justify-center items-center">
      <div className="w-40 h-40">
        <PenguineLoadingLottie />
      </div>
      <p className=" capitalize mb-2 text-center">
        {text}
      </p>
    </div>
  );
}
export default DataLoader;
