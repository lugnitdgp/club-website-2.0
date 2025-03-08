"use client";
import Image from "next/image";
import {
  computer_icon,
  events_icon,
  groups_icon,
  grops_icon_dark,
  events_dark,
  computer_dark,
} from "../../assets";
import { motion } from "framer-motion";
import { BentoCard, BentoGrid } from "../magicui/bento-grid";
import { features } from "@/lib/constants";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";

const Achievement = ({ icon, icon_dark, num, text, isPrimary }: any) => {
  if (isPrimary) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex md:flex-col md:row-span-2 justify-between items-center bg-tertiary dark:bg-[#292322] text-onTertiary dark:text-[#EDE0DE] px-6 py-2 md:py-4 md:pb-6 rounded-md "
      >
        <Image
          src={icon}
          alt={"error"}
          className="dark:hidden h-24 w-24 md:h-40 md:w-40"
        />
        <Image
          src={icon_dark}
          alt={"error"}
          className="hidden dark:block h-24 w-24 md:h-40 md:w-40"
        />
        <div className="text-center">
          <p className="font-bold font-Monsterrat text-4xl md:text-8xl ">
            {num}
          </p>
          <p className="font-bold font-Monsterrat text-2xl md:text-4xl ">
            {text}
          </p>
        </div>
      </motion.div>
    );
  } else {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-between items-center bg-primaryContainer  dark:bg-[#292322] dark:text-[#EDE0DE] text-onPrimaryContainer px-6 py-2  rounded-md "
      >
        <Image
          src={icon}
          alt={"error"}
          className="dark:hidden h-24 w-24 md:h-28 md:w-28"
        />
        <Image
          src={icon_dark}
          alt={"error"}
          className="hidden dark:block h-24 w-24 md:h-28 md:w-28"
        />
        <div className="text-center">
          <p className="font-bold font-Monsterrat text-4xl md:text-6xl ">
            {num}
          </p>
          <p className="font-bold font-Monsterrat text-2xl md:text-4xl ">
            {text}
          </p>
        </div>
      </motion.div>
    );
  }
};

export const Achievements = () => {
  return (
    <div className=" w-full flex flex-col gap-5 items-center">
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
