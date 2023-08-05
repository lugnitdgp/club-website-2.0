"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  const handleChange = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <>
      <button
        onClick={handleChange}
        className="absolute px-8 py-2 text-2xl text-white transition-all duration-100 bg-gray-800 rounded-lg dark:bg-gray-50 hover:bg-gray-600 dark:hover:bg-gray-300 dark:text-gray-800 md:text-4xl bottom-32 dark:hidden"
        data-hide-on-theme="light"
      >
        <MdDarkMode />
      </button>
      <button
        onClick={handleChange}
        className="absolute px-8 py-2 text-2xl text-white transition-all duration-100 bg-gray-800 rounded-lg dark:bg-gray-50 hover:bg-gray-600 dark:hover:bg-gray-300 dark:text-gray-800 md:text-4xl bottom-32 hidden dark:block"
      >
        <MdLightMode />
      </button>
    </>
  );
};

export default ThemeSwitcher;
