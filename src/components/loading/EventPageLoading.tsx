"use client";
import { useEffect, useState } from "react";
import Tabs from "../Tabs";
import EventCardLoading from "./EventCardLoading";
import PenguineLottie from "@/lottie/penguineLottie";

const EventPageLoading = () => {
  const [activeTab, setactiveTab] = useState("UPCOMING");

  return (
    <>
      <div className=" align-middle ">
        <div className="flex justify-center ">
          <PenguineLottie />
        </div>
      </div>
    </>
  );
};

export default EventPageLoading;
