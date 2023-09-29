"use client";
import React, { useEffect, useState } from "react";
import EventPageTab from "@/components/EventPageTab";
import MemberCard from "@/components/MemberCard";
// import { Events } from "../api/Events";
import { Members } from "../api/sampledata";

const MembersPage = () => {
  const [activeTab, setactiveTab] = useState("FINAL YEAR");

  return (
    <>
      <div className="align-middle h-screen ">
        <div className="flex flex-col  justify-center items-center">
          <div className="font-bold  text-7xl text-center mt-10 w-4/6">
            <span className=" text-onBackground dark:text-onBackgroundDark">
              Meet The
            </span>
            <span className="text-primary dark:text-primaryDark "> Team</span>
            <div className="font-normal text-xl mt-8 text-onBackground dark:text-onBackgroundDark">
              <p className="">"None of us is as smart is as all of us"</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row mx-5 my-12 justify-around  bg-yellowPrimary">
          <EventPageTab
            activeTab={activeTab}
            displayText={"FINAL YEAR"}
            setactiveTab={setactiveTab}
          />
          <EventPageTab
            activeTab={activeTab}
            displayText={"THIRD YEAR"}
            setactiveTab={setactiveTab}
          />
          <EventPageTab
            activeTab={activeTab}
            displayText={"SECOND YEAR"}
            setactiveTab={setactiveTab}
          />
        </div>
        <div className="flex flex-row justify-around w-full">
          {Members.map((memberObj, index) => (
            <div key={index} className="w-[295px] h-[253px]">
              <MemberCard index={index} memberObj={memberObj} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default MembersPage;
