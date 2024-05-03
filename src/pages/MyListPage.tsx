import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useEffect, useState } from "react";
import CardMyList from "../components/CardMyList";
import { MovieProps } from "../types/MovieDetailsProps";
import { TbMovie } from "react-icons/tb";
import ImageMovie from "../../public/assets/Videotape-rafiki.svg";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

function MyListPage() {
  const [dataMyList, setDataMyList] = useState([]);
  const user = auth.currentUser;

  const getMyList = async () => {
    try {
      if (user) {
        const docRef = doc(db, "users", user.email || "");
        const docSnapshot = await getDoc(docRef);
        const userData = docSnapshot.data();
        if (userData) {
          setDataMyList(userData.myList);
        } else {
          console.log("User data is undefined");
        }
      } else {
        console.log("User is not authenticated");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  useEffect(() => {
    getMyList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="p-4">
      <div className="flex items-center self-start  mt-[5px]">
        <IoIosArrowBack
          className="hidden sm:block"
          size={30}
          onClick={() => window.history.back()}
        />

        <h1 className="font-bold text-[23px] self-start ml-5 flex items-center gap-2  ">
          My List
          <TbMovie size={24} />
        </h1>
      </div>

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 flex-col gap-5  mt-5 relative`}
      >
        {dataMyList.length == 0 ? (
          <div className="flex flex-col justify-center items-center mt-[105px] absolute w-full ">
            <img src={ImageMovie} alt="" className="w-[60%] sm:w-[23%]" />
            <h2 className="text-[16px] font-bold ">Your Not Add Any Movie</h2>
            <Link to="/" className="bg-primary font-bold px-3 rounded-lg mt-3">
              Browser Movie{" "}
            </Link>
          </div>
        ) : (
          <>
            {dataMyList.map((movie: MovieProps) => {
              return (
                <CardMyList
                  key={movie.id}
                  dataMovie={movie}
                  getMyList={getMyList}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default MyListPage;
