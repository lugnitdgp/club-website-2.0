"use client";
import React, { useEffect, useState } from "react";
import EventPageTab from "@/components/EventPageTab";
import MemberCard from "@/components/MemberCard";
import { fetchMembers } from "@/lib/api";
// import { Members } from "@/lib/sampledata";

const MembersPage = ({
  secondYearsArray,
  thirdYearsArray,
  finalYearsArray,
}: {
  secondYearsArray: any[];
  thirdYearsArray: any[];
  finalYearsArray: any[];
}) => {
  const [activeTab, setactiveTab] = useState("FINAL YEAR");
  const [membersArray, setMembersArray] = useState<any[]>(finalYearsArray);

  useEffect(() => {
    if (activeTab === "FINAL YEAR") {
      setMembersArray(finalYearsArray);
    } else if (activeTab === "THIRD YEAR") {
      setMembersArray(thirdYearsArray);
    } else {
      setMembersArray(secondYearsArray);
    }
  }, [activeTab]);

  return (
    <>
      <div className="h-screen align-middle ">
        <div className="flex flex-col items-center justify-center">
          <div className="w-4/6 mt-10 text-4xl font-bold text-center md:text-7xl">
            <span className=" text-onBackground dark:text-onBackgroundDark">
              Meet The
            </span>
            <span className="text-primary dark:text-primaryDark "> Team</span>
            <div className="mt-8 text-xl font-normal text-onBackground dark:text-onBackgroundDark">
              <p className="">"None of us is as smart is as all of us"</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-around mx-5 my-8 md:my-12 ">
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
        <div className="flex flex-wrap justify-center w-full pb-12">
          {!membersArray
            ? null
            : membersArray.map((memberObj, index) => (
                <div key={index} className="w-[295px] h-[253px] m-12">
                  <MemberCard index={index} memberObj={memberObj} />
                </div>
              ))}
        </div>
      </div>
    </>
  );
};
export default MembersPage;
