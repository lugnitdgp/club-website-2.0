"use client";
import React from "react";
import Image from "next/image";
import { homepage_penguin_dark, header } from "../../assets";
import { motion } from "framer-motion";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";
import { NumberTicker } from "../magicui/number-ticker";
function LandingComponent() {
  return (
    <>
      <div className="snap-start relative flex flex-row overflow-x-hidden justify-between align-middle h-screen ">
        <div className="home-onboard-text flex w-5/6  md:w-3/6 flex-col justify-evenly  md:px-7 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeIn" }}
            viewport={{ once: true }}
          >
            {/* <div className="font-bold text-heading leading-10 text-onBackground dark:text-onBackgroundDark">
              Explore
            </div>
            <div className=" font-bold text-heading ">
              <AuroraText> Create</AuroraText>
            </div>
            <div className=" font-bold text-heading leading-10 text-onBackground dark:text-onBackgroundDark">
              Inspire
            </div> */}
            <Image
              src={header}
              alt={""}
              className=" w-3/5 h-auto mx-auto pointer-events-none"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeIn" }}
            viewport={{ once: true }}
          >
            <div className="font-bold xl:whitespace-nowrap text-2xl md:text-6xl pb-1 text-left text-onBackground dark:text-onBackgroundDark">
              <AnimatedGradientText>
                GNU/Linux Users' Group
              </AnimatedGradientText>
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
                  <div className="text-lg text-onBackground dark:text-onBackgroundDark">
                    Members
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <NumberTicker value={16} />
                  <div className="text-lg text-onBackground dark:text-onBackgroundDark">
                    Projects
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <NumberTicker value={50} />
                  <div className="text-lg text-onBackground dark:text-onBackgroundDark">
                    Events
                  </div>
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
      </div>
    </>
  );
}

export default LandingComponent;
