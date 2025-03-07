import React from "react";
import { AuroraText } from "../magicui/aurora-text";

function WorldMap() {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-3 my-8 py-8">
        <p className=" text-3xl font-bold">
          Connecting the dots of <AuroraText> Open Source</AuroraText>
        </p>
      </div>
      <img
        src={"/assets/Images/worldmap.png"}
        alt={"worldmap"}
        className=" w-3/5 mx-auto"
      />
    </>
  );
}

export default WorldMap;
