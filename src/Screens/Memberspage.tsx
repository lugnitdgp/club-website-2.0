"use client";
import React, { useEffect, useState } from "react";
import EventPageTab from "@/components/EventPageTab";
import MemberCard from "@/components/MemberCard";
import { fetchMembers } from "@/lib/api";
// import { Members } from "@/lib/sampledata";

const MembersPage = () => {
  const [activeTab, setactiveTab] = useState("FINAL YEAR");
  const [membersArray, setMembersArray] = useState<any[]>([]);
  const [finalYearArray, setfinalYearArray] = useState<any[]>([]);
  const [thirdYearArray, setthirdYearArray] = useState<any[]>([]);
  const [secondYearArray, setsecondYearArray] = useState<any[]>([]);
  useEffect(() => {
    setfinalYearArray([]);
    setthirdYearArray([]);
    setsecondYearArray([]);
    fetchMembers()
      .then((members) => {
        members.forEach((member: any) => {
          if (member.year_name === 4) {
            finalYearArray.push(member);
          } else if (member.year_name === 3) {
            thirdYearArray.push(member);
          } else if (member.year_name === 2) {
            secondYearArray.push(member);
          }
        });
      })
      .then(() => {
        if (activeTab === "FINAL YEAR") {
          setMembersArray(finalYearArray);
        } else if (activeTab === "THIRD YEAR") {
          setMembersArray(thirdYearArray);
        } else if (activeTab === "SECOND YEAR") {
          setMembersArray(secondYearArray);
        }
      });
  }, [activeTab]);

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
        <div className=" justify-around w-full">
          {!membersArray
            ? null
            : membersArray.map((memberObj, index) => (
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
