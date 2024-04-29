import { Outlet } from "react-router-dom";
import BottomBar from "./components/BottomBar";
import { useEffect, useState } from "react";
import SplashScreen from "./components/SplashScreen";
import NavBar from "./components/NavBar";

function App() {
  const [start, setStart] = useState<boolean>(false);
  useEffect(() => {
    setStart(true);
    setTimeout(() => {
      setStart(false);
    }, 3000);
  }, []);
  return (
    <div>
      {start ? (
        <SplashScreen />
      ) : (
        <div className="container m-auto overflow-y-scroll sm-h-[90vh] h-screen px-0 sm:px-8 pb-[70px] sm:pb-0">
          <NavBar />
          <Outlet />
          <BottomBar />
        </div>
      )}
    </div>
  );
}

export default App;
