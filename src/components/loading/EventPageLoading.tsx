"use client";
import { useEffect, useState } from "react";
import Tabs from "../Tabs";
import EventCardLoading from "./EventCardLoading";

const EventPageLoading = () => {
  const [activeTab, setactiveTab] = useState("UPCOMING");

  return (
    <>
      <div className=" align-middle ">
        <div className="flex justify-center">
          <Tabs
            tabItems={["UPCOMING", "PAST"]}
            tab={activeTab}
            setTab={setactiveTab}
          />
        </div>
        <div className="flex justify-center">
          <div className="flex flex-row flex-wrap w-10/12 mt-8 md:mt-16 justify-evenly">
            {[...Array(10)].map((num, index) => (
              <div
                key={index}
                className="w-full my-8 rounded-xl bg-yellowPrimary dark:bg-secondaryDark dark:text-onSecondaryDark md:w-96"
              >
                <EventCardLoading />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventPageLoading;
