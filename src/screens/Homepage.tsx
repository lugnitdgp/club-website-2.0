'use-client'

import React from "react";
import Image from "next/image";
import {homepage_penguin} from '../../public'
function Homepage() {
  return (
    <>
     
      <div className=" flex flex-row  justify-between align-middle h-screen ">
        <div className="home-onboard-text flex  w-3/6 flex-col justify-evenly px-7 mx-auto ">
          <div>
          <div className="font-bold text-heading leading-10 dark:text-primary">Explore</div>
          <div className="font-Monsterrat_Alternates font-bold text-heading text-primary ">
            Create
          </div>
          <div className=" font-bold text-heading leading-10">Inspire</div>
          </div>
          <div>
          <div className="font-bold text-6xl mt-10 pb-1 text-onSurface">
            GNU/Linux Users' Group
          </div>
          <div className="font-normal text-xl  mt-5 ">
            <p>GNU/Linux Users' Group NIT Durgapur a community of GNU/Linux </p>
            <p>Users that promote the use of Free and Open Source Software. </p>
          </div>
          </div>
         
        </div>
        <div className=" w-2/6  h-screen "  >
          <Image src={homepage_penguin} alt={""}  className=" h-screen" />
        </div>
      </div>
      
    </>
  );
}

export default Homepage;
