import TimeLinePage from "@/Screens/TimeLinePage";
import { fetchTimeline } from "@/lib/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Timeline'

}
const TimeLine = async () => {
  const data = await fetchTimeline();
  return <TimeLinePage timelineData={data} />;
};

export default TimeLine;
