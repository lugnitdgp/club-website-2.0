"use client";
import React from "react";
import Image from "next/image";
import { alarm, location_on } from "../../public";

const EventCard = ({ eventObj }) => {
  return (
    <div className="flex flex-col rounded-3xl">
      <div className="text-center font-medium text-3xl m-4">
        <p className="">{eventObj.title}</p>
      </div>
      <div className="flex justify-center mb-3  h-72">
        <img src={eventObj.image} alt="" className="object-contain" />
      </div>
      <div className="flex w-full justify-center m-2">
        <div className="flex h-10 mz-2  ">
          <Image src={alarm} alt={""} className="m-2" />

          <p className=" self-center font-semibold">{eventObj.time}</p>
        </div>
        <div className="flex h-10 mx-2 ">
          <Image src={location_on} alt={""} className="m-2" />
          <p className="self-center font-semibold">{eventObj.location}</p>
        </div>
      </div>
      <div className="p-2 mt-1 mb-3 w-5/6 text-center self-center">
        <p>{eventObj.description}</p>
      </div>
    </div>
  );
};

export default EventCard;
