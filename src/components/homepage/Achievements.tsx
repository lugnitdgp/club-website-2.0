"use client";

import { BentoCard, BentoGrid } from "../magicui/bento-grid";
import { features } from "@/lib/constants";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";



export const Achievements = () => {
  return (
    <div className=" w-full flex flex-col gap-5 items-center bg-blue-100">
      <p className=" text-3xl font-bold">
        Our <AnimatedGradientText> Project Showcase</AnimatedGradientText>
      </p>
      <div className=" w-4/5 grid">
        {" "}
        <BentoGrid className="">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
};
