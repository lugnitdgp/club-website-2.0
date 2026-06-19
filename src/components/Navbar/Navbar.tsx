"use client";
import Link from "next/link";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { logo } from "@/assets";
import { usePathname } from "next/navigation";
import { StaggeredMenu } from "@/components/StaggeredMenu";
import { useTheme } from "next-themes";
import GlassSurface from "@/components/GlassSurface";

const navItems = [
  { url: "/",           name: "Home"    },
  { url: "/events",     name: "Events"  },
  { url: "/timeline",   name: "Timeline"},
  { url: "/articles",   name: "Articles"},
  { url: "/projects",   name: "Projects"},
  { url: "/linit",      name: "Linit"   },
  { url: "/members",    name: "Members" },
  { url: "/faculty-advisors", name: "Fac Ad" },
];

const socialItems = [
  { label: "GitHub",    link: "https://github.com/lugnitdgp"           },
  { label: "LinkedIn",  link: "https://linkedin.com/company/lugnitdgp" },
  { label: "Instagram", link: "https://instagram.com/lugnitdgp"        },
];

export default function Navbar() {
  const pathname          = usePathname();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  
  const isDark = mounted ? resolvedTheme === "dark" : null;
  const [open, setOpen]   = useState(false);
  const menuRef           = useRef<{ toggleMenu: () => void; closeMenu: () => void } | null>(null);

  const swatchLight = ["#e9d5ff", "#a855f7"];
  const swatchDark  = ["#3b0764", "#7e22ce"];

  // Mobile menu keeps all items (including Home)
  const menuItems = navItems.map((item) => ({
    label:     item.name,
    ariaLabel: `Go to ${item.name}`,
    link:      item.url,
  }));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function handleOpen() {
    if (!menuRef.current) return;
    menuRef.current.toggleMenu();
    setOpen(true);
  }

  return (
    <>
      <div className={[
        "w-full flex justify-center pointer-events-none",
        "fixed top-4 z-[9999]",
        open ? "hidden md:flex" : "flex",
      ].join(" ")}>
        <GlassSurface
          width="100%"
          height={56}
          borderRadius={999}
          distortionScale={-160}
          redOffset={0}
          greenOffset={8}
          blueOffset={18}
          brightness={isDark === false ? 62 : 35}
          opacity={1.5}
          blur={10}
          backgroundOpacity={isDark === false ? 0.08 : 0.12}
          saturation={isDark === false ? 1.2 : 1.4}
          className="w-full md:max-w-6xl mx-auto pointer-events-auto"
          style={{
            border: isDark === false
              ? "1.5px solid rgba(0,0,0,0.08)"
              : "1.5px solid rgba(255,255,255,0.13)",
            isolation: "isolate",
          }}
        >
          <div className="w-full flex flex-row items-center justify-between gap-4 py-2 px-6 md:px-12">
            <Link href="/" className="flex-shrink-0">
              <Image src={logo} alt="logo" width={30} height={30} className="shadow-lg rounded-full" />
            </Link>

            {/* Desktop nav links (centered) */}
            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center space-x-4 z-10">
              {navItems
                .filter((item) => item.name !== "Home") // <-- Filters out "Home" on desktop
                .map((item) => (
                <Link
                  href={item.url}
                  target={item.url.includes("http") ? "_blank" : "_self"}
                  className={[
                    "uppercase text-sm font-bold tracking-wide",
                    "hover:text-purple-500 hover:underline cursor-pointer",
                    "py-2 px-3 whitespace-nowrap transition-colors",
                    isDark === false ? "text-zinc-900" : "text-white/95",
                    pathname === item.url
                      ? "text-purple-500 underline"
                      : "",
                  ].join(" ")}
                  key={item.name}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <ThemeSwitcher />

              <button
                className="md:hidden flex flex-col justify-center gap-[5px] w-[22px] h-[20px] bg-transparent border-0 cursor-pointer p-0"
                aria-label="Open menu"
                onClick={handleOpen}
              >
                <span className={`block w-full h-[2px] rounded-full ${isDark === null ? "bg-foreground" : isDark ? "bg-white" : "bg-zinc-900"}`} />
                <span className={`block w-[65%] h-[2px] rounded-full ${isDark === null ? "bg-foreground" : isDark ? "bg-white" : "bg-zinc-900"}`} />
                <span className={`block w-full h-[2px] rounded-full ${isDark === null ? "bg-foreground" : isDark ? "bg-white" : "bg-zinc-900"}`} />
              </button>
            </div>
          </div>
        </GlassSurface>
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
          accentColor="#a855f7"
          closeOnClickAway
          onMenuClose={() => setOpen(false)}
        />
      </div>
    </>
  );
}