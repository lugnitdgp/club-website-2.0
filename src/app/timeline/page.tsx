"use client";

import { Timeline } from "@/components/ui/timeline";
import { useFetchTimelineQuery } from "@/store/slices/timelineSlice";
import React, { useEffect } from "react";

function TimelinePage() {
  const { data, isLoading } = useFetchTimelineQuery({});

  useEffect(() => {
    if (data) {
    }
  }, [data]);

  function transformData(dataArray: any) {
    return dataArray.map((event: any) => {
      // Convert event_time to a readable date format
      const eventDate = new Date(event.event_time);
      const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
      const formattedDate = eventDate.toLocaleDateString("en-US", options);

      return {
        title: formattedDate,
        content: (
          <div>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-2xl font-medium mb-8">
              {event.event_name}
            </p>
            <div dangerouslySetInnerHTML={{ __html: event.detail }} />
          </div>
        ),
      };
    });
  }

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;
  return (
    <div className="w-full">
      <Timeline data={transformData(data)} />
    </div>
  );
}

export default TimelinePage;
