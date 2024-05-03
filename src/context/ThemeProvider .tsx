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

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
    document.body.classList.toggle("light");
  };
  useEffect(() => {}, []);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
