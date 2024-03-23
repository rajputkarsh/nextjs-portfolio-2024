"use client";

import React from 'react';
import Image from "next/image";
import useCurrentTheme from '@/hooks/useCurrentTheme';
import Moon from "@/assets/theme/moon.webp";
import Sun from "@/assets/theme/sun.webp";

function ThemeButton() {
  const { theme, setTheme } = useCurrentTheme();

  const changeTheme = () => {
    let newTheme = 'dark';
    if(theme == 'dark') {
      newTheme = 'light';
    }
    setTheme(newTheme);
  }

  return (
    <button onClick={() => changeTheme()} className="fixed z-50 bottom-8 right-8">
      <Image
        className="w-12"
        src={theme == 'dark' ? Sun.src : Moon.src}
        width={50}
        height={50}
        alt={"Change Theme"}
      />
    </button>
  );
}

export default ThemeButton