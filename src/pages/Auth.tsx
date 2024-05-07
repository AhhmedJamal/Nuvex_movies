import { onAuthStateChanged } from "firebase/auth";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

function Auth() {
  const [isChecked, setIsChecked] = useState(false);

  const toggleChecked = (title: string) => {
    title === "login" ? setIsChecked(false) : setIsChecked(true);
  };
  const router = useNavigate();
  useEffect(() => {
    // Check if a user is found
    onAuthStateChanged(auth, (user) => {
      if (localStorage.getItem(`token=${user?.uid}`) === user?.uid) {
        router("/");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="bg-[url('/assets/backGroundAuth.jpg')] bg-cover">
      <div className="flex h-screen  w-full items-center justify-center flex-col bg-gradient-to-t from-black via-zinc-950 to-transparent">
        <div className="flex flex-col  font-bold justify-between items-center w-[80%] sm:w-[400px] my-4">
          <Logo
            fontSize="text-[50px]"
            heightBlur="h-[14px]"
            bottom="bottom-4"
          />
          <div className=" flex flex-cols  justify-around gap-3 w-full mt-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="default-checkbox"
                className="size-6 accent-primary bg-gray-100 rounded-full"
                checked={!isChecked}
                onChange={() => toggleChecked("login")}
              />
              <label
                htmlFor="default-checkbox"
                className="ml-2 text-[18px] font-bold text-gray-100 dark:text-gray-300"
              >
                Log in
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="checked-checkbox"
                className=" size-6 accent-primary bg-gray-100  rounded-full"
                checked={isChecked}
                onChange={() => toggleChecked("create account")}
              />
              <label
                htmlFor="checked-checkbox"
                className="ml-2 text-[18px] font-bold text-gray-100 dark:text-gray-300"
              >
                Sign up
              </label>
            </div>

            {/* <button
              onClick={() => setChoose(true)}
              className={`border border-zinc-500 py-1 px-3 w-[48%] text-white ${
                choose && "bg-primary border-none text-black"
              }`}
            >
              Log in
            </button>
            <button
              onClick={() => setChoose(false)}
              className={`border border-zinc-500 py-1 px-3 w-[48%] text-white ${
                !choose ? "bg-primary border-none text-black" : ""
              }`}
            >
              Sign up
            </button> */}
          </div>
          {isChecked ? <Login /> : <SignUp setChoose={setIsChecked} />}
        </div>
      </div>
    </div>
  );
}

export default Auth;
