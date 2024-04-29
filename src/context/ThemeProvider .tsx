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
    setTheme((prevTheme) => (prevTheme == "light" ? "dark" : "light"));
    localStorage.setItem("theme", theme);
    if (theme === "light") {
      document.body.classList.add("light");
      footer?.classList.add("light");
    } else {
      document.body.classList.remove("light");
      footer?.classList.remove("light");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("theme") === "light") {
      document.body.classList.add("light");
      footer?.classList.add("light");
      setTheme("dark");
    } else {
      setTheme("light");
      document.body.classList.remove("light");
      footer?.classList.remove("light");
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
