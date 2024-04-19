import { CardMovieProps } from "../types/CardMovieProps";
import { useNavigate } from "react-router-dom";
const pathPoster = (path: string) => {
  return `https://image.tmdb.org/t/p/original${path}`;
};
function CardMovie({ data }: { data: CardMovieProps }) {
  const router = useNavigate();

  return (
    <>
      <button
        onClick={() => {
          router(`/movie/${data.id}-${data?.title.replace(/[\s#-]/g, "_")}`);
        }}
        className="w-[110px] min-h-[160px] relative flex flex-col justify-center items-center border border-zinc-600 cursor-grab "
      >
        <img
          src={pathPoster(data.poster_path)}
          alt="movie-poster"
          width={120}
          height={100}
        />
      </button>
    </>
  );
}

export default CardMovie;
