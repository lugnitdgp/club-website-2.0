"use-client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { group_photo, mindersnatch } from "../../public/assets";
import LandingComponent from "../components/homepage/LandingComponent";
import { Achievements } from "@/components/homepage/Achievements";
import LandingAbout from "@/components/homepage/LandingAbout";
function HomePage() {
  return (
    <>
      <div className="snap-y  overflow-y-scroll  h-screen no-scrollbar">
        <LandingComponent />
        <Achievements />
        <LandingAbout />

        {/* <div className="flex flex-col px-10 align-middle mt-10">
          <div className="font-onboard-text font-bold text-6xl mb-8">
             <span className="text-primary dark:text-primaryDark">Latest </span>
            <span className="text-onBackground dark:text-onBackgroundDark">
              Events
            </span>
          </div>

          <div className="w-full h-1/2 my-2">
            <Image
              src={mindersnatch}
              alt={"error"}
              className="rounded-sm h-full w-full"
            ></Image>
          </div>
          <div className="font-onboard-text font-semibold text-5xl my-4">
            <span className="text-onBackground dark:text-onBackgroundDark">
              Minder Snatch
            </span>
          </div>
          <div className="font-Monsterrat font-light text-2xl text-onBackground dark:text-onBackgroundDark mb-4">
            Remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsu
          </div>
          <div className="flex flex-row items-center justify-normal my-4 gap-x-8">
            <div className="flex items-center justify-center rounded-lg bg-primary h-14 w-80">
              <Link
                href="/register"
                className="text-onPrimary font-Monsterrat font-bold text-2xl"
              >
                Register Now
              </Link>
            </div>
            <div className="flex items-center justify-center rounded-lg bg-onPrimaryContainerDark h-14 w-80">
              <Link
                href="/events"
                className="text-[#2C1512] font-Monsterrat font-bold text-2xl"
              >
                See All Events
              </Link>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default HomePage;
