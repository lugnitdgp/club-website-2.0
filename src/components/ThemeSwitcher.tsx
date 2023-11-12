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
        className="absolute text-black transition-all duration-100 rounded-lg dark:text-gray-800 md:text-2xl bottom-4 dark:hidden"
        data-hide-on-theme="light"
      >
        <MdOutlineDarkMode />
      </button>
      <button
        onClick={handleChange}
        className="absolute hidden text-white transition-all duration-100 rounded-lg md:text-2xl bottom-4 dark:block"
      >
        <MdOutlineLightMode />
      </button>
    </>
  );
};

export default ThemeSwitcher;
