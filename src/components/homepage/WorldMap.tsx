import React from "react";
import { DotMap } from "@/assets";
import Image from "next/image";
import SectionTitle from "../Title";

function WorldMap() {
  return (
    <div className="w-full flex flex-col items-center py-16 bg-background transition-colors duration-300">
      <SectionTitle title="Connecting the dots of Open Source" description="" />
      <div className="w-full md:w-3/5 mx-auto px-4 mt-8">
        <Image
          src={DotMap}
          alt="worldmap"
          className="w-full pointer-events-none dark:invert dark:opacity-70"
        />
      </div>
    </div>
  );
}

export default WorldMap;