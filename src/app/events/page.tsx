"use client";

import SectionTitle from "@/components/Title";
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";
import { useFetchEventsQuery } from "@/store/slices/eventsSlice";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";
import Link from "next/link";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { Button } from "@/components/ui/button";
import DataLoader from "@/components/loading/DataLoader";

function EventsPage() {
  const { data, isLoading, error } = useFetchEventsQuery({});

  const trimDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
  };

  if (isLoading) return <DataLoader text="Loading events data..." />;
  if (error)
    return (
      <div className=" h-[70vh] w-screen text-center">
        Error loading the events data.
      </div>
    );
  if (!data)
    return (
      <div className=" h-[70vh] w-screen text-center">
        No events data found.
      </div>
    );

  return (
    <div className="p-6 pt-24">
      <SectionTitle
        title="Our Events"
        description="Check out our upcoming events"
      />
      <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
        {data.map((event: any) => (
          <Modal key={event.id}>
            <ModalTrigger>
              <CardContainer className="inter-var hover:shadow-lg min-w-3xl">
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] min-w-7xl h-auto rounded-xl p-6 border">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                  >
                    {event.title}
                  </CardItem>
                  <CardItem
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: trimDescription(event.description, 100),
                      }}
                    ></div>
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
                      <CardItem
                        translateZ={20}
                        as="p"
                        className="text-gray-500"
                      >
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
            </ModalTrigger>
            <ModalBody>
              <ModalContent className="w-full h-full flex flex-col justify-center items-center gap-3 overflow-y-scroll">
                <div className="text-xl font-bold text-neutral-600 dark:text-white">
                  {event.title}
                </div>
                <Image
                  src={event.event_image}
                  alt={event.title}
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                />
                <div
                  className=" h-[50vh] overflow-y-scroll"
                  dangerouslySetInnerHTML={{
                    __html: event.description,
                  }}
                ></div>
                <div className="flex flex-col mt-3">
                  <div className="text-gray-500">
                    {new Date(event.event_timing).toLocaleString()}
                  </div>
                  {event.venue && (
                    <div className="text-gray-500">Venue: {event.venue}</div>
                  )}
                  {event.url && (
                    <Link href={event.url} className="text-blue-500">
                      More Info
                    </Link>
                  )}
                </div>
              </ModalContent>
            </ModalBody>
          </Modal>
        ))}
      </div>
    </div>
  );
}

export default EventsPage;
