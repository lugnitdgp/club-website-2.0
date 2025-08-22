"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const items = ["First years", "Pre final Years", "Last years"];
const Tabs = ({
  tabItems,
  tab,
  setTab,
}: {
  tabItems: any[];
  tab: string;
  setTab: any;
}) => {
  return (
    <ul className="flex md:text-2xl mt-4 font-semibold text-primary dark:text-primaryDark md:gap-4">
      {tabItems.map((item) => {
        return (
          <li
            onClick={() => setTab(item)}
            style={{ position: "relative", cursor: "pointer" }}
            key={item}
            className="px-2 md:px-3 lg:px-4 text-center"
          >
            <span>{item}</span>

            {tab === item ? (
              <motion.div
                className="bg-primary dark:bg-primaryDark rounded-full"
                layoutId="under"
                transition={{
                  type: "inertia",
                  layout: {
                    duration: 0.25,
                    ease: "easeOut",
                  },
                }}
                style={{
                  position: "absolute",
                  bottom: "-1",
                  left: 0,
                  right: 0,
                  height: "2px",
                }}
              />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
};

export default Tabs;
