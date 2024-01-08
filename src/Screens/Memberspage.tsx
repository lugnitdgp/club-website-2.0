"use client";
import React, { Suspense, useEffect, useState } from "react";
import MemberCard from "@/components/MemberCard";
import Tabs from "@/components/Tabs";
import MemberCardLoading from "@/components/loading/MemberCardLoading";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
// import { Members } from "@/lib/sampledata";

const TabContent = ({ membersArray }: { membersArray: any[] }) => {
  return (
    <div className="flex flex-wrap justify-center w-full pb-12 mb-12">
      {membersArray?.map((memberObj, index) => (
        <motion.div
          key={index}
          className="w-[295px] h-[253px] m-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.200, ease: "easeIn", delay: (index % 3) * 0.1 }}
        >
          <MemberCard index={index} memberObj={memberObj} />
        </motion.div>
      ))}
    </div>
  );
};

const MembersPage = ({
  secondYearsArray,
  thirdYearsArray,
  finalYearsArray,
}: {
  secondYearsArray: any[];
  thirdYearsArray: any[];
  finalYearsArray: any[];
}) => {
  const [activeTab, setactiveTab] = useState("FINAL YEAR");

  return (
    <>
      <div className=" align-middle ">
        <div className="flex flex-row justify-around mx-5 my-8 md:my-12 ">
          <Tabs
            tabItems={["FINAL YEAR", "THIRD YEAR", "SECOND YEAR"]}
            tab={activeTab}
            setTab={setactiveTab}
          />
        </div>
        <AnimatePresence mode="wait">
          {activeTab === "FINAL YEAR" ? (
            <TabContent membersArray={finalYearsArray} key={1} />
          ) : activeTab === "THIRD YEAR" ? (
            <TabContent membersArray={thirdYearsArray} key={2} />
          ) : (
            <TabContent membersArray={secondYearsArray} key={3} />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
export default MembersPage;
