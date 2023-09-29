"use client";
import React from "react";
import Image from "next/image";
import { email, facebook, github } from "../../public/assets";

const MemberCard = ({ memberObj, index }: any) => {
  return (
    <>
      <div className=" flex w-max mt-[90px]">
        <div className="flex justify-center ml-[76px] mt-[-80px] absolute w-[153px] h-[153px]">
          <img src={memberObj.image} alt="" className="object-contain" />
        </div>
        <div
          className={
            index % 2 === 0
              ? "text-center bg-yellowPrimary font-medium text-3xl w-[295px] h-[253px] "
              : "text-center bg-primaryContainer font-medium text-3xl w-[295px] h-[253px] "
          }
        >
          <p className="text-center font-medium text-3xl mt-20">
            {memberObj.name}
          </p>
          <div>
            <p className="text-center font-normal text-xl m-2">
              {memberObj.description}
            </p>
          </div>
          <div className="flex flex-row justify-center ">
            <div id="image" className="rounded-20xl m-6">
              <Image src={facebook} alt="" className="object-contain" />
            </div>
            <div id="image" className="rounded-20xl m-6">
              <Image src={email} alt="" className="object-contain" />
            </div>
            <div id="image" className="rounded-20xl m-6 my-">
              <Image src={github} alt="" className="object-contain" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MemberCard;
