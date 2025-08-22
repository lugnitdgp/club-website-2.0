'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { alarm, location_on } from '../../public/assets';
import { RxCross1 } from 'react-icons/rx';
import dayjs from 'dayjs';

const EventModal = ({ eventObj, isOpen, onClose }: any) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed z-50 flex items-center w-full h-full justify-center overflow-x-hidden overflow-y-auto outline-none inset-0 focus:outline-none backdrop-blur-md bg-[#1e1b1b73]"
    >
      {/* <button
        className="modal-overlay absolute   z-[100] h-8 w-8 top-2 right-2"
        onClick={onClose}
      >
        <RxCross1 color="black" />
      </button> */}
      {eventObj.index % 3 === 1 ? (
        <div className="z-50 px-2 py-4 mx-auto shadow-lg modal-container bg-yellowPrimary md:max-w-md rounded-xl">
          <div className="flex flex-col overflow-y-scroll cursor-pointer rounded-3xl">
            <div className="mt-8 text-3xl font-medium text-center md:m-4">
              <p className="uppercase dark:text-black ">{eventObj.title}</p>
            </div>
            <div className="flex justify-center mb-3 h-96">
              <Image
                src={eventObj.event_image}
                alt=""
                height={1080}
                width={1920}
                className="object-contain w-full h-auto"
              />
            </div>
            <div className="flex flex-col justify-center m-2 md:flex-row">
              <div className="flex ">
                <Image src={alarm} alt={''} className="m-2" />

                <p className="self-center font-semibold dark:text-black">
                  {dayjs(eventObj.event_timing).format('DD MMM h:mm A')}
                </p>
              </div>
              <div className="flex h-10 mx-2 ">
                <>
                  {!eventObj.venue ? null : (
                    <>
                      <Image src={location_on} alt={''} className="m-2" />
                      <p className="self-center font-semibold dark:text-black">
                        {eventObj.venue}
                      </p>
                    </>
                  )}
                </>
              </div>
            </div>
            <div className="self-center w-5/6 h-44 dark:text-black">
              <div dangerouslySetInnerHTML={{ __html: eventObj.description }} />
            </div>
          </div>
        </div>
      ) : (
        <div className="z-50 px-2 py-4 mx-auto shadow-lg modal-container bg-primaryContainer md:max-w-md rounded-xl">
          <div className="flex flex-col overflow-y-scroll cursor-pointer rounded-3xl">
            <div className="mt-8 mb-4 text-3xl font-medium text-center md:m-4">
              <p className="uppercase dark:text-black ">{eventObj.title}</p>
            </div>
            <div className="flex flex-col justify-center mb-3 h-96 md:flex-row">
              <img
                src={eventObj.event_image}
                alt=""
                className="object-contain"
              />
            </div>
            <div className="flex justify-center m-2">
              <div className="flex ">
                <Image src={alarm} alt={''} className="m-2" />

                <p className="self-center font-semibold dark:text-black">
                  {dayjs(eventObj.event_timing).format('DD MMM h:mm A')}
                </p>
              </div>
              <div className="flex h-10 mx-2 ">
                <>
                  {!eventObj.venue ? null : (
                    <>
                      <Image src={location_on} alt={''} className="m-2" />
                      <p className="self-center font-semibold dark:text-black">
                        {eventObj.venue}
                      </p>
                    </>
                  )}
                </>
              </div>
            </div>
            <div className="self-center w-5/6 h-44 dark:text-black">
              <div dangerouslySetInnerHTML={{ __html: eventObj.description }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventModal;
