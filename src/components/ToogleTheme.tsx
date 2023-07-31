'use client';
import React from 'react';
import { useTheme } from 'next-themes';

const ToogleTheme = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <button
      onClick={() => (theme == 'dark' ? setTheme('light') : setTheme('dark'))}
      className="absolute px-8 py-2 text-2xl text-white transition-all duration-100 bg-gray-800 rounded-lg dark:bg-gray-50 hover:bg-gray-600 dark:hover:bg-gray-300 dark:text-gray-800 md:text-4xl bottom-32"
    >
      Toggle Mode
    </button>
  );
};

export default ToogleTheme;
