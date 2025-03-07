import AlumniPage from "@/Screens/Alumnipage";
import EventPageLoading from "@/components/loading/EventPageLoading";
import { fetchAlumni } from "@/lib/api";
import addBlurDataUrl from "@/lib/getBase64";
import React, { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Alumni'

}

const FetchAndDisplay = async () => {
  let data = await fetchAlumni();
  // data = await addBlurDataUrl(data, "image");
  const lastYearsArray = data.filter((member: any) => member.passout_year == 2024);
  const secondlastYearsArray = data.filter((member: any) => member.passout_year === 2023);
  const thirdlastYearsArray = data.filter((member: any) => member.passout_year === 2022);
  const fourthlastYearsArray = data.filter((member: any) => member.passout_year === 2021);
  const fifthlastYearsArray = data.filter((member: any) => member.passout_year === 2020);
  const sixthlastYearsArray = data.filter((member: any) => member.passout_year === 2019);
  const seventhlastYearsArray = data.filter((member: any) => member.passout_year === 2018);
  return (
    <AlumniPage
      lastYearsArray={lastYearsArray}
      secondlastYearsArray={secondlastYearsArray}
      thirdlastYearsArray={thirdlastYearsArray}
      fourthlastYearsArray={fourthlastYearsArray}
      fifthlastYearsArray={fifthlastYearsArray}
      sixthlastYearsArray={sixthlastYearsArray}
      seventhlastYearsArray={seventhlastYearsArray}
    />
  );
};

const alumni = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="w-4/6 mt-10 text-4xl font-bold text-center md:text-7xl">
          <span className=" text-onBackground dark:text-onBackgroundDark">
            Our
          </span>
          <span className="text-primary dark:text-primaryDark "> Alumni</span>
          <div className="mt-8 text-xl font-normal text-onBackground dark:text-onBackgroundDark">
            <p className="">"If we have seen further, it is by standing on the shoulders of giants"</p>
          </div>
        </div>
      </div>
      <Suspense fallback={<EventPageLoading />}>
        <FetchAndDisplay />
      </Suspense>
    </>
  );
};

export default alumni;
