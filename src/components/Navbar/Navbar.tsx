"use client";
import Link from "next/link";
import { ShineBorder } from "@/components/magicui/shine-border";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { logo } from "@/assets";
import { usePathname } from "next/navigation";
import { MdClose, MdMenu } from "react-icons/md";

function Navbar() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const icons = [
    { url: "/events", name: "Events" },
    { url: "/timeline", name: "Timeline" },
    { url: "/blogs", name: "Blogs" },
    { url: "/linit", name: "Linit" },
    { url: "/members", name: "Members" },
    { url: "https://mukti.nitdgplug.org/", name: "Mukti 2025" },
  ];

  const pathname = usePathname();

  useEffect(() => {
    setIsSideNavOpen(false);
  }, [pathname]);
  return (
    <div className="w-screen  flex justify-center items-center">
      {isSideNavOpen && (
        <div
          className={`flex flex-col md:flex-row md:items-center md:space-x-8  ${
            isSideNavOpen
              ? "!flex fixed  top-0 left-0 w-screen h-screen bg-black/70 backdrop-blur-lg z-[100]"
              : "md:!flex hidden"
          }`}
        >
          <div className="md:hidden !flex items-center justify-between mb-5 px-4 pt-5  ">
            <Link href="/">
              <Image src={logo} alt="logo" width={30} height={30} />
            </Link>
            <div
              onClick={() => {
                setIsSideNavOpen(false);
              }}
            >
              {" "}
              <MdClose className=" text-white" size={30} />
            </div>
          </div>
          {icons.map((icon) => (
            <Link
              href={icon.url}
              target={icon.url.includes("http") ? "_blank" : "_self"}
              className={`uppercase text-lg hover:text-purple-500 font-medium hover:underline cursor-pointer py-2 px-3 w-[90%] mx-auto  ${
                isSideNavOpen ? "text-white" : "text-black"
              } ${pathname === icon.url && "text-purple-500 underline"}`}
              key={icon.name}
            >
              {icon.name}
            </Link>
          ))}
          <Link href="https://admin.nitdgplug.org" target="_blank">
            <div className=" bg-black shadow-orange-300 text-white px-4 py-2 rounded-md w-[90%] mx-auto">
              Login
            </div>
          </Link>
        </div>
      )}
      <div className=" w-full md:max-w-5xl  mx-auto flex flex-row h-max justify-between items-center gap-8  backdrop-blur-md py-2 px-12 fixed z-20 top-4 rounded-3xl border-2 border-black/5 ">
        <div className="flex flex-row items-center w-1/12">
          <Link href="/">
            <Image src={logo} alt="logo" width={30} height={30} />
          </Link>
        </div>
        <div
          className={`flex flex-col md:flex-row md:items-center md:space-x-2  w-10/12 `}
        >
          {icons.map((icon) => (
            <Link
              href={icon.url}
              target={icon.url.includes("http") ? "_blank" : "_self"}
              className={`uppercase text-lg hover:text-purple-500 font-medium hover:underline cursor-pointer py-2 px-3 md:block hidden whitespace-nowrap  ${
                pathname === icon.url && "text-purple-500 underline"
              }`}
              key={icon.name}
            >
              {icon.name}
            </Link>
          ))}
        </div>
        <Link
          href="https://admin.nitdgplug.org"
          target="_blank"
          className=" hidden md:block"
        >
          <div className=" bg-black shadow-orange-300 text-white px-4 py-2 rounded-md">
            Login
          </div>
        </Link>
        <div
          className="md:hidden block"
          onClick={() => {
            setIsSideNavOpen(true);
          }}
        >
          {" "}
          <MdMenu size={30} />
        </div>

        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
      </div>
    </div>
  );
}
export default Navbar;
