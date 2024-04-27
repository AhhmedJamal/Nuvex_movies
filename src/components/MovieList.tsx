import { useState } from "react";

import CardMovie from "./CardMovie";
import { CardMovieProps } from "../types/CardMovieProps";

interface MovieListProps {
  title: string;
  dataMovie: CardMovieProps[];
}
function MovieList({ dataMovie, title }: MovieListProps) {
  const [mouseDown, setMouseDown] = useState<boolean>(false);
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

  return (
    <div className="p-2">
      <h1 className="text-[18px] font-bold mb-2">
        {title === "Popular" ? `Popular on Nuvex` : title}
      </h1>
      <div
        className="flex overflow-auto gap-3"
        onMouseDown={startDragging}
        onMouseUp={stopDragging}
        onMouseMove={handleMouseMove}
        onMouseLeave={stopDragging}
      >
        {dataMovie.map((movie: CardMovieProps) => {
          return (
            <div key={movie.id}>
              <CardMovie data={movie} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MovieList;
