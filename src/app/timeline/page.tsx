"use client";

import DataLoader from "@/components/loading/DataLoader";
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";
import { Timeline } from "@/components/ui/timeline";
import { useFetchTimelineQuery } from "@/store/slices/timelineSlice";
import React from "react";

function TimelinePage() {
  const { data, isLoading } = useFetchTimelineQuery({});

  function transformData(dataArray: any) {
    if (!dataArray) return [];
    return dataArray.map((event: any) => {
      // Convert event_time to a readable date format
      const eventDate = new Date(event.event_time);
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formattedDate = eventDate.toLocaleDateString("en-US", options);

      // Auto-linkify plain text URLs in the HTML string
      const rawHtml = event.detail_markdown || "";
      const linkifiedHtml = rawHtml.replace(
        /(^|[\s>])(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g,
        '$1<a href="$2" target="_blank" rel="noopener noreferrer">$2</a>'
      );

      return {
        title: formattedDate,
        content: (
          <div>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-2xl font-medium mb-8">
              {event.event_name}
            </p>
            <div 
              className="text-neutral-700 dark:text-neutral-300 [&_a]:text-blue-600 dark:[&_a]:text-blue-400 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-blue-800 dark:hover:[&_a]:text-blue-300 [&_a]:transition-colors"
              dangerouslySetInnerHTML={{ __html: linkifiedHtml }} 
            />
          </div>
        ),
      };
    });
  }

  if (isLoading) return <DataLoader text="Loading Timeline Data..." />;
  if (!data) return <div>No data found</div>;
  return (
    <div className="w-full">
      <Timeline data={transformData(data)} />
    </div>
  );
}

export default TimelinePage;
