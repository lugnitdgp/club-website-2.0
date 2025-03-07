import React from "react";
import { CiBellOn } from "react-icons/ci";
import { MdCalendarMonth, MdFileCopy } from "react-icons/md";
import { RxGlobe, RxInput } from "react-icons/rx";

interface ContentItem {
  title: string;
  description: string;
  content: JSX.Element;
}

export const content: ContentItem[] = [
  {
    title: "Who We Are",
    description:
      "The GNU/Linux User’s Group, NIT Durgapur is a community of GNU/Linux Users that promote the use of Free and Open Source Software. The Group was established in 2003 by a bunch of FOSS enthusiasts with the idea of popularising and contributing to Open Source. We are a plethora of designers, contributors and developers that believe in learning and sharing through opening up your mind to Open Source.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Who We Are
      </div>
    ),
  },
  {
    title: "What We Do",
    description:
      "We provide budding enthusiasts like ourselves a forum to contribute and learn about FOSS. Through varied workshops on revolutionary Open Technologies throughout the year, we spread the idea of Open Source to beginners and veterans alike. We bring people together to ideate and contribute to the leading Open technologies. We provide help and resources to everyone who wants to make the web world a better place.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        What We Do
      </div>
    ),
  },
  {
    title: "Our Vision",
    description:
      "Being a bunch of FOSS enthusiasts, we preach the idea of “free things are the best things” and firmly believe in sharing knowledge. We strive to elevate the tech culture in our college and believe that this can only be done through giving people digital resources and knowledge in all realms from hardware to software and data to design. We promote FOSS through various endeavours because we believe in the freedom of expression for everyone.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        Our Vision
      </div>
    ),
  },
];


export const features = [
  {
    Icon: MdFileCopy,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: RxInput,
    name: "Full text search",
    description: "Search through all your files in one place.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: RxGlobe,
    name: "Multilingual",
    description: "Supports 100+ languages and counting.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: MdCalendarMonth,
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: CiBellOn,
    name: "Notifications",
    description:
      "Get notified when someone shares a file or mentions you in a comment.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];