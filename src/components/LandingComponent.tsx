"use-client";

import React from "react";
import Image from "next/image";
import { homepage_penguin,homepage_penguin_dark } from "../../public";
function LandingComponent() {
  return (
    <>
      <div className=" flex flex-row  justify-between align-middle h-screen ">
        <div className="home-onboard-text flex  w-3/6 flex-col justify-evenly px-7 mx-auto">
          <div>
            <div className="font-bold text-heading leading-10 text-onBackground dark:text-onBackgroundDark">
              Explore
            </div>
            <div className="font-Monsterrat_Alternates font-bold text-heading text-primary dark:text-primaryDark">
              Create
            </div>
            <div className=" font-bold text-heading leading-10 text-onBackground dark:text-onBackgroundDark">
              Inspire
            </div>
          </div>
          <div>
            <div className="font-bold xl:whitespace-nowrap text-6xl mt-10 pb-1 text-onBackground dark:text-onBackgroundDark">
              GNU/Linux Users' Group
            </div>
            <div className="font-normal text-xl  mt-5 text-onBackground dark:text-onBackgroundDark ">
              <p>
                GNU/Linux Users' Group NIT Durgapur a community of GNU/Linux
                Users that promote the use of Free and Open Source Software.
              </p>
            </div>
          </div>
        </div>
        <div className=" w-2/6  h-screen ">
          <Image
            src={homepage_penguin}
            alt={""}
            className="-z-1 h-screen dark:hidden"
          />
          <Image
            src={homepage_penguin_dark}
            alt={""}
            className="-z-1 h-screen hidden dark:block"
          />
        </div>
      </div>
    </>
  );
}

export default LandingComponent;
