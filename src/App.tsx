import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import BottomBar from "./components/BottomBar";
import SplashScreen from "./components/SplashScreen";

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
        <div
          className={`container m-auto overflow-y-scroll sm-h-[90vh] h-screen px-0 sm:px-8 pb-4 bg-white text-[#131313] dark:bg-[#131313] dark:text-white`}
        >
          <Outlet />
          <BottomBar />
        </div>
      )}
    </div>
  );
}

export default App;
