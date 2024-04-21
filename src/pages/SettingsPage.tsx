import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

function SettingsPage() {
  const router = useNavigate();
  const handleLogOut = () => {
    signOut(auth);
    router("/auth", { replace: true });
  };
  return (
    <section className="flex flex-col justify-between items-center h-[90%] gap-4 pt-[40px]">
      <h1 className="font-bold text-[23px] self-start pl-3">Settings</h1>
      <div className="flex items-center gap-4 bg-[#00000067] p-3  w-[90%] "></div>

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
