'use client';
import Image from "next/image";
import { mindersnatch } from "../../../public/assets";
import Link from "next/link";
import { motion } from "framer-motion"

const LandingEvents = () => {
  return (
    <motion.div

      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: .3 }}

      className="snap-y px-12 md:px-24 mt-24 text-onBackround dark:text-onBackroundDark">
      <h2 className="font-bold text-4xl md:text-6xl">
        Latest
        <span className="text-primary dark:text-primaryDark"> Events</span>
      </h2>

      <div className="md:flex items-center justify-between mt-8">
        {" "}
        <div className="relative w-full md:w-[50%] h-max mt-4">
          <Image
            src={mindersnatch}
            alt="Event"
            className="w-full h-auto rounded-2"
          />
        </div>
        <div className="md:w-[40%]">
          <h4 className="text-xl font-bold mt-8">Minder Snatch</h4>
          <p className="text-sm leading-6 mt-4">
            Remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsu
          </p>
          <div className="flex gap-4 mt-4 justify-between flex-col md:flex-row md:justify-start">
            <button className="bg-primary text-onPrimary dark:primaryDark  px-4 py-2 rounded-md">
              Register Now
            </button>
            <button className="bg-primaryContainer text-onPrimaryContainer dark:primaryContainerDark  px-4 py-2 rounded-md">
              <Link href={"/events"}>See All Events</Link>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LandingEvents;
