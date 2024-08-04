import axios from "axios";
import dayjs from "dayjs";

export const BACKEND_URL: string = `${process.env.NEXT_PUBLIC_API_URL}`;
export const DEV_POST_URL: string = `${process.env.NEXT_PUBLIC_DEV_POST_URL}`;

export const fetchEvent = async () => {
  try {
    let response = await axios.get(`${BACKEND_URL}/events`);
    //console.log(response);
    let data = response.data;
    return data;
  } catch (error) {
    // console.log(error);
    return [];
  }
};
export const fetchMembers = async () => {
  try {
    let response = await axios.get(`${BACKEND_URL}/profiles`);
    let data = response.data;
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const fetchAlumni = async () => {
  try {
    let response = await axios.get(`${BACKEND_URL}/alumni`);
    let data = response.data;
    //console.log(data);
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

export const fetchBlogs = async () => {
  try {
    let response = await axios.get(`https://api.nitdgplug.org/blog/posts`);
    let data = response.data;
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchTimeline = async () => {
  try {
    const { data } = await axios.get(`${BACKEND_URL}/timeline_monthly`);
    const result = Object.keys(data)
      .map((key) => {
        return {
          month: key.split(" ")[0],
          year: key.split(" ")[1],
          events: data[key],
        };
      })
      .filter((event) => event.events.length > 0);
    return result;
  } catch (err) {
    console.error(err);
  }
  // try {
  //   const response = await axios.get(`${BACKEND_URL}/timeline`);
  //   const monthEventMap: any = {};
  //   response.data.forEach((element: any) => {
  //     const month = dayjs(element.event_time, "YYYY-MM-DD").format("MMM");
  //
  //     const year = dayjs(element.event_time, "YYYY-MM-DD").format("YYYY");
  //     if (!monthEventMap[year]) {
  //       monthEventMap[year] = {};
  //     }
  //     const currentMap = monthEventMap[year];
  //
  //     if (!currentMap[month]) {
  //       currentMap[month] = [];
  //     }
  //     currentMap[month].push(element.event_name);
  //   });
  //   const result: any = [];
  //   Object.keys(monthEventMap).forEach((key: any) => {
  //     Object.keys(monthEventMap[key]).forEach((month: any) => {
  //       result.push({ month: month, events: monthEventMap[key][month] });
  //     });
  //   });
  //   return result.reverse();
  // } catch (error) {
  //   console.error(error);
  // }
};
