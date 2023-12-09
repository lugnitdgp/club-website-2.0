'use client';
import React from 'react';
import Image from 'next/image';
import { email, facebook, github } from '../../public/assets';

const MemberCard = ({ memberObj, index }: any) => {
  return (
    <>
      <div className=" flex w-max mt-[90px]">
        <div
          className={
            index % 2 === 0
              ? 'text-center relative bg-yellowPrimary dark:bg-[#5d3f3b] dark:text-[#ffdad5] font-medium text-3xl w-[295px] h-[253px] rounded-md px-2'
              : 'text-center relative bg-primaryContainer dark:bg-[#574419] dark:text-[#fcdfa6] font-medium text-3xl w-[295px] h-[253px] rounded-md px-2'
          }
        >
          <div className="absolute left-0 right-0 flex justify-center -top-16 ">
            <Image
              src={memberObj.image}
              alt="member Image"
              width={100}
              height={100}
              className="object-contain rounded-full w-[153px] h-[153px]"
            />
          </div>
          <p className="mt-16 text-lg text-center truncate ">
            {memberObj.first_name + ' ' + memberObj.last_name}
          </p>
          <div>
            <p className="m-2 text-sm font-normal text-center truncate h-9 text-ellipsis">
              {memberObj?.bio?.length > 0 ? memberObj.bio : 'GLUG Member'}
            </p>
          </div>
          <div className="flex flex-row justify-center h-8 ">
            <div id="image" className="justify-center m-6 rounded-20xl ">
              <a href={memberObj.facebook_link}>
                <Image
                  src={facebook}
                  alt=""
                  className="object-contain dark:invert"
                />
              </a>
            </div>
            <div id="image" className="m-6 rounded-20xl">
              <a href={memberObj.reddit_link}>
                <Image
                  src={email}
                  alt=""
                  className="object-contain dark:invert"
                />
              </a>
            </div>
            <div id="image" className="m-6 rounded-20xl my-">
              <a href={memberObj.linkedin_link}>
                <Image
                  src={github}
                  alt=""
                  className="object-contain dark:invert"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MemberCard;
