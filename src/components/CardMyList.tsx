import { MdOutlineDelete } from "react-icons/md";
import { CardMyListProps } from "../types/CardMyListProps";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

function CardMyList({ dataMovie, getMyList }: CardMyListProps) {
  const { poster_path, title, genres, runtime, id, vote_average } = dataMovie;
  const [isLoading, setIsLoading] = useState(false);
  const router = useNavigate();
  const user = auth.currentUser;
  const pathPhoto = () => {
    return `https://image.tmdb.org/t/p/original${poster_path}`;
  };
  function formatMovieDuration(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    // return `${hours} hours and ${minutes} minutes`;
    return `${hours}:${minutes}:00`;
  }

  const handleDelete = async () => {
    if (user) {
      try {
        const docRef = doc(db, "users", user.email || "");
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
    getMyList();
  };
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      {!isLoading ? (
        <div className="flex gap-4 w-full h-[150px] p-3 rounded-xl bg-[#0000005a]">
          <Shimmer height={125} width={"90px"} />
          <div className="flex flex-col justify-between items-start w-[65%] pt-1 ">
            <Shimmer height={25} width={"100px"} />
            <div className="flex justify-between w-full">
              <Shimmer height={20} width={"55px"} />
              <Shimmer height={20} width={"55px"} />
              <Shimmer height={20} width={"55px"} />
            </div>

            <div className="flex w-full justify-between items-end">
              <div className="flex gap-6 h-fit">
                <Shimmer height={20} width={"55px"} />
                <Shimmer height={20} width={"35px"} />
              </div>
              <Shimmer height={30} width={"35px"} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-between gap-5 w-full h-[150px] bg-[#0000005a] rounded-xl p-3">
          <img
            onClick={() => {
              router(
                `/movie/${dataMovie.id}-${dataMovie?.title.replace(
                  /[\s#-]/g,
                  "_"
                )}`
              );
            }}
            loading="lazy"
            src={pathPhoto()}
            alt="path photo movie"
            className="w-[90px]  object-cover rounded-xl"
          />
          <div className="w-full text-left ">
            <h1 className="font-bold text-[16px] h-[45px]">{title}</h1>
            <div className="flex flex-col justify-between h-[65%] ">
              <p className="grid grid-cols-3 gap-1 text-[11px] mt-2">
                {genres?.map((item: { id: number; name: string }) => {
                  return (
                    <h2
                      key={item.id}
                      className="text-gray-400 flex items-center justify-center text-center bg-[#00000048] rounded-lg py-[2px]"
                    >
                      {item.name}
                    </h2>
                  );
                })}
              </p>
              <div className="flex justify-between items-end">
                <p className="text-gray-400 text-[13px]">
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
    </>
  );
}

export default CardMyList;
