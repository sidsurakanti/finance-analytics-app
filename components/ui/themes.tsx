"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

import { Button } from "@components/ui/button";
import { ThemeIcons } from "@components/ui/icons";
import { useTheme } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export function ModeToggle({}) {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <Button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        variant="ghost"
        className="hidden md:block"
      >
        <ThemeIcons width={20} height={20} />
      </Button>
    </div>
  );
}
