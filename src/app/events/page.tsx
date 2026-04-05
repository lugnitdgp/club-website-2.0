"use client";

import SectionTitle from "@/components/Title";
import { useFetchEventsQuery } from "@/store/slices/eventsSlice";
import React from "react";
import Link from "next/link";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import DataLoader from "@/components/loading/DataLoader";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

function EventsPage() {
  const { data, isLoading, error } = useFetchEventsQuery({});

  const trimDescription = (description: string, maxLength: number) => {
    if (!description) return "";
    const plain = description.replace(/<[^>]*>/g, "");
    if (plain.length <= maxLength) return plain;
    return plain.substring(0, maxLength) + "...";
  };

  if (isLoading) return <DataLoader text="Loading events data..." />;
  if (error)
    return <div className="h-[70vh] w-screen text-center">Error loading the events data.</div>;
  if (!data)
    return <div className="h-[70vh] w-screen text-center">No events data found.</div>;

  return (
    <div className="p-6 pt-24 min-h-screen">
      <SectionTitle title="Our Events" description="Check out our upcoming events" />

      <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {data.map((event: any) => (
          <Modal key={event.id}>
            <ModalTrigger className="w-full text-left">
              <div className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden hover:shadow-xl dark:hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer">

                {event.event_image ? (
                  <div className="relative w-full h-48 flex justify-center items-center overflow-hidden shrink-0 bg-white dark:bg-neutral-900">
                    <img
                      src={event.event_image}
                      alt={event.title}
                      className="relative z-10 h-full w-auto max-w-[80%] object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900/20 dark:to-yellow-900/20 flex items-center justify-center shrink-0">
                    <span className="text-gray-400 text-sm">No image</span>
                  </div>
                )}

                <div className="p-5 flex flex-col gap-3">
                  <h3 className="text-base font-bold text-neutral-800 dark:text-white leading-snug line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                    {trimDescription(event.description, 130)}
                  </p>
                  <div className="border-t border-gray-100 dark:border-white/10" />
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Calendar className="w-3.5 h-3.5 shrink-0 text-purple-500" />
                      <span>{new Date(event.event_timing).toLocaleString()}</span>
                    </div>
                    {event.venue && (
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-pink-500" />
                        <span className="line-clamp-1">{event.venue}</span>
                      </div>
                    )}
                    {event.url && (
                      <div className="flex items-center gap-2 text-xs text-blue-500 font-medium">
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        <Link
                          href={event.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          More Info
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </ModalTrigger>

            <ModalBody>
              <ModalContent className="!p-0 w-full flex flex-col overflow-y-auto max-h-[90vh]">
                {/* Full poster — edge to edge, no padding, no height clamp */}
                {event.event_image && (
                  <div className="relative w-full flex justify-center items-center overflow-hidden rounded-t-2xl min-h-[320px]">
                    {/* Blurred background layer */}
                    <div
                      className="absolute inset-0 scale-110"
                      style={{
                        backgroundImage: `url(${event.event_image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "blur(28px) brightness(0.55) saturate(1.8)",
                      }}
                    />
                    {/* Subtle dark vignette overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
                    {/* Actual poster */}
                    <img
                      src={event.event_image}
                      alt={event.title}
                      className="relative z-10 h-auto max-h-[420px] w-auto max-w-[75%] object-contain rounded-xl shadow-2xl my-6"
                      style={{ filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.5))" }}
                    />
                  </div>
                )}
                {/* Content below poster */}
                <div className="p-6 flex flex-col gap-4">
                  <h2 className="text-xl font-bold text-neutral-800 dark:text-white">
                    {event.title}
                  </h2>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 text-purple-500" />
                      <span>{new Date(event.event_timing).toLocaleString()}</span>
                    </div>
                    {event.venue && (
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <MapPin className="w-4 h-4 text-pink-500" />
                        <span>{event.venue}</span>
                      </div>
                    )}
                    {event.url && (
                      <div className="flex items-center gap-2 text-sm text-blue-500 font-medium">
                        <ExternalLink className="w-4 h-4" />
                        <Link href={event.url} target="_blank" rel="noopener noreferrer">
                          More Info
                        </Link>
                      </div>
                    )}
                  </div>
                  <div
                    className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed prose dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  />
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