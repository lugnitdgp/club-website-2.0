"use client";
import React from "react";
import Image from "next/image";
import { homepage_penguin_dark } from "../../../public/assets";
import { motion } from "framer-motion";
import { AuroraText } from "../magicui/aurora-text";
import { DotPattern } from "../magicui/dots";
import { NumberTicker } from "../magicui/number-ticker";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import { content } from "@/lib/constants";

function LandingComponent() {
  return (
    <>
      <div className="snap-start relative flex flex-row overflow-x-hidden justify-between align-middle h-screen ">
        <div className="home-onboard-text flex w-5/6  md:w-3/6 flex-col mt-20  md:mt-0 md:justify-evenly md:px-7 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeIn" }}
            viewport={{ once: true }}
            className="hidden md:block "
          >
            <div className="font-bold text-heading leading-10 text-onBackground dark:text-onBackgroundDark">
              Explore
            </div>
            <div className="font-Monsterrat_Alternates font-bold text-heading ">
              <AuroraText> Create</AuroraText>
            </div>
            <div className=" font-bold text-heading leading-10 text-onBackground dark:text-onBackgroundDark">
              Inspire
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeIn" }}
            viewport={{ once: true }}
            className="text-6xl font-bold text-onBackground dark:text-onBackgroundDark md:hidden text-left"
          >
            Explore <span className="text-primary">Create</span> Inspire
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeIn" }}
            viewport={{ once: true }}
          >
            <div className="font-bold xl:whitespace-nowrap text-2xl md:text-6xl mt-8 md:mt-10 pb-1 text-left text-onBackground dark:text-onBackgroundDark">
              GNU/Linux Users' Group
            </div>
            <div className="hidden md:block font-normal text-sm md:text-xl mt-2 md:mt-5 text-onBackground dark:text-onBackgroundDark ">
              <p>
                GNU/Linux Users' Group NIT Durgapur a community of GNU/Linux
                Users that promote the use of Free and Open Source Software.
              </p>
            </div>
            <div className="flex flex-col items-center mt-10">
              <div className="flex flex-row justify-around w-full mt-5">
                <div className="flex flex-col items-center">
                  <NumberTicker value={72} />
                  <div className="text-lg text-onBackground dark:text-onBackgroundDark">Members</div>
                </div>
                <div className="flex flex-col items-center">
                  <NumberTicker value={16} />
                  <div className="text-lg text-onBackground dark:text-onBackgroundDark">Projects</div>
                </div>
                <div className="flex flex-col items-center">
                  <NumberTicker value={50} />
                  <div className="text-lg text-onBackground dark:text-onBackgroundDark">Events</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div
          className=" w-2/6  h-screen hidden md:block"
          initial={{ x: 200, rotate: 30, opacity: 0 }}
          whileInView={{ x: 0, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeIn" }}
          viewport={{ once: true }}
        >
          <Image
            src={homepage_penguin_dark}
            alt={""}
            className="-z-1 h-screen "
          />
        </motion.div>
       

        <Image
          src={homepage_penguin_dark}
          alt={""}
          className="-z-1 h-2/4 w-auto absolute bottom-0 right-0  md:hidden"
        />
      </div>
      <div className="w-full h-[80vh] flex flex-col items-center justify-between gap-5 my-5">
        <p className=" text-3xl">About Us</p>
        <StickyScroll content={content} />
      </div>
      
    </>
  );
}

export default LandingComponent;
