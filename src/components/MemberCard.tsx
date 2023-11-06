"use client";
import React from "react";
import Image from "next/image";
import { email, facebook, github } from "../../public/assets";

const MemberCard = ({ memberObj, index }: any) => {
  return (
    <>
      <div className=" flex w-max mt-[90px]">
        <div className="flex justify-center ml-20 mt-[-80px] absolute w-[153px] h-[153px]">
          <img
            src={memberObj.image}
            alt=""
            className="object-contain rounded-full w-[153px] h-[153px]"
          />
        </div>
        <div
          className={
            index % 2 === 0
              ? "text-center bg-yellowPrimary font-medium text-3xl w-[295px] h-[253px] "
              : "text-center bg-primaryContainer font-medium text-3xl w-[295px] h-[253px] "
          }
        >
          <p className="text-center font-medium h-14 text-3xl mt-24">
            {memberObj.first_name + " " + memberObj.last_name}
          </p>
          <div>
            <p className="text-center font-normal text-xl m-2">
              {memberObj.bio}
            </p>
          </div>
          <div className="flex flex-row h-8 mt-10 justify-center ">
            <div id="image" className="rounded-20xl m-6 justify-center">
              <a href={memberObj.facebook_link}>
                <Image src={facebook} alt="" className="object-contain" />
              </a>
            </div>
            <div id="image" className="rounded-20xl m-6">
              <a href={memberObj.reddit_link}>
                <Image src={email} alt="" className="object-contain" />
              </a>
            </div>
            <div id="image" className="rounded-20xl m-6 my-">
              <a href={memberObj.linkedin_link}>
                <Image src={github} alt="" className="object-contain" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MemberCard;
