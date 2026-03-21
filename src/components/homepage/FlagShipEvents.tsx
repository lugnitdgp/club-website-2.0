"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionTitle from "../Title";
import { useFetchEventsQuery } from "@/store/slices/eventsSlice";
import { Modal, ModalBody, ModalContent, ModalTrigger } from "../ui/animated-modal";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

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
  if (!description) return "";
  // Strip HTML tags
  const stripped = description.replace(/<[^>]*>/g, "");
  // Decode HTML entities
  const decoded = stripped
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&[a-z]+;/gi, "");
  if (decoded.length <= maxLength) return decoded;
  return decoded.substring(0, maxLength) + "...";
};

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="py-16 flex flex-col items-center bg-gradient-to-r from-orange-200/50 to-yellow-200/30 dark:from-[#1a1206] dark:to-[#1a160a] transition-colors duration-300 w-full"
    >
      <SectionTitle
        title="Our Flagship Events"
        description="Highlighting special events each month"
      />

      <div className="w-[90%] max-w-7xl mx-auto flex flex-wrap justify-center gap-6 mt-8 [&>*]:w-full [&>*]:sm:w-[calc(50%-12px)] [&>*]:lg:w-[calc(33.333%-16px)]">
        {filteredEvents?.map((event: any) => (
          <Modal key={event.id}>
            <ModalTrigger className="w-full text-left">
              <div className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden hover:shadow-xl dark:hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full flex flex-col">

                {/* Image */}
                {event.event_image ? (
                  <div className="w-full h-48 overflow-hidden shrink-0">
                    <Image
                      src={event.event_image}
                      alt={event.title}
                      height={400}
                      width={600}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900/20 dark:to-yellow-900/20 flex items-center justify-center shrink-0">
                    <span className="text-gray-400 text-sm">No image</span>
                  </div>
                )}

                {/* Content */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <h3 className="text-base font-bold text-neutral-800 dark:text-white leading-snug line-clamp-2">
                    {event.title}
                  </h3>

                  <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                    {trimDescription(event.description, 130)}
                  </p>

                  <div className="border-t border-gray-100 dark:border-white/10 mt-auto pt-3" />

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Calendar className="w-3.5 h-3.5 shrink-0 text-orange-500" />
                      <span>{new Date(event.event_timing).toLocaleString()}</span>
                    </div>
                    {event.venue && (
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-yellow-500" />
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
              <ModalContent className="w-full flex flex-col gap-4 overflow-y-auto max-h-[80vh] p-6">
                <h2 className="text-xl font-bold text-neutral-800 dark:text-white">
                  {event.title}
                </h2>
                {event.event_image && (
                  <div className="w-full h-56 rounded-xl overflow-hidden">
                    <Image
                      src={event.event_image}
                      alt={event.title}
                      height={400}
                      width={600}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    <span>{new Date(event.event_timing).toLocaleString()}</span>
                  </div>
                  {event.venue && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="w-4 h-4 text-yellow-500" />
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
              </ModalContent>
            </ModalBody>
          </Modal>
        ))}
      </div>
    </motion.div>
  );
};

export default FlagshipEvents;