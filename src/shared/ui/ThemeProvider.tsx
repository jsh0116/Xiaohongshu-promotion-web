"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({
  children,
  initialTheme = "light",
}: {
  children: ReactNode;
  initialTheme?: Theme;
}) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    // Sync from localStorage if it differs from the cookie-based initial theme
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored && stored !== initialTheme) {
      setTheme(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
      document.cookie = `theme=${stored};path=/;max-age=31536000;SameSite=Lax`;
    } else {
      localStorage.setItem("theme", initialTheme);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleTheme = () => {
    const newTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    document.cookie = `theme=${newTheme};path=/;max-age=31536000;SameSite=Lax`;
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
