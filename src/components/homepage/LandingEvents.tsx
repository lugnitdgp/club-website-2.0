"use client";
import { useEffect, useState } from "react";
import { fetchEvent } from "@/lib/api";
import Image from "next/image";
import { mindersnatch } from "../../../public/assets";
import Link from "next/link";
import { motion } from "framer-motion";

const LandingEvents = () => {
  const [events, setEvents] = useState<any>([]);
  useEffect(() => {
    const fetchEvents = async () => {
      const data = await fetchEvent();
      const upcoming = data.filter((item: any) => item.upcoming);
      setEvents(upcoming[0]);
    };
    fetchEvents();
  }, [JSON.stringify(events)]);
  console.log(events);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="snap-y px-12 md:px-24 mt-24 text-onBackround dark:text-onBackroundDark"
    >
      <h2 className="font-bold text-4xl md:text-6xl">
        Latest
        <span className="text-primary dark:text-primaryDark"> Events</span>
      </h2>

      <div className="md:flex items-center justify-between mt-8">
        {" "}
        <div className="relative w-full md:w-[50%] h-[25rem] mt-4">
          <Image
            src={events.event_image ? events.event_image : mindersnatch}
            alt="Event"
            fill
            className="w-full h-auto rounded-2 object-contain"
          />
        </div>
        <div className="md:w-[40%]">
          <h4 className="text-xl font-bold mt-8">{events?.title}</h4>
          <p
            className="text-sm leading-6 mt-4"
            dangerouslySetInnerHTML={{
              __html: events?.description?.slice(0, 210),
            }}
          ></p>
          <div className="flex gap-4 mt-4 justify-between flex-col md:flex-row md:justify-start">
            <button className="bg-primary text-onPrimary dark:primaryDark  px-4 py-2 rounded-md">
              <Link href={"/events"}>See All Events</Link>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LandingEvents;
