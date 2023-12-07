import MembersPage from '@/Screens/Memberspage';
import { fetchMembers } from '@/lib/api';
import React from 'react';

const members = async () => {
  const data = await fetchMembers();
  const secondYearsArray = data.filter((member: any) => member.year_name === 2);
  const thirdYearsArray = data.filter((member: any) => member.year_name === 3);
  const finalYearsArray = data.filter((member: any) => member.year_name === 4);

  console.log('finalYearsArray', finalYearsArray?.length);
  return (
    <MembersPage
      secondYearsArray={secondYearsArray}
      thirdYearsArray={thirdYearsArray}
      finalYearsArray={finalYearsArray}
    />
  );
};

export default members;
