"use client";
import React, { useEffect, useState } from "react";
import EventPageTab from "@/components/EventPageTab";
import EventCard from "@/components/EventCard";
import { Events } from "../lib/sampledata";
import EventModal from "@/components/EventModal";

const Eventpage = () => {
  const [activeTab, setactiveTab] = useState("UPCOMING");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (eventObj: any) => {
    setSelectedEvent(eventObj);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="align-middle h-screen ">
        <div className="flex flex-row  justify-center">
          <div className="text-center mt-10 w-4/6 ">
            <div className="font-bold  text-7xl">
              <span className=" text-onBackground dark:text-onBackgroundDark">
                Featured
              </span>
              <span className="text-primary dark:text-primaryDark">
                {" "}
                Events
              </span>
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

        <div className="flex justify-center">
          <div className="flex flex-row justify-around mt-16 w-full md:w-1/2 bg-yellowPrimary ">
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
        <div className="flex flex-row  justify-evenly mt-16 flex-wrap">
          {Events.map((eventObj, index) => (
            <>
              {eventObj.id % 3 === 2 ? (
                <div
                  key={eventObj.id}
                  className="rounded-xl bg-yellowPrimary w-full md:w-96 my-8"
                  onClick={() => {
                    openModal(eventObj);
                  }}
                >
                  <EventCard eventObj={eventObj} />
                </div>
              ) : (
                <div
                  key={index}
                  className="rounded-xl bg-primaryContainer w-full md:w-96 my-8"
                  onClick={() => {
                    openModal(eventObj);
                  }}
                >
                  <EventCard eventObj={eventObj} />
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
    </>
  );
};

export default Eventpage;
