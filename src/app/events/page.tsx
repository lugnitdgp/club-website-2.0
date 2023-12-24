import Eventpage from '@/Screens/Eventpage';
import { fetchEvent } from '@/lib/api';
import React from 'react';

const event = async () => {
  const data = await fetchEvent();

  const pastArray = data.filter((item: any) => !item.upcoming);
  const upComingArray = data.filter((item: any) => item.upcoming);

  return (
    <div>
      <Eventpage pastArray={pastArray} upComingArray={upComingArray} />
    </div>
  );
};

export default event;
