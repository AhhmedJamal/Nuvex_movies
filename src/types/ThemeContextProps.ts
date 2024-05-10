import { UserData } from "./UserData";

export type ThemeContextTypeProps = {
  theme: boolean;
  toggleTheme: () => void;
  userData: UserData;
  getDataUser: (user: UserData) => void;
  checkThemeMode: (id: string) => void;
};
