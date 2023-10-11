"use client";
import React from "react";
import Image from "next/image";
import { alarm, location_on } from "../../public/assets";
import dayjs from "dayjs";

const EventCard = ({ eventObj, onClick }: any) => {
  return (
    <div className="flex flex-col rounded-3xl relative">
      <div className="flex justify-center items-center text-center h-16  font-medium text-3xl m-3 ">
        <p className=" uppercase dark:text-black">
          {eventObj.title.slice(0, 23)}
        </p>
      </div>
      <div className="flex justify-center mb-2  ">
        <img src={eventObj.event_image} alt="" className=" max-h-52 px-4" />
      </div>
      <div className="flex w-full justify-center m-2">
        <div className="flex h-10 mz-2  ">
          <Image src={alarm} alt={""} className="m-2" />

          <p className=" self-center font-semibold dark:text-black">
            {dayjs(eventObj.event_timing).format("DD MMM h:mm A")}
          </p>
        </div>
        <div className="flex h-10 mx-2 ">
          <>
            {!eventObj.venue ? null : (
              <>
                <Image src={location_on} alt={""} className="m-2" />
                <p className="self-center font-semibold dark:text-black">
                  {eventObj.venue}
                </p>
              </>
            )}
          </>
        </div>
      </div>
      <div className=" mt-1 mb-4  w-5/6 self-center dark:text-black">
        <div>
          <div className="h-36  text-start"
            dangerouslySetInnerHTML={{
              __html: eventObj.description.slice(0, 146),
            }}
          />
        </div>
      </div>
        <div className=" absolute bottom-4 right-4 cursor-pointer ">

        <p 
          onClick={() => {
            onClick();
          }}
        >
          <u>Read More</u>
        </p>
        </div>
    </div>
  );
};

export default EventCard;
