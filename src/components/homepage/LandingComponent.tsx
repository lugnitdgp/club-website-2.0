"use client";
import React from "react";
import Image from "next/image";
import { homepage_penguin_dark } from "../../../public/assets";
import { motion } from "framer-motion";

function LandingComponent() {
  return (
    <>
      <div className="snap-start relative flex flex-row overflow-x-hidden justify-between align-middle h-screen ">
        <div className="home-onboard-text flex w-5/6  md:w-3/6 flex-col mt-20  md:mt-0 md:justify-evenly md:px-7 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: .3 }}
            className="hidden md:block">
            <div className="font-bold text-heading leading-10 text-onBackground dark:text-onBackgroundDark">
              Explore
            </div>
            <div className="font-Monsterrat_Alternates font-bold text-heading text-primary dark:text-primaryDark">
              Create
            </div>
            <div className=" font-bold text-heading leading-10 text-onBackground dark:text-onBackgroundDark">
              Inspire
            </div>
          </motion.div>
          <motion.p

            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: .3 }}

            className="text-6xl font-bold text-onBackground dark:text-onBackgroundDark md:hidden text-left">
            Explore <span className="text-primary">Create</span> Inspire
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: .3 }}
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
          </motion.div>
        </div>
        <motion.div
          className=" w-2/6  h-screen hidden md:block"
          initial={{ x: 200, rotate: 30, opacity: 0 }}
          whileInView={{ x: 0, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={homepage_penguin_dark}
            alt={""}
            className="-z-1 h-screen "
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .3 }}

          className="absolute left-8 md:hidden bottom-52 text-xs w-1/3">
          GNU/Linux Users' Group NIT Durgapur a community of GNU/Linux Users
          that promote the use of Free and Open Source Software.
        </motion.p>

        <Image
          src={homepage_penguin_dark}
          alt={""}
          className="-z-1 h-2/4 w-auto absolute bottom-0 right-0  md:hidden"
        />
      </div>
    </>
  );
}

export default LandingComponent;
