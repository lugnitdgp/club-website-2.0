"use client";
import Link from "next/link";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { logo } from "@/assets";
import { usePathname } from "next/navigation";
import { StaggeredMenu } from "@/components/StaggeredMenu";
import { useTheme } from "next-themes";

const navItems = [
  { url: "/events",           name: "Events"    },
  { url: "/timeline",         name: "Timeline"  },
  { url: "/articles",         name: "Articles"  },
  { url: "/projects",         name: "Projects"  },
  { url: "/linit",            name: "Linit"     },
  { url: "/members",          name: "Members"   },
  { url: "/faculty-advisors", name: "Fac Ad"    },
];

const socialItems = [
  { label: "GitHub",    link: "https://github.com/lugnitdgp"           },
  { label: "LinkedIn",  link: "https://linkedin.com/company/lugnitdgp" },
  { label: "Instagram", link: "https://instagram.com/lugnitdgp"        },
];

export default function Navbar() {
  const pathname          = usePathname();
  const { resolvedTheme } = useTheme();
  const isDark            = resolvedTheme === "dark";
  const [open, setOpen]   = useState(false);
  const menuRef           = useRef<{ toggleMenu: () => void; closeMenu: () => void }>(null);

  const swatchLight = ["#e9d5ff", "#a855f7"];
  const swatchDark  = ["#3b0764", "#7e22ce"];

  const menuItems = navItems.map((item) => ({
    label:     item.name,
    ariaLabel: `Go to ${item.name}`,
    link:      item.url,
  }));

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function handleHamburger() {
    if (!menuRef.current) return;
    if (open) {
      menuRef.current.closeMenu();
      setOpen(false);
    } else {
      menuRef.current.toggleMenu();
      setOpen(true);
    }
  }

  return (
    <>
      <div className="w-full flex justify-center pointer-events-none">
        <div
          className={`
            w-full md:max-w-6xl mx-auto
            flex flex-row h-max justify-between items-center gap-4
            backdrop-blur-md py-2 px-6 md:px-12
            fixed top-4 rounded-3xl
            border-2 border-black/5 dark:border-white/10
            bg-white/70 dark:bg-black/70
            pointer-events-auto
            ${open ? "z-[40]" : "z-[9999]"}
          `}
          style={{ isolation: "isolate" }}
        >
          <Link href="/" className="flex-shrink-0">
            <Image src={logo} alt="logo" width={30} height={30} className="shadow-lg rounded-full" />
          </Link>

          <div className="hidden md:flex flex-row items-center space-x-1 flex-1">
            {navItems.map((icon) => (
              <Link
                href={icon.url}
                target={icon.url.includes("http") ? "_blank" : "_self"}
                className={`uppercase text-sm hover:text-purple-500 font-medium hover:underline cursor-pointer py-2 px-3 whitespace-nowrap dark:text-white transition-colors ${
                  pathname === icon.url ? "text-purple-500 underline" : ""
                }`}
                key={icon.name}
              >
                {icon.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <ThemeSwitcher />
            <button
              className="md:hidden flex flex-col justify-center gap-[5px] w-[22px] h-[20px] bg-transparent border-0 cursor-pointer p-0"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={handleHamburger}
            >
              <span
                className="block w-full h-[2px] rounded-full bg-foreground transition-all duration-300 origin-center"
                style={{ transform: open ? "translateY(7px) rotate(45deg)" : "none" }}
              />
              <span
                className="block w-[65%] h-[2px] rounded-full bg-foreground transition-all duration-300"
                style={{ opacity: open ? 0 : 1, transform: open ? "scaleX(0)" : "scaleX(1)" }}
              />
              <span
                className="block w-full h-[2px] rounded-full bg-foreground transition-all duration-300 origin-center"
                style={{ transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <StaggeredMenu
          ref={menuRef}
          isFixed
          position="right"
          colors={isDark ? swatchDark : swatchLight}
          items={menuItems}
          socialItems={socialItems}
          displaySocials
          displayItemNumbering
          logoUrl=""
          menuButtonColor={isDark ? "#ffffff" : "#18181b"}
          openMenuButtonColor={isDark ? "#a855f7" : "#7e22ce"}
          changeMenuColorOnOpen
          accentColor="#a855f7"
          closeOnClickAway
          onMenuClose={() => setOpen(false)}
        />
      </div>
    </>
  );
}