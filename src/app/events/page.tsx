"use client";

import Eventpage from "@/Screens/Eventpage";
import EventPageLoading from "@/components/loading/EventPageLoading";
import { fetchEvent } from "@/lib/api";
import React, { useEffect, useState } from "react";

const Event = () => {
  const [loading, setLoading] = useState(true);
  const [pastArray, setPastArray] = useState<any[]>([]);
  const [upComingArray, setUpComingArray] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let data: any[] = await fetchEvent();
      const past = data.filter((item: any) => !item.upcoming);
      const upcoming = data.filter((item: any) => item.upcoming);
      setPastArray(past);
      setUpComingArray(upcoming);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <EventPageLoading />;
  }

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-4/6 mt-10 text-center">
          <div className="text-4xl font-bold md:text-7xl">
            <span className="text-onBackground dark:text-onBackgroundDark">
              Featured
            </span>
            <span className="text-primary dark:text-primaryDark"> Events</span>
          </div>

          <div className="mt-4 text-xl font-normal md:mt-8 text-onBackground dark:text-onBackgroundDark">
            <p className="">Explore our events.</p>
          </div>
        </div>
      </div>
      <Eventpage pastArray={pastArray} upComingArray={upComingArray} />
    </div>
  );
};

export default Event;
