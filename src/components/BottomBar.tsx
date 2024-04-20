import { Link, useLocation } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { auth } from "../config/firebase";
function BottomBar() {
  const { pathname } = useLocation();
  const user = auth.currentUser;
  return (
    <footer className="sm:hidden z-10 fixed bottom-0  w-full  h-[75px] bg-[#1c1c1cca] flex justify-around items-center [box-shadow:0px_-1px_10px_0px_rgba(22,_22,_22,_1)] border-t border-zinc-800">
      <Link to={"/"} className={pathname === "/" ? "text-primary" : ""}>
        <GoHomeFill size={30} />
      </Link>
      <Link
        to={"/search"}
        className={pathname === "/search" ? "text-primary" : ""}
      >
        <IoSearch size={30} />
      </Link>
      <Link
        to={"/myList"}
        className={pathname === "/myList" ? "text-primary" : ""}
      >
        {/* <PiDownloadSimpleBold size={30} /> */}
        <FaBookmark size={25} />
      </Link>
      <Link
        to={"/profile"}
        className={pathname === "/profile" ? "text-primary" : ""}
      >
        {user !== null ? (
          <img
            src={user.photoURL || ""}
            alt="img user"
            className="rounded-full w-[30px]"
          />
        ) : (
          <FaUserCircle size={30} />
        )}
      </Link>
    </footer>
  );
}

export default BottomBar;
