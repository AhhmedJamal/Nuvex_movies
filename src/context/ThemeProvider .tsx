import { onAuthStateChanged } from "firebase/auth";
import React, { ReactNode, createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { UserData } from "../types/UserData";
import { doc, getDoc } from "firebase/firestore";

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
  user: UserData;
  getDataUser: (user: UserData) => void;
};
export const AppContext = createContext<ThemeContextType | undefined>(
  undefined
);
const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<string>("dark");
  const [user, setUser] = useState<UserData>({});

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
    document.body.classList.toggle("light");
  };

  const getDataUser = async (user: UserData) => {
    try {
      if (user) {
        const docRef = doc(db, "users", user.email || "");
        const docSnapshot = await getDoc(docRef);
        const userData = docSnapshot.data();
        if (userData) {
          setUser(userData);
        } else {
          console.log("User data is undefined");
        }
      } else {
        console.log("User is not authenticated");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getDataUser(user);
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <AppContext.Provider value={{ user, getDataUser, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export default ThemeProvider;
