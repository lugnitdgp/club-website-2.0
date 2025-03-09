"use client";
import React from "react";
import Image from "next/image";
import { homepage_penguin_dark, header } from "../../assets";
import { motion } from "framer-motion";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";
import { NumberTicker } from "../magicui/number-ticker";
import { useFetchCountQuery } from "@/store/slices/countSlice";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
function LandingComponent() {
  const { data, isLoading, error } = useFetchCountQuery({});
  return (
    <>
  
      <div className="snap-start relative flex flex-row overflow-x-hidden justify-between align-middle h-screen pt-10 ">
        <div className="home-onboard-text flex w-5/6  md:w-3/6 flex-col justify-evenly  md:px-7 mx-auto">
          <div className="group relative mx-auto flex w-max items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] ">
            <span
              className={cn(
                "absolute inset-0 block  animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
              )}
              style={{
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "destination-out",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "subtract",
                WebkitClipPath: "padding-box",
              }}
            />
            🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
            <AnimatedGradientText className="text-base font-medium cursor-pointer">
              MUKTI 2026 Coming Soon
            </AnimatedGradientText>
          </div>
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
