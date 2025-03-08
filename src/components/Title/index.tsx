import React from "react";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";

function SectionTitle(
 {title, description}: {title: string, description: string}
) {
  return (
    <div className="  py-4 flex flex-col items-center w-full gap-4 ">
      <p className="md:text-5xl font-bold">
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
