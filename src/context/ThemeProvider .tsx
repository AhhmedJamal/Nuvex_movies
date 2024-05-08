import { onAuthStateChanged } from "firebase/auth";
import React, { ReactNode, createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { UserData } from "../types/UserData";
import { doc, getDoc } from "firebase/firestore";

type ThemeContextType = {
  theme: boolean;
  toggleTheme: () => void;
  userData: UserData;
  getDataUser: () => void;
};
export const AppContext = createContext<ThemeContextType | undefined>(
  undefined
);
const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>({});

  const toggleTheme = () => {
    setTheme((prevTheme) => !prevTheme);
    localStorage.setItem(
      "theme",
      theme ? `light-${userData.id}` : `dark-${userData.id}`
    );

    document.documentElement.classList.toggle("dark");
  };

  const getDataUser = () => {
    onAuthStateChanged(auth, async (user) => {
      const theme = localStorage.getItem("theme");
      if (theme === `dark-${user?.uid}`) {
        setTheme(true);
        document.documentElement.classList.add("dark");
      } else {
        setTheme(false);
        document.documentElement.classList.remove("dark");
      }
      try {
        if (user) {
          const docRef = doc(db, "users", user.email || "");
          const docSnapshot = await getDoc(docRef);
          const userDataF = docSnapshot.data();
          if (userDataF) {
            setUserData(userDataF);
          } else {
            console.log("User data is undefined");
          }
        } else {
          console.log("User is not authenticated");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    });
  };

  useEffect(() => {
    getDataUser();
  }, []);
  return (
    <AppContext.Provider value={{ userData, getDataUser, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export default ThemeProvider;
