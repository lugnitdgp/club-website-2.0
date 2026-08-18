"use client";
import React from "react";
import Image from "next/image";
import { homepage_penguin_dark, header, header_dark } from "../../assets";
import { motion } from "framer-motion";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";
import { NumberTicker } from "../magicui/number-ticker";
import { useFetchCountQuery } from "@/store/slices/countSlice";
import { cn } from "@/lib/utils";
import { DotPattern } from "../magicui/dots";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";


function LandingComponent() {
  const { data, isLoading } = useFetchCountQuery({});
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <div className="snap-start relative flex flex-row overflow-x-hidden overflow-y-hidden justify-between align-middle h-screen pt-10 ">
        <div className=" h-screen w-screen absolute  ">
          <DotPattern
            className={cn(
              "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]"
            )}
          />
        </div>
        <div className="home-onboard-text flex w-5/6  md:w-3/6 flex-col justify-evenly  md:px-7 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeIn" }}
            viewport={{ once: true }}
          >
            <Image
              src={mounted && resolvedTheme === "dark" ? header_dark : header}
              alt={""}
              className=" md:w-1/2 h-auto mx-auto pointer-events-none"
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
            <div className=" font-normal text-sm md:text-xl mt-2 md:mt-5 text-onBackground dark:text-onBackgroundDark ">
              <p>
                GNU/Linux Users' Group NIT Durgapur a community of GNU/Linux
                Users that promote the use of Free and Open Source Software.
              </p>
            </div>
            <div className="flex flex-col items-center mt-5 md:mt-10">
              {isLoading || !data ? (
                <></>
              ) : (
                <div className=" grid grid-cols-2 md:grid-cols-4 gap-4 justify-around w-full mt-5">
                  {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="flex flex-col items-center">
                      <NumberTicker value={value as number} />
                      <div className="text-xl text-onBackground dark:text-onBackgroundDark">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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