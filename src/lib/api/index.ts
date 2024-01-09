import axios from "axios";
import dayjs from "dayjs";

export const BACKEND_URL: string = `${process.env.NEXT_PUBLIC_API_URL}`;
export const DEV_POST_URL: string=`${process.env.NEXT_PUBLIC_DEV_POST_URL}`;

export const fetchEvent = async () => {
  try {
    let response = await axios.get(`${BACKEND_URL}/events`);
    let data = response.data;
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const fetchMembers = async () => {
  try {
    let response = await axios.get(`${BACKEND_URL}/profiles`);
    let data = response.data;
    console.log(data);
    return data;

  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchDevPosts = async () => {
  try {
    let response = await axios.get(DEV_POST_URL);
    let data = response.data;
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchTimeline = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/timeline`);
    const monthEventMap: any = {};
    response.data.forEach((element: any) => {
      const month = dayjs(element.event_time, "YYYY-MM-DD").format("MMM");

      const year = dayjs(element.event_time, "YYYY-MM-DD").format("YYYY");
      if (!monthEventMap[year]) {
        monthEventMap[year] = {};
      }
      const currentMap = monthEventMap[year];

      if (!currentMap[month]) {
        currentMap[month] = [];
      }
      currentMap[month].push(element.event_name);
    });
    const result: any = [];
    Object.keys(monthEventMap).forEach((key: any) => {
      Object.keys(monthEventMap[key]).forEach((month: any) => {
        result.push({ month: month, events: monthEventMap[key][month] });
      });
    });
    return result.reverse();
  } catch (error) {
    console.error(error);
  }
};
