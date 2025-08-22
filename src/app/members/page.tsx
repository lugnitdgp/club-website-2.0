"use client";

import MembersPage from "@/Screens/Memberspage";
import EventPageLoading from "@/components/loading/EventPageLoading";
import { fetchMembers } from "@/lib/api";
import React, { useEffect, useState } from "react";

const Members = () => {
  const [loading, setLoading] = useState(true);
  const [secondYearsArray, setSecondYearsArray] = useState<any[]>([]);
  const [thirdYearsArray, setThirdYearsArray] = useState<any[]>([]);
  const [finalYearsArray, setFinalYearsArray] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let data: any[] = await fetchMembers();
      const secondYears = data.filter((member: any) => member.year_name === 2);
      const thirdYears = data.filter((member: any) => member.year_name === 3);
      const finalYears = data.filter((member: any) => member.year_name === 4);
      setSecondYearsArray(secondYears);
      setThirdYearsArray(thirdYears);
      setFinalYearsArray(finalYears);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <EventPageLoading />;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="w-4/6 mt-10 text-4xl font-bold text-center md:text-7xl">
          <span className="text-onBackground dark:text-onBackgroundDark">
            Meet The
          </span>
          <span className="text-primary dark:text-primaryDark"> Team</span>
          <div className="mt-8 text-xl font-normal text-onBackground dark:text-onBackgroundDark">
            <p className="">"None of us is as smart as all of us"</p>
          </div>
        </div>
      </div>
      <MembersPage
        secondYearsArray={secondYearsArray}
        thirdYearsArray={thirdYearsArray}
        finalYearsArray={finalYearsArray}
      />
    </>
  );
};

export default Members;

