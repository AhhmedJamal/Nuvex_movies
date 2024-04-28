import { Link, useLocation } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

function BottomBar() {
  const { pathname } = useLocation();

  return (
    <footer
      className={`sm:hidden z-10 fixed bottom-3 w-full    [box-shadow:0px_-1px_10px_0px_rgba(12,_12,_12,_0.5)] `}
    >
      <div className="w-[90%] h-[60px] mb-2 rounded-2xl flex justify-around items-center m-auto bg-primary">
        <Link to={"/"} className={pathname === "/" ? "text-black" : ""}>
          <GoHomeFill size={30} />
        </Link>
        <Link
          to={"/search"}
          className={pathname === "/search" ? "text-black" : ""}
        >
          <IoSearch size={30} />
        </Link>
        <Link
          to={"/myList"}
          className={pathname === "/myList" ? "text-black" : ""}
        >
          {/* <PiDownloadSimpleBold size={30} /> */}
          <FaBookmark size={25} />
        </Link>
        <Link
          to={"/settings"}
          className={pathname === "/settings" ? "text-black" : ""}
        >
          <IoSettingsSharp size={29} />
        </Link>
      </div>
    </footer>
  );
}

export default BottomBar;
