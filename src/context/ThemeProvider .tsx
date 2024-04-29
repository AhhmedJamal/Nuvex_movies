import React, { ReactNode, createContext, useEffect, useState } from "react";

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<string>("dark");
  const footer = document.querySelector("footer");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
    // Rest of the code to toggle classes based on theme
  };
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    document.body.classList.toggle("light");
    if (storedTheme !== "dark") {
      footer?.classList.add("footer");
      footer?.classList.remove("light");
    } else {
      footer?.classList.remove("footer");
      footer?.classList.add("light");
    }
    setTheme(storedTheme || "");
  }, [footer?.classList, theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
