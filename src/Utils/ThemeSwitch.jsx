"use client";

import { Moon, Sun } from "@gravity-ui/icons";
import { useTheme } from "next-themes";

export function ThemeSwitch() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const current = resolvedTheme || theme;

  const toggleTheme = () => {
    setTheme(current === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="
        relative flex items-center justify-center
        w-10 h-10 rounded-full
        bg-background text-foreground
        border border-default-200
        transition-all duration-300
        hover:scale-105 hover:shadow-md
      "
    >
      {/* Sun */}
      <Sun
        className={`
          absolute h-5 w-5 transition-all duration-300
          ${current === "dark" ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}
        `}
      />

      {/* Moon */}
      <Moon
        className={`
          absolute h-5 w-5 transition-all duration-300
          ${current === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}
        `}
      />
    </button>
  );
}
