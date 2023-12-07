'use client';
import React, { useEffect, useState } from 'react';
import EventPageTab from '@/components/EventPageTab';
import MemberCard from '@/components/MemberCard';
import { fetchMembers } from '@/lib/api';
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
  const [activeTab, setactiveTab] = useState('FINAL YEAR');
  const [membersArray, setMembersArray] = useState<any[]>(finalYearsArray);
  // const [finalYearArray, setfinalYearArray] = useState<any[]>([]);
  // const [thirdYearArray, setthirdYearArray] = useState<any[]>([]);
  // const [secondYearArray, setsecondYearArray] = useState<any[]>([]);
  useEffect(() => {
    console.log(finalYearsArray);
    if (activeTab === 'FINAL YEAR') {
      setMembersArray(finalYearsArray);
    } else if (activeTab === 'THIRD YEAR') {
      setMembersArray(thirdYearsArray);
    } else {
      setMembersArray(secondYearsArray);
    }
  }, [activeTab]);

  return (
    <>
      <div className="h-screen align-middle ">
        <div className="flex flex-col items-center justify-center">
          <div className="w-4/6 mt-10 font-bold text-center text-7xl">
            <span className=" text-onBackground dark:text-onBackgroundDark">
              Meet The
            </span>
            <span className="text-primary dark:text-primaryDark "> Team</span>
            <div className="mt-8 text-xl font-normal text-onBackground dark:text-onBackgroundDark">
              <p className="">"None of us is as smart is as all of us"</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-around mx-5 my-12 bg-yellowPrimary">
          <EventPageTab
            activeTab={activeTab}
            displayText={'FINAL YEAR'}
            setactiveTab={setactiveTab}
          />
          <EventPageTab
            activeTab={activeTab}
            displayText={'THIRD YEAR'}
            setactiveTab={setactiveTab}
          />
          <EventPageTab
            activeTab={activeTab}
            displayText={'SECOND YEAR'}
            setactiveTab={setactiveTab}
          />
        </div>
        <div className="flex flex-wrap w-full pb-12">
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
