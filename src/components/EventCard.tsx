"use client";
import React from "react";
import Image from "next/image";
import { alarm, location_on } from "../../public";

const EventCard = ({ eventObj }:any) => {
  return (
    <div className="flex flex-col rounded-3xl cursor-pointer" >
      <div className="text-center font-medium text-3xl m-4">
        <p className="uppercase dark:text-black">{eventObj.title}</p>
      </div>
      <div className="flex justify-center mb-3  h-52">
        <img src={eventObj.image} alt="" className="object-contain" />
      </div>
      <div className="flex w-full justify-center m-2">
        <div className="flex h-10 mz-2  ">
          <Image src={alarm} alt={""} className="m-2" />

          <p className=" self-center font-semibold dark:text-black">{eventObj.time}</p>
        </div>
        <div className="flex h-10 mx-2 ">
          <Image src={location_on} alt={""} className="m-2" />
          <p className="self-center font-semibold dark:text-black">{eventObj.location}</p>
        </div>
      </div>
      <div className=" mt-1 mb-4 w-5/6 self-center dark:text-black">
        <p>{String(eventObj.description).slice(0,146)}  <b>......</b></p>
      </div>
    </div>
  );
};

export default EventCard;
