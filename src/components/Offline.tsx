import { MdSignalWifiStatusbarConnectedNoInternet2 } from "react-icons/md";
import { IoIosRefresh } from "react-icons/io";
function Offline() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-5">
      <MdSignalWifiStatusbarConnectedNoInternet2
        size={80}
        className="text-primary"
      />
      <p className="font-bold">Your Offline</p>
      <IoIosRefresh
        size={25}
        className="active:rotate-[360deg] transition-transform duration-500"
        onClick={() => {
          window.location.reload();
        }}
      />
    </div>
  );
}

export default Offline;
