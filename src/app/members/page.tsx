import MembersPage from "@/Screens/Memberspage";
import EventPageLoading from "@/components/loading/EventPageLoading";
import { fetchMembers } from "@/lib/api";
import addBlurDataUrl from "@/utils/getBase64";
import React, { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Members'

}

const FetchAndDisplay = async () => {
  let data = await fetchMembers();
  // data = await addBlurDataUrl(data, "image");
  const secondYearsArray = data.filter((member: any) => member.year_name == 2);
  const thirdYearsArray = data.filter((member: any) => member.year_name === 3);
  const finalYearsArray = data.filter((member: any) => member.year_name === 4);
  return (
    <MembersPage
      secondYearsArray={secondYearsArray}
      thirdYearsArray={thirdYearsArray}
      finalYearsArray={finalYearsArray}
    />
  );
};

const members = () => {
  return (
    <>
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
      <Suspense fallback={<EventPageLoading />}>
        <FetchAndDisplay />
      </Suspense>
    </>
  );
};

export default members;
