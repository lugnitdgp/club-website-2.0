"use client";
import dynamic from "next/dynamic";

const Canvas = dynamic(() => import("./Canvas"), {
  ssr: false,
});

export default function Page({ timelineData }: { timelineData: any }) {
  return (
    <div className="overflow-x-hidden">
      <Canvas timelineData={timelineData} />
    </div>
  );
}
