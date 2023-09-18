"use client";
import React, { useEffect, useState } from "react";
import EventPageTab from "@/components/EventPageTab";
import EventCard from "@/components/EventCard";
import { Events } from "../api/Events";

const Eventpage = () => {
  const [activeTab, setactiveTab] = useState("UPCOMING");

  return (
    <>
      <div className="align-middle h-screen ">
        <div className="flex flex-row  justify-center">
          <div className="text-center mt-10 w-4/6">
            <div className="font-bold  text-7xl">
              <span className=" text-onBackground dark:text-onBackgroundDark">
                Featured
              </span>
              <span className="text-primary dark:text-primaryDark"> Events</span>
            </div>

            <div className="font-normal text-xl mt-8 text-onBackground dark:text-onBackgroundDark ">
              <p className="">
                Remaining essentially unchanged. It was popularised in the 1960s
                with the release of Letraset sheets containing Lorem Ipsum
                passages, and more recently with desktop publishing software
                like Aldus PageMaker including versions of Lorem Ipsu
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-row justify-around m-8 bg-yellowPrimary ">
          <EventPageTab
            activeTab={activeTab}
            displayText={"UPCOMING"}
            setactiveTab={setactiveTab}
          />
          <EventPageTab
            activeTab={activeTab}
            displayText={"CURRENT"}
            setactiveTab={setactiveTab}
          />
          <EventPageTab
            activeTab={activeTab}
            displayText={"PAST"}
            setactiveTab={setactiveTab}
          />
        </div>
        <div className="flex flex-row justify-around ">
          {Events.map((eventObj, index) => (
            (index%3==1)?(

            <div key={index} className="rounded-lg bg-yellowPrimary w-1/4 m-8">
              <EventCard eventObj={eventObj} />
            </div>

            ):(

            <div key={index} className="rounded-lg bg-primaryContainer w-1/4 m-8">
              <EventCard eventObj={eventObj} />
            </div>
            )
          ))}
        </div>
      </div>
    </>
  );
};

export default Eventpage;
