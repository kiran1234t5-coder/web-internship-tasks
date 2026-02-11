import React, { createContext, useState, useEffect, useContext, useCallback } from "react";

// 1. Context Creation
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // 2. Initialize from LocalStorage or System Preference
  const [dark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem("crypto-terminal-theme");
    if (savedTheme !== null) return savedTheme === "dark";
    
    // Agar local storage khali hai, toh check karo system ki settings
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // 3. Apply theme to body tag for global CSS styling
  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) {
      root.classList.add("dark-mode");
      root.classList.remove("light-mode");
    } else {
      root.classList.add("light-mode");
      root.classList.remove("dark-mode");
    }
    localStorage.setItem("crypto-terminal-theme", dark ? "dark" : "light");
  }, [dark]);

  // 4. Memoized toggle function for performance
  const toggle = useCallback(() => setDark((d) => !d), []);

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 5. Custom Hook (Pro shortcut)
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};