"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { alarm, location_on } from "../../public";

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
        <div className="modal-container bg-yellowPrimary w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto p-4">
          <div className="flex flex-col rounded-3xl cursor-pointer">
            <div className="text-center font-medium text-3xl m-4">
              <p className="dark:text-black">{eventObj.title}</p>
            </div>
            <div className="flex justify-center mb-3  h-52">
              <img src={eventObj.image} alt="" className="object-contain" />
            </div>
            <div className="flex w-full justify-center m-2">
              <div className="flex h-10 mz-2  ">
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
            <div className=" mt-1 mb-4 w-5/6 self-center dark:text-black">
              <p>{eventObj.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="modal-container bg-primaryContainer w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto p-4">
          <div className="flex flex-col rounded-3xl cursor-pointer">
            <div className="text-center font-medium text-3xl m-4">
              <p className="dark:text-black">{eventObj.title}</p>
            </div>
            <div className="flex justify-center mb-3  h-52">
              <img src={eventObj.image} alt="" className="object-contain" />
            </div>
            <div className="flex w-full justify-center m-2">
              <div className="flex h-10 mz-2  ">
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
            <div className=" mt-1 mb-4 w-5/6 self-center dark:text-black">
              <p>{eventObj.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventModal;
