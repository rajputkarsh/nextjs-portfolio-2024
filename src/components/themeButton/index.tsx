"use client";

import useCurrentTheme from '@/hooks/useCurrentTheme'
import React, { useEffect } from 'react'

function ThemeButton() {
  const { theme, setTheme } = useCurrentTheme();

  useEffect(() => {
    setTheme('dark');
  }, [])

  return (
    <button className='fixed z-50 bottom-8 right-8'>Change Theme</button>
  )
}

export default ThemeButton