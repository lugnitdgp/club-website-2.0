"use client";
import dynamic from "next/dynamic";
import { timeLineMock } from "@/lib/sampleTimelineData";
const Canvas = dynamic(() => import("./Canvas"), {
  ssr: false,
});

export default function Page({ timelineData }: { timelineData: any }) {
  return (
    <div className="overflow-x-hidden">
      <Canvas timelineData={timelineData} />

      {/* <div className="dark:hidden"> */}
      {/*   <Canvas timelineData={timeLineMock} /> */}
      {/* </div> */}
      {/* <div className="hidden dark:block"> */}
      {/*   <Canvas */}
      {/*     timelineData={timeLineMock} */}
      {/*     darkConfig={{ */}
      {/*       monthColor1: "#e7bdb7", */}
      {/*       onMonthColorl: "#442926", */}
      {/*       monthColor2: "#dfc38c", */}
      {/*       onMonthColor2: "#3e2e04", */}
      {/*       lineColor: "#ede0de", */}
      {/*       textColor: "#ede0de", */}
      {/*     }} */}
      {/*   /> */}
      {/* </div> */}
    </div>
  );
}
