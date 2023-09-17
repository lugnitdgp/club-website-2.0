"use-client";

import React from "react";
import Image from "next/image";
import {
  groups_icon,
  computer_icon,
  events_icon,
  group_photo,
  mindersnatch
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
        <div className="flex flex-row justify-around align-middle h-full p-2">
          <div className="flex flex-col justify-top px-7 w-3/6 mx-0">
            <div className="font-onboard-text font-semibold text-6xl pb-2">
              <span className="text-primary dark:text-primaryDark">Who </span>
              <span className="text-onBackground dark:text-onBackgroundDark">
                We Are
              </span>
            </div>
            <div className="font-Monsterrat text-lg w-5/6 font-normal leading-9 text-backgroundDark dark:text-onBackgroundDark">
              The GNU/Linux Users' Group, NIT Durgapur is a community of
              GNU/Linux Users that promote the use of Free and Open Source
              Software. The Group was established in 2003 by a bunch of FOSS
              enthusiasts with the idea of popularising and contributing to Open
              Source. We are a plethora of designers, contributors and
              developers that believe in learning and sharing through opening up
              your mind to Open Source.
            </div>
          </div>
          <div className="w-3/6 h-5/6 p-6">
            <Image
              src={group_photo}
              alt={"error"}
              className="rounded-lg h-full w-full"
            ></Image>
          </div>
        </div>
        <div className="flex flex-row justify-around align-middle h-full p-2 mt-2">
          <div className="w-3/6 h-5/6 p-6">
            <Image
              src={group_photo}
              alt={"error"}
              className="rounded-lg h-full w-full"
            ></Image>
          </div>
          <div className="flex flex-col justify-top px-7 w-3/6 mx-0">
            <div className="font-onboard-text font-semibold text-6xl pb-2">
              <span className="text-primary dark:text-primaryDark">What </span>
              <span className="text-onBackground dark:text-onBackgroundDark">
                We Do
              </span>
            </div>
            <div className="font-Monsterrat text-lg w-5/6 font-normal leading-9 text-backgroundDark dark:text-onBackgroundDark">
              We provide budding enthusiasts like ourselves a forum to
              contribute and learn about FOSS. Through varied workshops on
              revolutionary Open Technologies throughout the year, we spread the
              idea of Open Source to beginners and veterans alike. We bring
              people together to ideate and contribute to the leading Open
              technologies. We provide help and resources to everyone who wants
              to make the web world a better place.
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-around align-middle h-full p-2 mt-2">
          <div className="flex flex-col justify-top px-7 w-3/6 mx-0">
            <div className="font-onboard-text font-semibold text-6xl pb-2">
              <span className="text-primary dark:text-primaryDark">Our </span>
              <span className="text-onBackground dark:text-onBackgroundDark">
                Vision
              </span>
            </div>
            <div className="font-Monsterrat text-lg w-5/6 font-normal leading-9 text-backgroundDark dark:text-onBackgroundDark">
              Being a bunch of FOSS enthusiasts, we preach the idea of “free
              things are the best things” and firmly believe in sharing
              knowledge. We strive to elevate the tech culture in our college
              and believe that this can only be done through giving people
              digital resources and knowledge in all realms from hardware to
              software and data to design. We promote FOSS through various
              endeavours because we believe in the freedom of expression for
              everyone.
            </div>
          </div>
          <div className="w-3/6 h-5/6 p-6">
            <Image
              src={group_photo}
              alt={"error"}
              className="rounded-lg h-full w-full"
            ></Image>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-10 align-middle mt-10">
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
        <div className="font-onboard-text font-semibold text-6xl my-4">
          <span className="text-onBackground dark:text-onBackgroundDark">
            Minder Snatch
          </span>
        </div>
        <div className="font-Monsterrat font-light text-2xl text-onBackground dark:text-onBackgroundDark">
          Remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsu
        </div>
      </div>
    </>
  );
}

export default Newpage;
