import { FaUserCircle } from "react-icons/fa";
import { auth } from "../config/firebase";
import { Link } from "react-router-dom";

function NavBar() {
  const user = auth.currentUser;

  return (
    <div className="h-[60px] flex items-center justify-between px-4 fixed w-full z-10 bg-[#1c1c1ce2]">
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
        className="before:content-['']  before:bg-white before: text-[25px] font-['Righteous',_sans-serif] font-semibold not-italic text-primary "
      >
        NUVEX
      </Link>
    </div>
  );
}

export default NavBar;
