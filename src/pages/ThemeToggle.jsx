// src/components/ThemeToggle.jsx
import React from "react";

import { useTheme } from "./ThemeContext";
import { MoonIcon,SunIcon } from "@heroicons/react/24/solid";
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
   <div

    >
      
      {theme === "light" ? <MoonIcon size={20}  onClick={toggleTheme}/> : <SunIcon size={20}  onClick={toggleTheme}/>}
    </div>
  );
}
