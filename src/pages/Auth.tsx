import { onAuthStateChanged } from "firebase/auth";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import { useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { AppContext } from "../context/ThemeProvider";

function Auth() {
  const Context = useContext(AppContext);
  if (!Context) throw new Error("useTheme must be used within a ThemeProvider");
  const { userData, checkThemeMode } = Context;
  const [isChecked, setIsChecked] = useState(false);

  const toggleChecked = (title: string) => {
    title === "signIn" ? setIsChecked(false) : setIsChecked(true);
  };
  const router = useNavigate();
  useEffect(() => {
    // Check Theme Mode
    checkThemeMode(userData?.uid || "");
    // Check if a user is found
    onAuthStateChanged(auth, (user) => {
      if (localStorage.getItem(`token=${user?.uid}`) === user?.uid) {
        router("/");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex flex-col h-screen w-full items-center justify-evenly ">
      <div className="flex flex-col  font-bold justify-between w-[80%] sm:w-[400px] my-4">
        <div className=" flex flex-col gap-11 w-full">
          <h1 className=" flex flex-col ">
            <h2 className="text-[30px] ">Welcome to</h2>
            <Logo
              fontSize="text-[30px]"
              heightBlur="h-[10px]"
              bottom="bottom-2"
            />
          </h1>
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="default-checkbox"
                className="size-5  align-middle border border-neutral-400 appearance-none outline-[none]  cursor-pointer checked:[appearance:auto] checked:accent-primary checked:border-none"
                checked={!isChecked}
                onChange={() => toggleChecked("signIn")}
              />
              <label htmlFor="default-checkbox" className="ml-2">
                Sign-In
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="checked-checkbox"
                className="size-5  align-middle border border-neutral-400 appearance-none outline-[none] cursor-pointer checked:[appearance:auto] checked:accent-primary checked:border-none"
                checked={isChecked}
                onChange={() => toggleChecked("create account")}
              />
              <label htmlFor="checked-checkbox" className="ml-2">
                Create Account
              </label>
            </div>
          </div>
        </div>
        {!isChecked ? <Login /> : <SignUp setChoose={setIsChecked} />}
      </div>
    </div>
  );
}

export default Auth;
