import TimeLinePage from "@/Screens/TimeLinePage";
import { fetchTimeline } from "@/lib/api";

const TimeLine = async () => {
  const data = await fetchTimeline();
  return <TimeLinePage timelineData={data} />;
};

export default TimeLine;
