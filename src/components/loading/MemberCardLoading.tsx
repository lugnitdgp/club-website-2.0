"use client";
import React from "react";
import Image from "next/image";
import { email, facebook, github } from "../../../public/assets";

const MemberCardLoading = () => {
  return (
    <>
      <div className=" flex w-max mt-[90px]">
        <div
          className={
            "text-center relative bg-yellowPrimary dark:bg-tertiaryDark dark:text-onSecondaryDark font-medium text-3xl w-[295px] h-[253px] rounded-md px-2"
          }
        >
          <div className="absolute left-0 right-0 flex justify-center -top-16 ">
            <div className=" w-[153px] h-[153px] relative bg-yellowPrimary  dark:tertiaryDark rounded-full ">
              <div className=" absolute inset-0 bg-[#dfc38c] rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className=" relative bg-yellowPrimary h-6 mt-28 px-4 w-4/5 mx-auto dark:tertiaryDark rounded-full ">
            <div className=" absolute inset-0 bg-[#dfc38c] rounded-md animate-pulse"></div>
          </div>
          <div className=" relative bg-yellowPrimary h-6 mt-2 px-4 w-4/5 mx-auto dark:tertiaryDark rounded-full ">
            <div className=" absolute inset-0 bg-[#dfc38c] rounded-md animate-pulse"></div>
          </div>
          <div className=" relative bg-yellowPrimary h-6 mt-2 px-4 w-4/5 mx-auto dark:tertiaryDark rounded-full ">
            <div className=" absolute inset-0 bg-[#dfc38c] rounded-md animate-pulse"></div>
          </div>
          <div className="absolute bottom-4 left-0 right-0">
            <div className="h-4"></div>
            <div>
              <p className="m-2 text-sm font-normal text-center truncate h-9 text-ellipsis"></p>
            </div>
            <div className="flex flex-row justify-center h-8 gap-6 items-center  "></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MemberCardLoading;
