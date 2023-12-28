import Eventpage from "@/Screens/Eventpage";
import { fetchEvent } from "@/lib/api";
import addBlurDataUrl from "@/utils/getBase64";
import React from "react";

const event = async () => {
  let data = await fetchEvent();

  data = await addBlurDataUrl(data, "event_image");
  const pastArray = data.filter((item: any) => !item.upcoming);
  const upComingArray = data.filter((item: any) => item.upcoming);

  return (
    <div>
      <Eventpage pastArray={pastArray} upComingArray={upComingArray} />
    </div>
  );
};

export default event;
