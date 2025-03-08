"use client";

import SectionTitle from "@/components/Title";
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";
import { useFetchEventsQuery } from "@/store/slices/eventsSlice";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";
import Link from "next/link";

function EventsPage() {
  const { data, isLoading } = useFetchEventsQuery({});
  console.log(data);
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[20vh]">
        <TextShimmerWave
          className="[--base-color:#0D74CE] [--base-gradient-color:#5EB1EF]"
          duration={1}
          spread={1}
          zDistance={1}
          scaleDistance={1.1}
          rotateYDistance={20}
        >
          Loading Our Time Clock...
        </TextShimmerWave>
      </div>
    );
  if (!data) return <div>No data</div>;

  const trimDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
  };

  return (
    <div className="p-6">
      <SectionTitle
        title="Our Events"
        description="Check out our upcoming events"
      />
      <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
        {data.map((event: any) => (
          <CardContainer key={event.id} className="inter-var hover:shadow-lg">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                {event.title}
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                {trimDescription(event.description, 100)}
                <Link href={""} className="text-blue-500 ml-1">
                  Read more
                </Link>
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
              <div className="flex justify-between items-center mt-20">
                <CardItem
                  translateZ={20}
                  as="p"
                  className="text-gray-500"
                >
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
        ))}
      </div>
    </div>
  );
}

export default EventsPage;
