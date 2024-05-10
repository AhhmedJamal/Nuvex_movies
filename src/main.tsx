import ReactDOM from "react-dom/client";
import { router } from "./router/RouterPages.tsx";
import { RouterProvider } from "react-router-dom";
import "./global.css";
import ThemeProvider from "./context/ThemeProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
);
