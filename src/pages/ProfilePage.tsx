import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const router = useNavigate();
  const handleLogOut = () => {
    signOut(auth);
    router("/auth", { replace: true });
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <button
        onClick={handleLogOut}
        className="bg-primary p-2 font-bold rounded-md w-[150px]"
      >
        LogOut
      </button>
    </div>
  );
}

export default ProfilePage;
