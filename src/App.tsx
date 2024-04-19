import { Outlet, useNavigate } from "react-router-dom";
import BottomBar from "./components/BottomBar";
import { useEffect } from "react";
import { auth } from "./config/firebase";
import toast, { Toaster } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
function App() {
  const router = useNavigate();

  useEffect(() => {
    // Prevent navigating back in the browser
    const handleBackButton = () => history.pushState(null, "", document.URL);
    window.addEventListener("popstate", handleBackButton);

    // Check if a user is found
    onAuthStateChanged(auth, (user) => {
      if (localStorage.getItem(`token=${user?.uid}`) !== user?.uid) {
        toast.error("Authorization Failed !!");
        setTimeout(() => router("/auth"), 4000);
      }
    });

    // Unsubscribe when the component is removed
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="h-[100vh] flex flex-col justify-between container m-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="h-[92vh] overflow-y-scroll pb-1">
        <Outlet />
      </div>
      <BottomBar />
    </div>
  );
}

export default App;
