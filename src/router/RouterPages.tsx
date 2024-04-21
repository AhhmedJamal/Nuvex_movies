import App from "../App";
import Auth from "../pages/Auth";
import Home from "../pages/HomePage";
import MovieDetails from "../pages/MovieDetails";
import MyListPage from "../pages/MyListPage";
import { createBrowserRouter } from "react-router-dom";
import SettingsPage from "../pages/SettingsPage";
import SearchPage from "../pages/SearchPage";

export const router = createBrowserRouter([
  {
    path: "/",

    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },

      {
        path: "/:name/:id",
        element: <MovieDetails />,
      },
      {
        path: "/myList",
        element: <MyListPage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: "auth",
    element: <Auth />,
  },
]);
