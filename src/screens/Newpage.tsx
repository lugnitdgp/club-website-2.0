"use-client";

import React from "react";
import Image from "next/image";
import {
  groups_icon,
  computer_icon,
  events_icon,
  group_photo,
} from "../../public";
function Newpage() {
  return (
    <>
      <div className=" flex flex-row  justify-around align-middle h-5/6 w-full py-10">
        <div className="bg-tertiary dark:bg-tertiaryDark h-full w-2/6 rounded-lg flex flex-col justify-center items-center px-4 py-2">
          <Image
            src={groups_icon}
            alt={"error"}
            className="dark:invert h-40 w-40"
          ></Image>
          <div className="font-bold font-Monsterrat text-8xl mt-4 text-onBackground dark:text-onBackgroundDark">
            50
          </div>
          <div className="font-bold font-Monsterrat text-4xl mt-2 text-onBackground dark:text-onBackgroundDark">
            members
          </div>
        </div>
        <div className="flex flex-col justify-center items-center h-full w-2/5">
          <div className="bg-primaryContainer dark:bg-[#37302F] flex flex-row w-full mb-4 justify-around rounded-lg py-4 px-4">
            <Image
              src={events_icon}
              alt={"error"}
              className="dark:invert h-32 w-32"
            ></Image>
            <div className="flex flex-col">
              <div className="font-bold font-Monsterrat text-6xl mt-4 text-onBackground dark:text-onBackgroundDark">
                60
              </div>
              <div className="font-bold font-Monsterrat text-3xl mt-2 text-onBackground dark:text-onBackgroundDark">
                Events
              </div>
            </div>
          </div>
          <div className="bg-primaryContainer dark:bg-[#37302F] flex flex-row w-full justify-around rounded-md py-4 px-4">
            <Image
              src={computer_icon}
              alt={"error"}
              className="dark:invert h-32 w-32"
            ></Image>
            <div className="flex flex-col">
              <div className="font-bold font-Monsterrat text-6xl mt-4 text-onBackground dark:text-onBackgroundDark">
                17
              </div>
              <div className="font-bold font-Monsterrat text-3xl mt-2 text-onBackground dark:text-onBackgroundDark">
                Projects
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full mt-4 justify-between">
        <div className="flex flex-row justify-betweena align-middle h-full p-2">
          <div className="flex flex-col justify-top px-7 w-1/2 mx-0">
            <div className="font-onboard-text font-semibold text-6xl pb-2">
              <span className="text-primary dark:text-primaryDark">Who </span>
              <span className="text-onBackground dark:text-onBackgroundDark">
                We Are
              </span>
            </div>
            <div className="font-Monsterrat text-base font-normal leading-7 text-backgroundDark dark:text-onBackgroundDark">
              The GNU/Linux Users' Group, NIT Durgapur is a community of
              GNU/Linux Users that promote the use of Free and Open Source
              Software. The Group was established in 2003 by a bunch of FOSS
              enthusiasts with the idea of popularising and contributing to Open
              Source. We are a plethora of designers, contributors and
              developers that believe in learning and sharing through opening up
              your mind to Open Source.
            </div>
          </div>
          <div className="w-1/2 p-4">
            <Image
              src={group_photo}
              alt={"error"}
              className="rounded-lg h-full w-full"
            ></Image>
          </div>
        </div>
      </div>
    </>
  );
}

export default Newpage;
