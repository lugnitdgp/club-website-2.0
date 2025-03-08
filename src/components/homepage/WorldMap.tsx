import React from "react";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";
import { DotMap } from "@/assets";
import Image from "next/image";
import SectionTitle from "../Title";
function WorldMap() {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-3 my-8 py-8">
        <SectionTitle title="Connecting the dots of Open Source" description="" />
      </div>
      <Image src={DotMap} alt={"worldmap"} className=" w-3/5 mx-auto pointer-events-none" />
    </>
  );
}

export default WorldMap;
