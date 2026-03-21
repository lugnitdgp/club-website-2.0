"use client";
import Link from "next/link";
import ThemeSwitcher from "@/components/ThemeSwitcher";
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
    { url: "/projects", name: "Projects" },
    { url: "/linit", name: "Linit" },
    { url: "/members", name: "Members" },
    { url: "/faculty-advisors", name: "Fac Ad" },
    // { url: "https://mukti.nitdgplug.org/", name: "Mukti 2025" },
  ];

  const pathname = usePathname();

  useEffect(() => {
    setIsSideNavOpen(false);
  }, [pathname]);

  return (
    <div className="w-screen flex justify-center items-center relative">
      {isSideNavOpen && (
        <div className="flex flex-col fixed top-0 left-0 w-screen h-screen bg-black/70 backdrop-blur-lg z-[100]">
          <div className="flex items-center justify-between mb-5 px-4 pt-5">
            <Link href="/">
              <Image src={logo} alt="logo" width={30} height={30} />
            </Link>
            <MdClose
              className="text-white cursor-pointer"
              size={30}
              onClick={() => setIsSideNavOpen(false)}
            />
          </div>
          {icons.map((icon) => (
            <Link
              href={icon.url}
              target={icon.url.includes("http") ? "_blank" : "_self"}
              className={`uppercase text-lg text-white hover:text-purple-400 font-medium hover:underline cursor-pointer py-2 px-3 w-[90%] mx-auto ${
                pathname === icon.url && "text-purple-400 underline"
              }`}
              key={icon.name}
            >
              {icon.name}
            </Link>
          ))}
          <div className="px-3 w-[90%] mx-auto mt-4">
            <ThemeSwitcher />
          </div>
        </div>
      )}

      <div className="w-full md:max-w-6xl mx-auto flex flex-row h-max justify-between items-center gap-8 backdrop-blur-md py-2 px-12 fixed z-20 top-4 rounded-3xl border-2 border-black/5 dark:border-white/10 bg-white/70 dark:bg-black/70">
        <div className="flex flex-row items-center w-4/12 md:w-1/12">
          <Link href="/">
            <Image src={logo} alt="logo" width={30} height={30} className="shadow-lg rounded-full" />
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:space-x-2 w-10/12">
          {icons.map((icon) => (
            <Link
              href={icon.url}
              target={icon.url.includes("http") ? "_blank" : "_self"}
              className={`uppercase text-lg hover:text-purple-500 font-medium hover:underline cursor-pointer py-2 px-3 md:block hidden whitespace-nowrap dark:text-white ${
                pathname === icon.url && "text-purple-500 underline"
              }`}
              key={icon.name}
            >
              {icon.name}
            </Link>
          ))}
        </div>

        {/* Theme switcher replaces Login */}
        <div className="hidden md:flex items-center">
          <ThemeSwitcher />
        </div>

        <div className="md:hidden block" onClick={() => setIsSideNavOpen(true)}>
          <MdMenu size={30} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;