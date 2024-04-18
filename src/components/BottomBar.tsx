import { Link, useLocation } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
function BottomBar() {
  const { pathname } = useLocation();

  return (
    <div className=" sm:hidden z-10 fixed w-full h-[60px] bg-[#1c1c1c] bottom-[-1px] flex justify-around items-center [box-shadow:0px_-1px_10px_0px_rgba(22,_22,_22,_1)] border-t border-zinc-800">
      <Link to={"/"} className={pathname === "/" ? "text-sky-500" : ""}>
        <GoHomeFill size={30} />
      </Link>
      <Link
        to={"/search"}
        className={pathname === "/search" ? "text-sky-500" : ""}
      >
        <IoSearch size={30} />
      </Link>
      <Link
        to={"/download"}
        className={pathname === "/download" ? "text-sky-500" : ""}
      >
        {/* <PiDownloadSimpleBold size={30} /> */}
        <FaBookmark size={25} />
      </Link>
      <Link
        to={"/profile"}
        className={pathname === "/profile" ? "text-sky-500" : ""}
      >
        <FaUserCircle size={30} />
      </Link>
    </div>
  );
}

export default BottomBar;
