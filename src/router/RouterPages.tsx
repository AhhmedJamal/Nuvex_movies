import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Auth from "../pages/Auth";
import Home from "../components/HomePage";
import MovieDetails from "../pages/MovieDetails";

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
        element: <h1>myList</h1>,
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
