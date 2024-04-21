import { useEffect, useState } from "react";
import { CardMovieProps } from "../types/CardMovieProps";
import CardMovie from "../components/CardMovie";
import CarouselMovie from "../components/CarouselMovie";
import NavBar from "../components/NavBar";
import Shimmer from "../components/Shimmer";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

import { useNavigate } from "react-router-dom";

export default function Home() {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const router = useNavigate();
  const dataShimmer = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ];
  const startDragging = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setMouseDown(true);
    setStartX(e.pageX - (e.currentTarget.offsetLeft || 0));
    setScrollLeft(e.currentTarget.scrollLeft || 0);
  };

  const stopDragging = () => {
    setMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (!mouseDown) return;
    const x = e.pageX - (e.currentTarget.offsetLeft || 0);
    const scroll = x - startX;
    if (e.currentTarget) {
      e.currentTarget.scrollLeft = scrollLeft - scroll;
    }
  };

  const getDataMovie = async (url: string) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${url}?api_key=b9fcb57ad4b325613192f31c8cd77d8c&language=en-Us&page=2`
    );
    const dataMovie = await res.json();
    if (url === "popular") setPopular(dataMovie.results);
    else if (url === "top_rated") setTopRated(dataMovie.results);
  };

  useEffect(() => {
    // Prevent navigating back in the browser
    const handleBackButton = () => history.pushState(null, "", document.URL);
    window.addEventListener("popstate", handleBackButton);

    // Check if a user is found
    onAuthStateChanged(auth, (user) => {
      if (localStorage.getItem(`token=${user?.uid}`) !== user?.uid) {
        setTimeout(() => router("/auth"), 4000);
      }
    });

    getDataMovie("popular");
    getDataMovie("top_rated");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 200);

    // Unsubscribe when the component is removed
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <NavBar />
      <CarouselMovie />
      <div className="p-2">
        <h1 className="text-[18px] font-bold mb-2">Popular on Nuvex</h1>
        {isLoading ? (
          <div
            className="flex overflow-auto gap-3"
            onMouseDown={startDragging}
            onMouseUp={stopDragging}
            onMouseMove={handleMouseMove}
            onMouseLeave={stopDragging}
          >
            {dataShimmer.map((_, i) => {
              return (
                <div key={i}>
                  <Shimmer width={110} height={160} />
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className="flex overflow-auto gap-3"
            onMouseDown={startDragging}
            onMouseUp={stopDragging}
            onMouseMove={handleMouseMove}
            onMouseLeave={stopDragging}
          >
            {popular.map((movie: CardMovieProps) => {
              return (
                <div key={movie.id}>
                  <CardMovie data={movie} />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="p-2">
        <h1 className="text-[18px] font-bold mb-2">Top Rated</h1>
        {isLoading ? (
          <div
            className="flex overflow-auto gap-3"
            onMouseDown={startDragging}
            onMouseUp={stopDragging}
            onMouseMove={handleMouseMove}
            onMouseLeave={stopDragging}
          >
            {dataShimmer.map((_, i) => {
              return (
                <div key={i}>
                  <Shimmer width={110} height={160} />
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className="flex overflow-auto gap-3"
            onMouseDown={startDragging}
            onMouseUp={stopDragging}
            onMouseMove={handleMouseMove}
            onMouseLeave={stopDragging}
          >
            {topRated.map((topRate: CardMovieProps) => {
              return (
                <div key={topRate.id}>
                  <CardMovie data={topRate} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
