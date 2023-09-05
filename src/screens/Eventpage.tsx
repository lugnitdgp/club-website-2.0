"use client"
import React, { useEffect, useState } from 'react'
import EventPageTab from '@/components/EventPageTab';

const Eventpage = () => {
  const [activeTab, setactiveTab] = useState("UPCOMING")  
  
  return (
    <>
    <div className="align-middle h-screen ">
      

        <div className='flex flex-row  justify-center'>
          <div className='text-center mt-10 w-4/6'>

          <div className="font-bold  text-7xl">
          <span className=' text-onBackground dark:text-onBackgroundDark'>Featured</span>
             <span  className="text-primary dark:text-primaryDark">Events</span>
          </div>
         
          <div className="font-normal text-xl mt-8 text-onBackground dark:text-onBackgroundDark ">
            <p className=''>
            Remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu
            </p>
          </div>
        <div className='mt-8 flex flex-row justify-around  bg-yellowPrimary '>
            
              
              <EventPageTab activeTab={activeTab} displayText={"UPCOMING"} setactiveTab={setactiveTab}/>
              <EventPageTab activeTab={activeTab} displayText={"CURRENT"} setactiveTab={setactiveTab}/>
              <EventPageTab activeTab={activeTab} displayText={"PAST"} setactiveTab={setactiveTab}/>


        </div>
          </div>
        </div>
    

      </div>
     
     
    
  </>
  )
}

export default Eventpage
