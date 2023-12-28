import MembersPage from "@/Screens/Memberspage";
import { fetchMembers } from "@/lib/api";
import addBlurDataUrl from "@/utils/getBase64";
import React from "react";

const members = async () => {
  let data = await fetchMembers();
  data = await addBlurDataUrl(data, "image");
  const secondYearsArray = data.filter((member: any) => member.year_name === 2);
  const thirdYearsArray = data.filter((member: any) => member.year_name === 3);
  const finalYearsArray = data.filter((member: any) => member.year_name === 4);

  return (
    <MembersPage
      secondYearsArray={secondYearsArray}
      thirdYearsArray={thirdYearsArray}
      finalYearsArray={finalYearsArray}
    />
  );
};

export default members;
