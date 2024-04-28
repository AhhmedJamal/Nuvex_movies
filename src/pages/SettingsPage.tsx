import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function SettingsPage() {
  const router = useNavigate();
  const [mode, setMode] = useState<boolean>(false);

  const handleLogOut = () => {
    signOut(auth);
    router("/auth", { replace: true });
  };
  const toggleMode = () => {
    localStorage.setItem("theme", mode.toString());
    document.body.classList.toggle("dark", mode);
    setMode(!mode);
  };
  useEffect(() => {
    const storedDarkMode = localStorage.getItem("theme");
    setMode(Boolean(storedDarkMode));
    if (storedDarkMode === "true") {
      document.body.classList.add("dark");
    }
  }, []);

  return (
    <section className="flex flex-col justify-between items-center h-[90%] gap-4 pt-[40px]">
      <h1 className="font-bold text-[23px] self-start pl-3">Settings</h1>
      <div className="flex items-center justify-between gap-4 bg-[#00000067] p-3  w-[90%] font-bold rounded-xl">
        {!mode ? "Dark" : "Light"}

        <div
          onClick={toggleMode}
          className={`w-11 h-6 transition-all ${
            mode ? "bg-gray-100" : "bg-zinc-800"
          } rounded-2xl flex items-center p-1`}
        >
          <span
            className={`w-3 h-3 transition-all ${
              mode
                ? "bg-zinc-800 translate-x-[25px]"
                : "bg-gray-100 translate-x-[0px]"
            } rounded-full`}
          ></span>
        </div>
      </div>

      <button
        onClick={handleLogOut}
        className="bg-primary p-2 font-bold rounded-md w-[200px]"
      >
        LogOut
      </button>
    </section>
  );
}

export default SettingsPage;
