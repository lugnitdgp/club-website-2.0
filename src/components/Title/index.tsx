import React from "react";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";

function SectionTitle(
 {title, description}: {title: string, description: string}
) {
  return (
    <div className=" py-2  md:py-4 flex flex-col items-center justify-center w-full gap-3 md:gap-4 ">
      <p className=" text-2xl md:text-5xl font-bold text-center">
        {title.substring(0, title.indexOf(" "))}{" "}
        <AnimatedGradientText>
          {title.substring(title.indexOf(" "))}
        </AnimatedGradientText>
      </p>
      <p>{description}</p>
    </div>
  );
}

export default SectionTitle;
