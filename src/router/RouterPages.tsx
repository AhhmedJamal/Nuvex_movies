import App from "../App";
import Auth from "../pages/Auth";
import HomePage from "../pages/HomePage";
import MovieDetails from "../pages/MovieDetails";
import MyListPage from "../pages/MyListPage";
import { createBrowserRouter } from "react-router-dom";
import SettingsPage from "../pages/SettingsPage";
import SearchPage from "../pages/SearchPage";
import Forget from "../pages/Forget";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/:name/:id",
        element: <MovieDetails />,
      },
      {
        path: "/search",
        element: <SearchPage />,
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
    path: "authentication",
    element: <Auth />,
  },
  {
    path: "/forget",
    element: <Forget />,
  },
]);
