import { Link, useLocation } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
function BottomBar() {
  const { pathname } = useLocation();

  return (
    <div className="sm:hidden z-10  w-full rounded-md h-[60px] bg-[#1c1c1cca] flex justify-around items-center [box-shadow:0px_-1px_10px_0px_rgba(22,_22,_22,_1)] border-t border-zinc-800">
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
        <FaUserCircle size={30} />
      </Link>
    </div>
  );
}

export default BottomBar;
