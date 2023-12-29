import Eventpage from "@/Screens/Eventpage";
import EventPageLoading from "@/components/loading/EventPageLoading";
import { fetchEvent } from "@/lib/api";
import PenguineLottie from "@/lottie/penguineLottie";
import addBlurDataUrl from "@/utils/getBase64";
import React, { Suspense } from "react";

const FetchAndDisplay = async () => {
  let data = await fetchEvent();

  // data = await addBlurDataUrl(data, "event_image");
  const pastArray = data.filter((item: any) => !item.upcoming);
  const upComingArray = data.filter((item: any) => item.upcoming);

  return <Eventpage pastArray={pastArray} upComingArray={upComingArray} />;
};

const event = () => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="w-4/6 mt-10 text-center ">
          <div className="text-4xl font-bold md:text-7xl ">
            <span className=" text-onBackground dark:text-onBackgroundDark">
              Featured
            </span>
            <span className="text-primary dark:text-primaryDark"> Events</span>
          </div>

          <div className="mt-4 text-xl font-normal md:mt-8 text-onBackground dark:text-onBackgroundDark ">
            <p className="">Explore our events.</p>
          </div>
        </div>
      </div>
      <Suspense fallback={<EventPageLoading />}>
        <FetchAndDisplay />
      </Suspense>
    </div>
  );
};

export default event;
