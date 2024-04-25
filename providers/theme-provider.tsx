"use client";
import { ThemeProvider as NextThemeProvider } from "next-theme";
import { ThemeProviderProps } from "next-theme/dist/provider/index.props";

export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
}
