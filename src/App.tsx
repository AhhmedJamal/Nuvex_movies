import { Outlet } from "react-router-dom";
import BottomBar from "./components/BottomBar";
function App() {
  return (
    <div className="container m-auto overflow-y-scroll h-[100vh] ">
      <div className=" sm:h-screen h-[90vh] overflow-y-scroll pb-6">
        <Outlet />
      </div>
      <BottomBar />
    </div>
  );
}

export default App;
