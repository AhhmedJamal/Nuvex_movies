import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SettingsPage() {
  const router = useNavigate();
  const [mode, setMode] = useState(Boolean);
  const handleLogOut = () => {
    signOut(auth);
    router("/auth", { replace: true });
  };
  const handleSwitch = () => {
    setMode((pre) => !pre);
    if (mode) {
      document.body.style.backgroundColor = "whiteSmoke";
      document.body.style.color = " black";
    } else {
      document.body.style.backgroundColor = " #00000097";
      document.body.style.color = "white";
    }
  };
  return (
    <section className="flex flex-col justify-between items-center h-[90%] gap-4 pt-[40px]">
      <h1 className="font-bold text-[23px] self-start pl-3">Settings</h1>
      <div className="flex items-center justify-between gap-4 bg-[#00000067] p-3  w-[90%] font-bold rounded-xl">
        Light{" "}
        <input
          onClick={handleSwitch}
          type="checkbox"
          className="theme-checkbox"
        />
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