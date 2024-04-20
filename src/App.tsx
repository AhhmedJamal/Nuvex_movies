import { Outlet } from "react-router-dom";
import BottomBar from "./components/BottomBar";

function App() {
  return (
    <div className="container m-auto overflow-y-scroll h-[90vh]">
      <div className="h-[92vh] overflow-y-scroll pb-1">
        <Outlet />
      </div>
      <BottomBar />
    </div>
  );
}

export default App;
