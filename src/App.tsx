import { Outlet } from "react-router-dom";

import BottomBar from "./components/BottomBar";
function App() {
  return (
    <>
      <div className="h-screen overflow-y-scroll pb-[70px]">
        <Outlet />
      </div>
      <BottomBar />
    </>
  );
}

export default App;
