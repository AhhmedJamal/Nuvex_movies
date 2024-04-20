import { MdOutlineDelete } from "react-icons/md";
import { CardMyListProps } from "../types/CardMyListProps";

function CardMyList({ dataMovie }: CardMyListProps) {
  const { poster_path, title, genres, runtime } = dataMovie;
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
    <div className="flex justify-between  w-full h-fit bg-[#0000005a] rounded-xl p-3">
      <img
        src={pathPhoto()}
        alt="path Photo movie"
        className="w-24 h-28 object-cover  rounded-xl"
      />
      <div className="w-[160px]">
        <h1 className="font-bold text-[16px] ">{title}</h1>
        <div className="flex flex-col  gap-2">
          <p className="grid grid-cols-2  text-[13px] mt-2">
            {genres?.map((item: { id: number; name: string }) => {
              return <h2 className="text-gray-400 ">{item.name}</h2>;
            })}
          </p>
          {/* <p className="text-gray-400 text-[13px]">{release_date}</p> */}
          <p className="text-gray-400 text-[13px]">
            {formatMovieDuration(runtime)}
          </p>
        </div>
      </div>
      <button className="bg-primary p-2 rounded-lg h-fit self-end">
        <MdOutlineDelete size={20} />
      </button>
    </div>
  );
}

export default CardMyList;
