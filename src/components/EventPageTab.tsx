"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const EventPageTab = ({ displayText, activeTab, setactiveTab }: any) => {
  const [active, setActive] = useState(() =>
    activeTab === displayText ? true : false
  );
  useEffect(() => {
    activeTab === displayText ? setActive(true) : setActive(false);
  }, [activeTab]);

  return (
    <>
      <div
        className="relative w-full p-4 text-sm font-semibold text-center cursor-pointer dark:text-primaryDark md:text-2xl text-primary "
        onClick={() => {
          setactiveTab(displayText);
        }}
      >
        {active ? (
          <motion.div
            className="absolute h-[2px] left-0 right-0 -bottom-1 bg-primary"
            layoutId="underline"
          />
        ) : null}
        <p>{displayText}</p>
      </div>
    </>
  );
};
export default EventPageTab;
