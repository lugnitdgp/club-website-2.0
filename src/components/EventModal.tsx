"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { alarm, location_on } from "../../public/assets";

const EventModal = ({ eventObj, isOpen, onClose }: any) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div
        className="modal-overlay absolute inset-0 bg-[#201A19] opacity-[0.45]"
        onClick={onClose}
      ></div>
      {eventObj.id % 3 === 2 ? (
        <div className="modal-container  bg-yellowPrimary  md:max-w-md mx-auto rounded-xl shadow-lg z-50  py-4 px-2">
          <div className="flex flex-col rounded-3xl cursor-pointer  overflow-y-scroll">
            <div className="text-center  font-medium text-3xl m-4">
              <p className="uppercase dark:text-black ">{eventObj.title}</p>
            </div>
            <div className="flex  justify-center mb-3  h-96">
              <img src={eventObj.image} alt="" className="object-contain" />
            </div>
            <div className="flex  justify-center m-2">
              <div className="flex   ">
                <Image src={alarm} alt={""} className="m-2" />

                <p className=" self-center font-semibold dark:text-black">
                  {eventObj.time}
                </p>
              </div>
              <div className="flex h-10 mx-2 ">
                <Image src={location_on} alt={""} className="m-2" />
                <p className="self-center font-semibold dark:text-black">
                  {eventObj.location}
                </p>
              </div>
            </div>
            <div className=" h-44 w-5/6 self-center dark:text-black">
              <p>{eventObj.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="modal-container  bg-primaryContainer  md:max-w-md mx-auto rounded-xl shadow-lg z-50  py-4 px-2">
          <div className="flex flex-col rounded-3xl cursor-pointer  overflow-y-scroll">
            <div className="text-center  font-medium text-3xl m-4">
              <p className="uppercase dark:text-black ">{eventObj.title}</p>
            </div>
            <div className="flex  justify-center mb-3  h-96">
              <img src={eventObj.image} alt="" className="object-contain" />
            </div>
            <div className="flex  justify-center m-2">
              <div className="flex   ">
                <Image src={alarm} alt={""} className="m-2" />

                <p className=" self-center font-semibold dark:text-black">
                  {eventObj.time}
                </p>
              </div>
              <div className="flex h-10 mx-2 ">
                <Image src={location_on} alt={""} className="m-2" />
                <p className="self-center font-semibold dark:text-black">
                  {eventObj.location}
                </p>
              </div>
            </div>
            <div className=" h-44 w-5/6 self-center dark:text-black">
              <p>{eventObj.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventModal;
