"use client";
import React from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
function ThemesProvider({children, ...props}) {
  return (
    <NextThemesProvider {...props}>
        {children}
    </NextThemesProvider>
  )
}

export default ThemesProvider