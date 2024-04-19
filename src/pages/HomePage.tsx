import { useEffect, useState } from "react";
import { CardMovieProps } from "../types/CardMovieProps";
import CardMovie from "../components/CardMovie";
import CarouselMovie from "../components/CarouselMovie";
import NavBar from "../components/NavBar";
import Shimmer from "../components/Shimmer";

export default function Home() {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [setLoading, setIsLoading] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

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
    getDataMovie("popular");
    getDataMovie("top_rated");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <main>
      <NavBar />
      <CarouselMovie />

      <div className="p-2 ">
        <h1 className="text-[18px] font-bold mb-2">Popular on Nuvex</h1>
        {setLoading ? (
          <div className="flex gap-3">
            <Shimmer width={110} height={150} />
            <Shimmer width={110} height={150} />
            <Shimmer width={110} height={150} />
          </div>
        ) : (
          <div
            className="flex overflow-auto gap-3 containerMovies"
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
        {setLoading ? (
          <div className="flex gap-3">
            <Shimmer width={110} height={150} />
            <Shimmer width={110} height={150} />
            <Shimmer width={110} height={150} />
          </div>
        ) : (
          <div
            className="flex overflow-auto gap-3 containerMovies"
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
    </main>
  );
}
