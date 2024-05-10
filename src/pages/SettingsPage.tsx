import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/ThemeProvider ";
import { useContext } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MdArrowForwardIos } from "react-icons/md";
import { MdNotificationsActive } from "react-icons/md";
import { IoMdHelpCircle } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

function SettingsPage() {
  const Context = useContext(AppContext);
  if (!Context) throw new Error("useTheme must be used within a ThemeProvider");
  const { userData, theme, toggleTheme } = Context;
  const router = useNavigate();

  const handleLogOut = () => {
    signOut(auth);
    router("/auth", { replace: true });
  };

  return (
    <section className="flex flex-col justify-between items-center h-[90%] gap-4 p-4">
      <div className="flex items-center self-start  mt-[5px] ">
        <IoIosArrowBack
          className="hidden sm:block mr-5 cursor-pointer"
          size={30}
          onClick={() => window.history.back()}
        />
        <h1 className="font-bold text-[23px] self-start ">Settings</h1>
      </div>
      <div className="flex flex-col items-center gap-3 justify-center">
        {userData.photoURL !== "" ? (
          <img
            src={userData.photoURL || ""}
            alt="photo user"
            className="w-[65px] rounded-lg"
          />
        ) : (
          <FaUserCircle size={60} />
        )}
        <div className="flex items-center justify-between  bg-[#00000057] px-3  font-bold rounded-md">
          {userData?.name}
        </div>
      </div>
      <div className=" w-[90%] md:w-[50%] flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4 bg-[#00000057] p-3  font-bold rounded-xl active:bg-[#3333334d]">
          {theme ? "Dark" : "Light"}

          <div
            onClick={toggleTheme}
            className={`w-11 h-6 transition-all ${
              theme ? "bg-gray-100" : "bg-zinc-800"
            } rounded-2xl flex items-center p-1`}
          >
            <span
              className={`w-3 h-3 transition-all ${
                theme
                  ? "bg-zinc-800 translate-x-[0px]"
                  : "bg-gray-100 translate-x-[25px]  "
              } rounded-full`}
            ></span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 bg-[#00000057] p-3  font-bold rounded-xl active:bg-[#3333334d]">
          <div className="flex items-center gap-3">
            <MdNotificationsActive size={20} /> Notifications
          </div>
          <MdArrowForwardIos size={20} />
        </div>
        <div className="flex items-center justify-between gap-4 bg-[#00000057] p-3  font-bold rounded-xl active:bg-[#3333334d]">
          <div className="flex items-center gap-3">
            <IoMdHelpCircle size={20} />
            Help
          </div>
          <MdArrowForwardIos size={20} />
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
