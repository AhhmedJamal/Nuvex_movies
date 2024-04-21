import { FaUserCircle } from "react-icons/fa";
import { auth } from "../config/firebase";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { UserData } from "../types/UserProps";

function NavBar() {
  const [user, setUser] = useState<UserData | null>({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);
  return (
    <header className="h-[60px] flex items-center justify-between px-4 w-full z-10 border-b [box-shadow:0_4px_15px_#212121] border-zinc-800">
      <div className="flex justify-center items-center gap-2 ">
        {user && user.photoURL ? (
          <img
            src={user.photoURL}
            alt="photo user"
            className="w-[35px] rounded-full"
          />
        ) : (
          <FaUserCircle size={30} />
        )}

        <div className="text-[10px] font-bold">
          <div>Hi, {user ? user.displayName || "Guest" : "Guest"}</div>
          {/* Handle null or empty displayName */}
          <div>Welcome Back</div>
        </div>
      </div>
      <Link
        to="/"
        className="relative text-[27px] font-['Righteous',_sans-serif] font-semibold not-italic text-primary overflow-hidden z-10"
      >
        NUVEX
        <div className="absolute top-[24px] right-[-1px] bg-[#ffffff0c] [box-shadow:0_4px_30px_#00000005] backdrop-filter backdrop-blur-[2px] w-full h-[10px]"></div>
      </Link>
    </header>
  );
}

export default NavBar;
