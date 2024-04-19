import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const user = auth.currentUser;
  const router = useNavigate();
  const handleLogOut = () => {
    signOut(auth);
    localStorage.removeItem(`token=${user?.uid}`);
    router("/auth", { replace: true });
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <button onClick={handleLogOut} className="bg-primary">
        LogOut
      </button>
    </div>
  );
}

export default ProfilePage;
