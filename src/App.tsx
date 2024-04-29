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
        <div className="container m-auto overflow-y-scroll sm-h-[90vh] h-screen  sm:pb-0">
          {/* <div className=" sm:h-screen h-[90vh] overflow-y-scroll pb-2"> */}
          <Outlet />
          {/* </div> */}
          <BottomBar />
        </div>
      )}
    </div>
  );
}

export default App;
