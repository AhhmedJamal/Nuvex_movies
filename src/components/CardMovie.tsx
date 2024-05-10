import { CardMovieProps } from "../types/CardMovieProps";
import { useNavigate } from "react-router-dom";
import { FcRemoveImage } from "react-icons/fc";

import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
const pathPoster = (path: string) => {
  return `https://image.tmdb.org/t/p/original${path}`;
};
function CardMovie({ data }: { data: CardMovieProps }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useNavigate();
  const handleClick = () => {
    data.poster_path !== null &&
      router(`/movie/${data.id}-${data?.title.replace(/[\s#-]/g, "_")}`);
  };
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  return (
    <>
      {isLoading ? (
        <Shimmer height={"160px"} width={"110px"} />
      ) : (
        <button
          onClick={handleClick}
          className="w-[110px] min-h-[160px] rounded-xl overflow-hidden relative flex flex-col justify-center items-center  border border-zinc-400 dark:border-zinc-700 cursor-grab group  "
        >
          {data.poster_path !== null ? (
            <img
              loading="lazy"
              src={pathPoster(data.poster_path)}
              alt="movie-poster"
              className="object-cover w-[110px] h-[160px] group-hover:opacity-65 transition-all group-hover:scale-105"
            />
          ) : (
            <>
              <FcRemoveImage className="w-[80px] h-[120px]" />
              <h2 className="font-bold text-[11px] mb-[8px]">
                The movie is not available
              </h2>
            </>
          )}
        </button>
      )}
    </>
  );
}

export default CardMovie;
