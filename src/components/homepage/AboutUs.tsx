import React from "react";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import { content } from "@/lib/constants";
import SectionTitle from "../Title";

function AboutUs() {
  return (
    <div className="w-full h-[70vh] py-7 flex flex-col items-center justify-evenly gap-5 my-5">
      <SectionTitle
        title="About Us"
        description="We are a team of passionate developers and designers who love to create amazing things"
      />

      <StickyScroll content={content} />
    </div>
  );
}

export default AboutUs;
