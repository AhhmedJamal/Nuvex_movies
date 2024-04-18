import { CardMovieProps } from "../types/CardMovieProps";
import { useNavigate } from "react-router-dom";
const pathPoster = (path: string) => {
  return `https://image.tmdb.org/t/p/original${path}`;
};
function CardMovie({ data }: { data: CardMovieProps }) {
  const router = useNavigate();

  return (
    <button
      onClick={() => {
        router(`/movie/${data.id}-${data?.title.replace(/[\s#-]/g, "_")}`);
      }}
      className="w-[110px] min-h-[160px] relative flex flex-col justify-center items-center border border-zinc-600 "
    >
      {data.poster_path == null ? (
        <div className="absolute top-0 bg-zinc-700 flex w-full h-full  animate-pulse gap-2 p-4">
          {/* <svg
            viewBox="0 0 800 800"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin"
          >
            <circle
              cx="400"
              cy="400"
              fill="none"
              r="228"
              stroke-width="32"
              stroke="#0ea5e9"
              stroke-dasharray="674 1400"
              stroke-linecap="round"
            />
          </svg> */}
        </div>
      ) : (
        <img
          src={pathPoster(data.poster_path)}
          alt="movie-poster"
          width={120}
          height={100}
        />
      )}
    </button>
  );
}

export default CardMovie;
