"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import SectionTitle from "../Title";
import { useFetchEventsQuery } from "@/store/slices/eventsSlice";

const FlagshipEvents = () => {
  const { data, isLoading } = useFetchEventsQuery({});
  const flagshipEventTitles = [
    "Ten Days of Code",
    "Mini-CTF",
    "Open Source Starter Pack",
  ];
  const filteredEvents = flagshipEventTitles
    .map((title) => data?.find((event: any) => event.title.includes(title)))
    .filter(Boolean);
  const trimDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="snap-y py-10 flex flex-col items-center bg-orange-200 md:h-[80vh] justify-center"
    >
      <SectionTitle
        title="Our Flagship Events"
        description="Highlighting special events each month"
      />

      <div className="flex flex-col md:flex-row gap-4">
        {filteredEvents?.map((event: any) => (
          <CardContainer
            key={event.id}
            className="inter-var hover:shadow-lg min-w-3xl"
          >
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] min-w-7xl h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                {event.title}
              </CardItem>
              <CardItem
                as="div"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                dangerouslySetInnerHTML={{
                  __html: trimDescription(event.description, 100),
                }}
                children={undefined}
              >
                {/* <Link href={""} className="text-blue-500 ml-1">
                 Read more
               </Link> */}
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <Image
                  src={event.event_image}
                  alt={event.title}
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                />
              </CardItem>
              <div className="flex flex-col mt-20">
                <CardItem translateZ={20} as="p" className="text-gray-500">
                  {new Date(event.event_timing).toLocaleString()}
                </CardItem>
                {event.venue && (
                  <CardItem translateZ={20} as="p" className="text-gray-500">
                    Venue: {event.venue}
                  </CardItem>
                )}
                {event.url && (
                  <CardItem
                    translateZ={20}
                    as={Link}
                    href={event.url}
                    className="text-blue-500"
                  >
                    More Info
                  </CardItem>
                )}
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </motion.div>
  );
};

export default FlagshipEvents;
