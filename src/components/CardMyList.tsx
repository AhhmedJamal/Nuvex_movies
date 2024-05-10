import { MdOutlineDelete } from "react-icons/md";
import { CardMyListProps } from "../types/CardMyListProps";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FaStar } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { AppContext } from "../context/ThemeProvider ";

function CardMyList({ dataMovie, getDataUser }: CardMyListProps) {
  const { poster_path, title, genres, runtime, id, vote_average } = dataMovie;
  const [isLoading, setIsLoading] = useState(false);
  const Context = useContext(AppContext);
  if (!Context) throw new Error("useTheme must be used within a ThemeProvider");
  const { userData } = Context;
  const router = useNavigate();

  const pathPhoto = () => {
    return `https://image.tmdb.org/t/p/original${poster_path}`;
  };
  function formatMovieDuration(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}:00`;
  }

  const handleClick = () => {
    dataMovie.poster_path !== null &&
      router(
        `/movie/${dataMovie.id}-${dataMovie?.title.replace(/[\s#-]/g, "_")}`
      );
  };
  const handleDelete = async () => {
    if (userData) {
      try {
        const docRef = doc(db, "users", userData.email || "");
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          const updatedMyList = userData.myList.filter(
            (item: { id: number }) => item.id !== id
          );
          await updateDoc(docRef, { myList: updatedMyList });
        } else {
          console.log("User document does not exist");
        }
      } catch (error) {
        console.error("Error deleting favorite:", error);
      }
    } else {
      console.log("User not logged in");
    }
    getDataUser(userData);
  };
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
    setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <section>
      {isLoading ? (
        <div className="flex gap-5 w-full h-[160px] p-3 rounded-xl bg-neutral-200 dark:bg-neutral-800">
          <Shimmer height={"140px"} width={"90px"} />
          <div className="flex flex-col justify-between items-start w-[65%] pt-1 ">
            <Shimmer height={"25px"} width={"100px"} />
            <div className="flex justify-between w-full">
              <Shimmer height={"20px"} width={"55px"} />
              <Shimmer height={"20px"} width={"55px"} />
              <Shimmer height={"20px"} width={"55px"} />
            </div>

            <div className="flex w-full justify-between items-end">
              <div className="flex gap-6 h-fit">
                <Shimmer height={"20px"} width={"55px"} />
                <Shimmer height={"20px"} width={"35px"} />
              </div>
              <Shimmer height={"30px"} width={"35px"} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-between gap-5 w-full h-[160px] bg-neutral-200 dark:bg-neutral-800 rounded-xl p-3">
          <img
            onClick={handleClick}
            loading="lazy"
            src={pathPhoto()}
            alt="path photo movie"
            className="w-[90px]  object-cover rounded-xl"
          />
          <div className="w-full text-left ">
            <h1 className="font-bold text-[16px] h-[45px]">{title}</h1>
            <div className="flex flex-col justify-between h-[65%] ">
              <p className="grid grid-cols-3 gap-1 text-[10px] mt-2">
                {genres?.map((item: { id: number; name: string }) => {
                  return (
                    <h2
                      key={item.id}
                      className=" flex items-center justify-center text-center bg-neutral-300 dark:bg-neutral-900 rounded-lg py-[2px]"
                    >
                      {item.name}
                    </h2>
                  );
                })}
              </p>
              <div className="flex justify-between items-end">
                <p className="text-zinc-500 text-[13px]">
                  {formatMovieDuration(runtime)}
                </p>
                <p className="flex items-center gap-1 text-[13px] font-bold">
                  {vote_average.toFixed(1)} <FaStar className="text-primary" />
                </p>
                <button
                  onClick={handleDelete}
                  className="bg-primary p-2 rounded-lg "
                >
                  <MdOutlineDelete size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default CardMyList;
