import { File } from "lucide-react";
import React from "react";

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
        <img src="https://api.nitdgplug.org/media/card_images/IMG_20180930_230242.jpg" alt="Random Image" className="absolute inset-0 w-full h-full object-cover" />
      </div>
    ),
  },
  {
    title: "What We Do",
    description:
      "We provide budding enthusiasts like ourselves a forum to contribute and learn about FOSS. Through varied workshops on revolutionary Open Technologies throughout the year, we spread the idea of Open Source to beginners and veterans alike. We bring people together to ideate and contribute to the leading Open technologies. We provide help and resources to everyone who wants to make the web world a better place.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <img src="https://api.nitdgplug.org/media/card_images/a_3fJa3B7.jpeg" alt="Random Image" className="absolute inset-0 w-full h-full object-cover" />
      </div>
    ),
  },
  {
    title: "Our Vision",
    description:
      "Being a bunch of FOSS enthusiasts, we preach the idea of “free things are the best things” and firmly believe in sharing knowledge. We strive to elevate the tech culture in our college and believe that this can only be done through giving people digital resources and knowledge in all realms from hardware to software and data to design. We promote FOSS through various endeavours because we believe in the freedom of expression for everyone.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        <img src="https://via.placeholder.com/150" alt="Random Image" className="absolute inset-0 w-full h-full object-cover" />
      </div>
    ),
  },
];


export const features = [
  {
    Icon: File,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2",
  },
  {
    Icon: File,
    name: "Full text search",
    description: "Search through all your files in one place.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2",
  },
  {
    Icon: File,
    name: "Multilingual",
    description: "Supports 100+ languages and counting.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "md:col-start-3 md:col-end-4 md:row-start-1 md:row-end-2",
  },
  {
    Icon: File,
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "md:col-start-1 md:col-end-3 md:row-start-2 md:row-end-3",
  },
  {
    Icon: File,
    name: "Notifications",
    description:
      "Get notified when someone shares a file or mentions you in a comment.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "md:col-start-3 md:col-end-4 md:row-start-2 md:row-end-3",
  },
];

export const techStack = [
  { name: "React", color: "bg-blue-500", x: "30%", y: "10%" },
  { name: "TypeScript", color: "bg-blue-700", x: "30%", y: "30%" },
  { name: "Tailwind CSS", color: "bg-teal-500", x: "75%", y: "10%" },
  { name: "Next.js", color: "bg-gray-800", x: "80%", y: "20%" },
  { name: "Node.js", color: "bg-green-500", x: "50%", y: "10%" },
  { name: "GraphQL", color: "bg-pink-500", x: "40%", y: "20%", angle: 10 },
  { name: "Docker", color: "bg-blue-600", x: "30%", y: "10%" },
  { name: "Kubernetes", color: "bg-blue-400", x: "30%", y: "30%" },
  { name: "Firebase", color: "bg-yellow-500", x: "75%", y: "10%" },
  { name: "GitHub", color: "bg-gray-900", x: "80%", y: "20%" },
];

export const socialLinks = [
  {
    name: "Facebook",
    icon: "Facebook", // Lucide icon name
    url: "https://www.facebook.com/nitdgplug"
  },
  {
    name: "Gitter",
    icon: "MessageCircle", // No direct Gitter icon, using MessageCircle as an alternative
    url: "https://gitter.im/lugnitdgp"
  },
  {
    name: "YouTube",
    icon: "Youtube",
    url: "https://www.youtube.com/channel/UCYZPnN5vP5B1sINLLkI1aDA"
  },
  {
    name: "GitHub",
    icon: "Github",
    url: "https://github.com/lugnitdgp"
  },
  {
    name: "Instagram",
    icon: "Instagram",
    url: "https://www.instagram.com/nitdgplug"
  },
  {
    name: "Email",
    icon: "Mail",
    url: "mailto:contact@nitdgplug.org"
  },
  {
    name: "LinkedIn",
    icon: "Linkedin",
    url: "https://in.linkedin.com/company/lugnitdgp"
  },
  {
    name: "Dev.to",
    icon: "Code", // No direct Dev.to icon, using Code as an alternative
    url: "https://dev.to/nitdgplug"
  }
];