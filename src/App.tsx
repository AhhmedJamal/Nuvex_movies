import { Outlet } from "react-router-dom";
import BottomBar from "./components/BottomBar";
import { useEffect, useState } from "react";
import SplashScreen from "./components/SplashScreen";

function App() {
  const [start, setStart] = useState<boolean>(false);
  useEffect(() => {
    setStart(true);
    setTimeout(() => {
      setStart(false);
    }, 2500);
  }, []);
  return (
    <div>
      {start ? (
        <SplashScreen />
      ) : (
        <div className="container m-auto overflow-y-scroll h-[90vh]">
          <div className=" sm:h-screen overflow-y-scroll pb-6">
            <Outlet />
          </div>
          <BottomBar />
        </div>
      )}
    </div>
  );
}

export default App;
