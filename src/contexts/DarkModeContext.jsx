/*eslint react/prop-types:0 */

import { createContext, useState } from "react";

export const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const savedIsDarkMode =
    JSON.parse(localStorage.getItem("isDarkMode")) || false;
  if (savedIsDarkMode) {
    document.documentElement.classList.add("dark-mode");
    document.documentElement.classList.remove("light-mode");
  }

  const [isDarkMode, setIsDarkMode] = useState(savedIsDarkMode);

  const toggleDarkMode = () =>
    setIsDarkMode((isDarkMode) => {
      localStorage.setItem("isDarkMode", JSON.stringify(!isDarkMode));

      if (!isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }

      return !isDarkMode;
    });

  return (
    <DarkModeContext.Provider value={{ toggleDarkMode, isDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
