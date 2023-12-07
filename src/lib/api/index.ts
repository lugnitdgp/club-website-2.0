import axios from 'axios';

export const BACKEND_URL: string = `${process.env.NEXT_PUBLIC_API_URL}`;

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
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
