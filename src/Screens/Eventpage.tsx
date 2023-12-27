"use client";
import React, { useEffect, useState } from "react";
import EventPageTab from "@/components/EventPageTab";
import EventCard from "@/components/EventCard";
import { fetchEvent } from "@/lib/api/index";
import EventModal from "@/components/EventModal";

const Eventpage = ({
  pastArray,
  upComingArray,
}: {
  pastArray: any[];
  upComingArray: any[];
}) => {
  const [eventsArray, setEventsArr] = useState<any[]>([]);
  // const [pastArray, setPastArr] = useState<any[]>([]);
  // const [upcomingArray, setupcomingArr] = useState<any[]>([]);

  const [activeTab, setactiveTab] = useState("UPCOMING");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (eventObj: any, index: number) => {
    setSelectedEvent({ ...eventObj, index: index });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (activeTab == "UPCOMING") {
      setEventsArr(upComingArray);
    } else {
      setEventsArr(pastArray);
    }
  }, [activeTab]);

  return (
    <>
      <div className=" align-middle ">
        <div className="flex justify-center">
          <div className="w-4/6 mt-10 text-center ">
            <div className="text-4xl font-bold md:text-7xl ">
              <span className=" text-onBackground dark:text-onBackgroundDark">
                Featured
              </span>
              <span className="text-primary dark:text-primaryDark">
                {" "}
                Events
              </span>
            </div>

            <div className="mt-4 text-xl font-normal md:mt-8 text-onBackground dark:text-onBackgroundDark ">
              <p className="">Explore our events.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex flex-row justify-around w-full mt-8 md:mt-16 md:w-1/2 ">
            <EventPageTab
              activeTab={activeTab}
              displayText={"UPCOMING"}
              setactiveTab={setactiveTab}
            />

            <EventPageTab
              activeTab={activeTab}
              displayText={"PAST"}
              setactiveTab={setactiveTab}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-row flex-wrap w-10/12 mt-8 md:mt-16 justify-evenly">
            {eventsArray.map((eventObj: any, index) => (
              <>
                {!eventObj.show_bool ? null : index % 3 === 1 ? (
                  <div
                    key={eventObj.id}
                    className="w-full my-8 rounded-xl bg-yellowPrimary dark:bg-secondaryDark dark:text-onSecondaryDark md:w-96"
                  >
                    <EventCard
                      eventObj={eventObj}
                      onClick={() => {
                        openModal(eventObj, index);
                      }}
                    />
                  </div>
                ) : (
                  <div
                    key={index}
                    className="w-full my-8 rounded-xl bg-primaryContainer dark:bg-tertiaryDark dark:text-onTertiaryDark md:w-96"
                  >
                    <EventCard
                      eventObj={eventObj}
                      onClick={() => {
                        openModal(eventObj, index);
                      }}
                    />
                  </div>
                )}
              </>
            ))}
            <EventModal
              eventObj={selectedEvent}
              isOpen={isModalOpen}
              onClose={closeModal}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Eventpage;
