'use client';
import React from 'react';
import Image from 'next/image';
import { alarm, location_on } from '../../public/assets';
import dayjs from 'dayjs';

const EventCard = ({ eventObj, onClick }: any) => {
  return (
    <div className="relative flex flex-col h-full pt-4 pb-8 rounded-3xl">
      <div className="flex items-center justify-center h-10 px-2 m-3 text-xl font-medium text-center md:h-16 md:text-3xl ">
        <p className="uppercase truncate dark:text-black">
          {eventObj.title.slice(0, 23)}
        </p>
      </div>
      <div className="flex justify-center mb-2 ">
        <Image
          src={eventObj.event_image}
          alt="Event Image"
          height={1080}
          width={1920}
          // quality={100}
          className="w-auto px-4 max-h-64 "
        />
      </div>
      <div className="flex flex-col justify-center w-full m-2 md:flex-row">
        <div className="flex mx-2 md:h-10 ">
          <Image src={alarm} alt={''} className="m-2" />

          <p className="self-center font-semibold dark:text-black">
            {dayjs(eventObj.event_timing).format('DD MMM h:mm A')}
          </p>
        </div>
        <div className="flex mx-2 md:h-10 ">
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
      <div className="self-center w-5/6 mt-1 mb-4 dark:text-black">
        <div
          className="[&>*]:truncate h-24 text-start flex flex-col [&>*]:grow w-full"
          dangerouslySetInnerHTML={{
            __html: eventObj.description.slice(0, 146),
          }}
        />
      </div>
      <div className="absolute cursor-pointer bottom-4 right-4">
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
