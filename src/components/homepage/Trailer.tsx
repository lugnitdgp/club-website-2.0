"use client";

import { thumbnail } from "@/assets";
import Image from "next/image";
import React, { useState } from "react";

function Trailer() {
  const [trailer, setTrailer] = useState(false);
  return (
    <div className=" h-[65vh] my-7 py-7 aspect-video mx-auto ">
      {trailer ? (
        <iframe
          className="w-full h-full rounded-xl"
          src="https://www.youtube.com/embed/Ukdi3tzU-yE?si=CsjKuh4mtYAx6zGZ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          allowTransparency
          
        ></iframe>
      ) : (
        <Image src={thumbnail} alt="" onClick={() => setTrailer(true)} className=" rounded-xl" />
      )}
    </div>
  );
}

export default Trailer;
