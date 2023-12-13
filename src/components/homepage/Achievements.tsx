import Image from "next/image";
import {
  computer_icon,
  events_icon,
  groups_icon,
  grops_icon_dark,
  events_dark,
  computer_dark,
} from "../../../public/assets";

const Achievement = ({ icon, icon_dark, num, text, isPrimary }: any) => {
  if (isPrimary) {
    return (
      <div className="flex md:flex-col md:row-span-2 justify-between items-center bg-tertiary dark:bg-[#292322] text-onTertiary dark:text-[#EDE0DE] px-6 py-2 md:py-4 md:pb-6 rounded-md ">
        <Image
          src={icon}
          alt={"error"}
          className="dark:hidden h-24 w-24 md:h-40 md:w-40"
        />
        <Image
          src={icon_dark}
          alt={"error"}
          className="hidden dark:block h-24 w-24 md:h-40 md:w-40"
        />
        <div className="text-center">
          <p className="font-bold font-Monsterrat text-4xl md:text-8xl ">
            {num}
          </p>
          <p className="font-bold font-Monsterrat text-2xl md:text-4xl ">
            {text}
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-between items-center bg-primaryContainer  dark:bg-[#292322] dark:text-[#EDE0DE] text-onPrimaryContainer px-6 py-2  rounded-md ">
        <Image
          src={icon}
          alt={"error"}
          className="dark:hidden h-24 w-24 md:h-28 md:w-28"
        />
        <Image
          src={icon_dark}
          alt={"error"}
          className="hidden dark:block h-24 w-24 md:h-28 md:w-28"
        />
        <div className="text-center">
          <p className="font-bold font-Monsterrat text-4xl md:text-6xl ">
            {num}
          </p>
          <p className="font-bold font-Monsterrat text-2xl md:text-4xl ">
            {text}
          </p>
        </div>
      </div>
    );
  }
};

export const Achievements = () => {
  return (
    <div className="snap-start grid grid-cols-1 md:grid-cols-2 pt-16 px-4 px-24 gap-4">
      <Achievement
        icon={groups_icon}
        icon_dark={grops_icon_dark}
        num={50}
        text="Members"
        isPrimary={true}
      />
      <Achievement
        icon={events_icon}
        icon_dark={events_dark}
        num={60}
        text="Events"
        isPrimary={false}
      />
      <Achievement
        icon={computer_icon}
        icon_dark={computer_dark}
        num={17}
        text="Projects"
        isPrimary={false}
      />
    </div>
  );
};
