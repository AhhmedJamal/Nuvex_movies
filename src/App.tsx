import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import BottomBar from "./components/BottomBar";
function App() {
  return (
    <>
      <NavBar />
      <div className="h-screen overflow-y-scroll py-[70px]">
        <Outlet />
      </div>
      <BottomBar />
    </>
  );
}

export default App;
