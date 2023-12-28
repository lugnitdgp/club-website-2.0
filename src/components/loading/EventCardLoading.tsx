"use client";
import React from "react";
import Image from "next/image";

const EventCardLoading = () => {
  return (
    <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex  flex-col items-center w-full gap-4">
        <div className="h-4 bg-onPrimaryContainer w-4/5 rounded-full"></div>
        <div className="h-64 bg-slate-700 w-full rounded-md"></div>
        <div className="h-2 bg-onPrimaryContainer w-2/3 rounded-full"></div>
        <div className="h-2 bg-onPrimaryContainer w-2/4 rounded-full"></div>
        <div className="h-2 bg-onPrimaryContainer w-4/5 rounded-full"></div>
      </div>
    </div>
  );
};

export default EventCardLoading;
