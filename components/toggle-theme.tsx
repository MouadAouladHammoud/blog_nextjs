"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import useTheme from "next-theme";

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  const toogleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="ghost"
      className="flex justify-center"
      size="icon"
      onClick={toogleTheme}
    >
      <Moon className="h-6 w-6 scale-100 dark:scale-0" />
      <Sun className="h-6 w-6 scale-0 dark:scale-100" />
    </Button>
  );
}
