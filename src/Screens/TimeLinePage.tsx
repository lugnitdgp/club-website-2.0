"use client";
import dynamic from "next/dynamic";

const Canvas = dynamic(() => import("./Canvas"), {
  ssr: false,
});

export default function Page() {
  return (
    <div className="overflow-x-hidden">
      <Canvas />
    </div>
  );
}
