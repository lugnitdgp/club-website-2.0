"use client";
import React, { Suspense, useEffect, useState } from "react";
import MemberCard from "@/components/MemberCard";
import Tabs from "@/components/Tabs";
import MemberCardLoading from "@/components/loading/MemberCardLoading";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { Members } from "@/lib/sampledata";

const TabContent = ({ alumniArray }: { alumniArray: any[] }) => {
  //console.log("Rendering TabContent: ", alumniArray);
  return (
    <div className="flex flex-wrap justify-center w-full pb-12 mb-12">
      {alumniArray?.map((alumniObj, index) => (
        <motion.div
          key={index}
          className="w-[295px] h-[253px] m-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.200, ease: "easeIn", delay: (index % 3) * 0.1 }}
        >
          <MemberCard index={index} memberObj={alumniObj} />
        </motion.div>
      ))}
    </div>
  );
};

const AlumniPage = ({
  lastYearsArray,
  secondlastYearsArray,
  thirdlastYearsArray,
  fourthlastYearsArray,
  fifthlastYearsArray,
  sixthlastYearsArray,
  seventhlastYearsArray,
}: {
  lastYearsArray: any[];
  secondlastYearsArray: any[];
  thirdlastYearsArray: any[];
  fourthlastYearsArray: any[];
  fifthlastYearsArray: any[];
  sixthlastYearsArray: any[];
  seventhlastYearsArray: any[];
}) => {
  const [activeTab, setactiveTab] = useState("2024");

  return (
    <>
      <div className="align-middle">
        <div className="overflow-scroll">
        <div className="flex flex-row justify-around mx-8 my-8 md:my-12 ">
          <Tabs
            tabItems={["2024", "2023", "2022", "2021", "2020", "2019", "2018"]}
            tab={activeTab}
            setTab={setactiveTab}
          />
          </div>
        </div>
        <AnimatePresence mode="wait">
          {activeTab === "2024" ? (
            <TabContent alumniArray={lastYearsArray} key={1} />
          ) : activeTab === "2023" ? (
            <TabContent alumniArray={secondlastYearsArray} key={2} />
          ) : activeTab === "2022" ? (
            <TabContent alumniArray={thirdlastYearsArray} key={3} />
          ) : activeTab === "2021" ? (
            <TabContent alumniArray={fourthlastYearsArray} key={4} />
          ) : activeTab === "2020" ? (
            <TabContent alumniArray={fifthlastYearsArray} key={5} />
          ) : activeTab === "2019" ? (
            <TabContent alumniArray={sixthlastYearsArray} key={6} />
          ) : activeTab === "2018" ? (
            <TabContent alumniArray={seventhlastYearsArray} key={7} />
          ) : undefined}
        </AnimatePresence>
      </div>
    </>
  );
};
export default AlumniPage;
