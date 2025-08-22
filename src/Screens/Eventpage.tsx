"use client";
import React, { Suspense, useEffect, useState } from "react";
import EventPageTab from "@/components/EventPageTab";
import EventCard from "@/components/EventCard";
import { fetchEvent } from "@/lib/api/index";
import EventModal from "@/components/EventModal";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import Tabs from "@/components/Tabs";
import EventCardLoading from "@/components/loading/EventCardLoading";
import { motion } from "framer-motion";
import Modal from "@/components/Modal"

const TabContent = ({
  eventsArray,
  openModal,
  selectedEvent,
  isModalOpen,
  closeModal,
}: {
  eventsArray: any[];
  openModal: any;
  selectedEvent: any;
  isModalOpen: any;
  closeModal: any;
}) => {
  return (
    <div className="flex flex-row flex-wrap w-10/12 mt-8 md:mt-16 justify-evenly">
      {eventsArray.map((eventObj: any, index) => (
        <>
          {!eventObj.show_bool ? null : index % 3 === 1 ? (
            <motion.div
              key={eventObj.id}
              className="w-full my-8 rounded-xl bg-yellowPrimary dark:bg-secondaryDark dark:text-onSecondaryDark md:w-96"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeIn" }}
            >
              <EventCard
                eventObj={eventObj}
                onClick={() => {
                  openModal(eventObj, index);
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key={index}
              className="w-full my-8 rounded-xl bg-primaryContainer dark:bg-tertiaryDark dark:text-onTertiaryDark md:w-96"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeIn" }}
            >
              <EventCard
                eventObj={eventObj}
                onClick={() => {
                  openModal(eventObj, index);
                }}
              />
            </motion.div>
          )}
        </>
      ))}

      <Modal open={isModalOpen} setOpen={closeModal} eventObj={selectedEvent} />

    </div>
  );
};
const Eventpage = ({
  pastArray,
  upComingArray,
}: {
  pastArray: any[];
  upComingArray: any[];
}) => {
  // const [pastArray, setPastArr] = useState<any[]>([]);
  // const [upcomingArray, setupcomingArr] = useState<any[]>([]);
  const [open, setOpen] = useState(true);

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
          <AnimatePresence mode="wait">
            {activeTab === "UPCOMING" ? (
              <TabContent
                eventsArray={upComingArray}
                openModal={openModal}
                selectedEvent={selectedEvent}
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                key="1"
              />
            ) : (
              <TabContent
                eventsArray={pastArray}
                openModal={openModal}
                selectedEvent={selectedEvent}
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                key="2"
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Eventpage;
