"use client";
import React from "react";

const EventCardLoading = () => {
  return (
    <div className="animate-pulse border bg-yellowPrimary dark:bg-secondaryDark border-outline shadow rounded-3xl p-4 max-w-sm w-full mx-auto">
      <div className="flex flex-col items-center w-full gap-4">
        <div className="h-96" />
        <div className="h-20" />
      </div>
    </div>
  );
};

export default EventCardLoading;
