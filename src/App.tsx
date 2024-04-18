import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import BottomBar from "./components/BottomBar";
function App() {
  return (
    <div className="h-screen">
      <NavBar />
      <Outlet />
      <BottomBar />
    </div>
  );
}

export default App;
