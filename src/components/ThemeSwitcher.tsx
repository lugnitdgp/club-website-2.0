'use client';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { MdOutlineLightMode } from 'react-icons/md';
import { MdOutlineDarkMode } from 'react-icons/md';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  const handleChange = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
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
        className="text-2xl text-black transition-all duration-100 rounded-lg md:absolute dark:text-gray-800 bottom-4 dark:hidden"
        data-hide-on-theme="light"
      >
        <MdOutlineDarkMode />
      </button>
      <button
        onClick={handleChange}
        className="hidden text-2xl text-white transition-all duration-100 rounded-lg md:absolute bottom-4 dark:block"
      >
        <MdOutlineLightMode />
      </button>
    </>
  );
};

export default ThemeSwitcher;
