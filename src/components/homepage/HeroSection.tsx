"use client";
import React from "react";
import Image from "next/image";
import { homepage_penguin_dark, header } from "../../../public/assets";
import { motion } from "framer-motion";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";
import { DotPattern } from "../magicui/dots";
import { NumberTicker } from "../magicui/number-ticker";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import { content } from "@/lib/constants";
import { HeroVideoDialog } from "../ui/hero-video-dialog";
import InteractiveBentoGallery from "../blocks/interactive-bento-gallery";
function LandingComponent() {
  const mediaItems = [
    {
      id: 1,
      type: "image",
      title: "Anurag Mishra",
      desc: "Driven, innovative, visionary",
      url: "https://kxptt4m9j4.ufs.sh/f/9YHhEDeslzkcbP3rYTiXwH7Y106CepJOsoAgQjyFi3MUfDkh",
      span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
    },
    {
      id: 2,
      type: "video",
      title: "Dog Puppy",
      desc: "Adorable loyal companion.",
      url: "https://cdn.pixabay.com/video/2024/07/24/222837_large.mp4",
      span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
    },
    {
      id: 3,
      type: "image",
      title: "Forest Path",
      desc: "Mystical forest trail",
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2 ",
    },
    {
      id: 4,
      type: "image",
      title: "Falling Leaves",
      desc: "Autumn scenery",
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2 ",
    },
    {
      id: 5,
      type: "video",
      title: "Bird Parrot",
      desc: "Vibrant feathered charm",
      url: "https://cdn.pixabay.com/video/2020/07/30/46026-447087782_large.mp4",
      span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2 ",
    },
    {
      id: 6,
      type: "image",
      title: "Beach Paradise",
      desc: "Sunny tropical beach",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2 ",
    },
    {
      id: 7,
      type: "video",
      title: "Shiva Temple",
      desc: "Peaceful Shiva sanctuary.",
      url: "https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4",
      span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2 ",
    },
  ];
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

        <Image
          src={homepage_penguin_dark}
          alt={""}
          className="-z-1 h-2/4 w-auto absolute bottom-0 right-0  md:hidden"
        />
      </div>
      <HeroVideoDialog
        className=" w-3/5 mx-auto"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
        thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
        thumbnailAlt="Hero Video"
      />
      <div className="w-full h-[70vh] flex flex-col items-center justify-evenly gap-5 my-5">
        <p className=" text-3xl font-bold">
          About <AnimatedGradientText> Us</AnimatedGradientText>
        </p>

        <StickyScroll content={content} />
      </div>
      <div className=" flex flex-col items-center  w-full h-[70vh] overflow-y-auto">
        <p className=" text-3xl font-bold">
          Linux <AnimatedGradientText> Gallery</AnimatedGradientText>
        </p>
        <InteractiveBentoGallery
          mediaItems={mediaItems}
          title=""
          description=""
        />
        <p className=" text-center ">
          Fun Fact : You can arrange them the way you like 
        </p>
      </div>
    </>
  );
}

export default LandingComponent;
