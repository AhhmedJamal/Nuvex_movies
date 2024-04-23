import { MdOutlineDelete } from "react-icons/md";
import { CardMyListProps } from "../types/CardMyListProps";
import { useNavigate } from "react-router-dom";

function CardMyList({ dataMovie }: CardMyListProps) {
  const { poster_path, title, genres, runtime } = dataMovie;
  const router = useNavigate();

  const pathPhoto = () => {
    return `https://image.tmdb.org/t/p/original${poster_path}`;
  };
  function formatMovieDuration(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    // return `${hours} hours and ${minutes} minutes`;
    return `${hours}:${minutes}:00`;
  }
  return (
    <button
      onClick={() => {
        router(
          `/movie/${dataMovie.id}-${dataMovie?.title.replace(/[\s#-]/g, "_")}`
        );
      }}
      className="flex justify-between gap-5 w-full h-fit bg-[#0000005a] rounded-xl p-3"
    >
      <img
        src={pathPhoto()}
        alt="path Photo movie"
        className="w-24 h-28 object-cover  rounded-xl"
      />
      <div className="w-full">
        <h1 className="font-bold text-[16px] ">{title}</h1>
        <div className="flex flex-col justify-between h-[80%] ">
          <p className="grid grid-cols-3 gap-2  text-[12px] mt-2">
            {genres?.map((item: { id: number; name: string }) => {
              return (
                <h2 className="text-gray-400  text-center bg-[#00000048] rounded-lg py-[2px]">
                  {item.name}
                </h2>
              );
            })}
          </p>
          <div className="flex justify-between items-end">
            <p className="text-gray-400 text-[13px]">
              {formatMovieDuration(runtime)}
            </p>
            <button className="bg-primary p-2 rounded-lg ">
              <MdOutlineDelete size={20} />
            </button>
          </div>
        </div>
      </div>
    </button>
  );
}

export default CardMyList;
