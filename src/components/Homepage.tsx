import React from "react";
import Image from "next/image";
function Homepage() {
  return (
    <>
      <div className="fixed z-[-1] top-4 left-20">
        <Image src="/icons/Polygon1.svg" alt="logo" height={150} width={170} />
      </div>
      <div className="fixed z-[-1] top-4 right-96">
        <Image src="/icons/Polygon2.svg" alt="logo" height={90} width={90} />
      </div>
      <div className="fixed z-[-1] bottom-4 left-32">
        <Image src="/icons/Polygon3.svg" alt="logo" height={140} width={140} />
      </div>

      <div className="fixed z-[-1] right-0">
        <Image
          src="/icons/Vector.svg"
          alt="logo"
          height={0}
          width={420}
        />
      </div>
      <div className="flex -gap-6  flex-col justify-center h-full w-full pt-40 pl-20">
        <h1 className="font-bold text-heading leading-10">Explore</h1>
        <h1 className="font-Monsterrat_Alternates font-bold text-heading text-primary ">
          Create
        </h1>
        <h1 className=" font-bold text-heading leading-10">Inspire</h1>
      </div>

      <div className="flex flex-col justify-center h-full w-full mt-20 pt-16 pl-20">
        <h2 className="font-bold text-4xl pb-1 text-onSurface">
          GNU/Linux Users' Group
        </h2>
        <div className="font-normal text-base">
          <p>GNU/Linux Users' Group NIT Durgapur a community of GNU/Linux </p>
          <p>Users that promote the use of Free and Open Source Software. </p>
        </div>
      </div>
    </>
  );
}

export default Homepage;
