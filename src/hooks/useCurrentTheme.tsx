'use client';

import { useTheme } from "next-themes";
import { useEffect } from "react";

const useCurrentTheme = () => {
  let { theme, systemTheme, setTheme } = useTheme();
  if (theme === "system") theme = systemTheme;

  useEffect(() => {
    if (!theme) {
      theme = localStorage?.getItem('theme') || 'light';
    }
  }, []);

  return { theme: theme as string, setTheme };
};

export default useCurrentTheme;
