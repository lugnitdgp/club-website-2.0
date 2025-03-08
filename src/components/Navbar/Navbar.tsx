"use client";
import Link from "next/link";
import { ShineBorder } from "@/components/magicui/shine-border";

import React from "react";
import Image from "next/image";
import { logo } from "@/assets";

function Navbar() {
  const icons = [
    { url: "/events", name: "Events" },
    { url: "/timeline", name: "Timeline" },
    { url: "/blogs", name: "Blog" },
    { url: "/linit", name: "Linit" },
    { url: "/members", name: "Members" },
    { url: "/alumni", name: "Alumni" },
    { url: "/mukti", name: "Mukti 2025" },
  ];

  return (
    <div className=" max-w-5xl mx-auto flex flex-row justify-between items-center gap-8  backdrop-blur-md py-3 px-12 sticky z-20 top-4 rounded-3xl border-2 border-black/5">
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
      <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
    </div>
  );
}
export default Navbar;
