import App from "../App";
import Auth from "../pages/Auth";
import Home from "../pages/HomePage";
import MovieDetails from "../pages/MovieDetails";
import MyListPage from "../pages/MyListPage";
import { createBrowserRouter } from "react-router-dom";

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
        element: <h1>search</h1>,
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
        path: "/Profile",
        element: <h1>Profile</h1>,
      },
    ],
  },
  {
    path: "auth",
    element: <Auth />,
  },
]);
