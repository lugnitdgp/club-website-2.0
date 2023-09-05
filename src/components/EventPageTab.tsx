"use client"

import React, { useEffect, useState } from "react";


const EventPageTab = ({displayText, activeTab,setactiveTab}:any) => {
  const [active,setActive]=useState(()=>(activeTab===displayText?true:false))
useEffect(()=>{

    activeTab===displayText?setActive(true):setActive(false)

},[activeTab])
  return (
    <>
      {active? 
        <div className="w-full cursor-pointer text-primary p-2 border-b-2 border-primary " onClick={()=>{
            setactiveTab(displayText)
        }}>
          <p>{displayText}</p>
        </div>
       : 
        <div className="w-full cursor-pointer text-primary p-2  "  onClick={()=>{
            setactiveTab(displayText)
        }}>
          <p>{displayText}</p>
        </div>
      }
    </>
  );
};
export default EventPageTab;
