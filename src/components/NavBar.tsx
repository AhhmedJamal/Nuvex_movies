import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AppContext } from "../context/ThemeProvider";
import { useContext } from "react";
import Logo from "./Logo";

function NavBar() {
  const Context = useContext(AppContext);
  if (!Context) throw new Error("useTheme must be used within a ThemeProvider");
  const { userData } = Context;

  return (
    <header className="h-[60px] flex items-center justify-between px-4 pt-2 w-full z-10 [box-shadow:0_2px_8px_rgba(20,_20,_20,_0.1)] dark:[box-shadow:0_2px_8px_rgba(90,_90,_90,_0.1)]">
      <div className="flex justify-center items-center gap-2 ">
        {userData.photoURL !== undefined ? (
          <img
            src={userData.photoURL || ""}
            alt="photo user"
            className="w-[35px] rounded-lg"
          />
        ) : (
          <FaUserCircle size={30} />
        )}
        <div className="text-[10px] font-bold">
          <div>Hi, {userData ? userData.displayName || "Guest" : "Guest"}</div>
          {/* Handle null or empty displayName */}
          <div>Welcome Back</div>
        </div>
      </div>

      <nav className="hidden sm:flex justify-between w-[30%] font-bold font-mono  text-[13px] ">
        <Link to="/search">Search</Link>
        <Link to="/myList">My List</Link>
        <Link to="/settings">Settings</Link>
      </nav>
      <Link
        to="/"
        className="relative text-[28px] font-[700] text-primary overflow-hidden z-10"
      >
        <Logo fontSize="text-[27px]" heightBlur="h-[8px]" bottom="bottom-2" />
      </Link>
    </header>
  );
}

export default NavBar;
