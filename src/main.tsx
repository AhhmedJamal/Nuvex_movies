import ReactDOM from "react-dom/client";
import { router } from "./router/RouterPages.tsx";
import { RouterProvider } from "react-router-dom";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
  </>
);
