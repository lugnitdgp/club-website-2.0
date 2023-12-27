"use client";

import React, { useEffect, useState } from "react";

const EventPageTab = ({ displayText, activeTab, setactiveTab }: any) => {
  const [active, setActive] = useState(() =>
    activeTab === displayText ? true : false
  );
  useEffect(() => {
    activeTab === displayText ? setActive(true) : setActive(false);
  }, [activeTab]);

  return (
    <>
      {active ? (
        <div
          className="w-full p-4 text-sm font-semibold text-center  cursor-pointer round-2 md:text-2xl text-primary border-primary dark:bg-primaryContainer dark:text-onPrimaryContainer"
          onClick={() => {
            setactiveTab(displayText);
          }}
        >
          <p>{displayText}</p>
        </div>
      ) : (
        <div
          className="w-full p-4 text-sm font-semibold text-center cursor-pointer dark:text-primaryDark md:text-2xl text-primary "
          onClick={() => {
            setactiveTab(displayText);
          }}
        >
          <p>{displayText}</p>
        </div>
      )}
    </>
  );
};
export default EventPageTab;
