"use client";

import { createContext, useContext } from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: string;
  setTheme: (theme: string) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: "light",
  setTheme: () => null,
});

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <ThemeProviderContext.Provider value={{ theme: "light", setTheme: () => null }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeProviderContext);
