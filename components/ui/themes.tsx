"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

import { Button } from "@components/ui/button";
import { Switch } from "@components/ui/switch";
import { Label } from "@components/ui/label";
import { ThemeIcons } from "@components/ui/icons";

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

export function ModeSwitch({}) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-row gap-2 justify-center items-center md:hidden">
      <Label htmlFor="dark-mode">Dark mode</Label>
      <Switch
        checked={theme == "dark"}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        id="dark-mode"
      />
    </div>
  );
}
