import React, { ReactNode, createContext, useEffect, useState } from "react";

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<string>("light");
  const footer = document.querySelector("footer");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme == "light" ? "dark" : "light"));
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.body.classList.add("dark");
      footer?.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      footer?.classList.remove("dark");
    }
  };
  useEffect(() => {
    const storedDarkMode = localStorage.getItem("theme");
    setTheme(storedDarkMode || "dark");
    if (storedDarkMode === "dark") {
      document.body.classList.add("dark");
      footer?.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      footer?.classList.remove("dark");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
