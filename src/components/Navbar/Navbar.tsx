"use client";
import Link from "next/link";

import { Home, User, Briefcase, FileText } from "lucide-react";

import React from "react";
import Image from "next/image";
import { BorderBeam } from "../magicui/border-beam";
import { logo } from "@/assets";

function Navbar() {
  const icons = [
    { url: "/events", name: "Events" },
    { url: "/timeline", name: "Timeline" },
    { url: "/blogs", name: "Blog" },
    { url: "/linit", name: "Linit" },
    { url: "/members", name: "Members" },
    { url: "/alumni", name: "Alumni" },
    { url: "/join-us", name: "Join Us" },
  ];

  return (
    <div className="md:w-1/2 mx-auto flex flex-row justify-between items-center gap-8  backdrop-blur-md py-3 px-12 sticky z-50 top-4 rounded-3xl border-1 border-black/10">
      <div className="flex flex-row items-center">
        <Link href="/">
          <Image src={logo} alt="logo" width={30} height={30} />
        </Link>
      </div>
      <div className="flex flex-row items-center space-x-8">
        {icons.map((icon) => (
          <Link
            href={icon.url}
            className=" uppercase text-lg hover:text-purple-500 font-medium hover:underline cursor-pointer"
            key={icon.name}
          >
            {icon.name}
          </Link>
        ))}
      </div>
      <BorderBeam
        duration={6}
        size={400}
        className="from-transparent via-red-500 to-transparent"
      />
      <BorderBeam
        duration={6}
        delay={3}
        size={400}
        className="from-transparent via-blue-500 to-transparent"
      />
    </div>
  );
}
export default Navbar;
