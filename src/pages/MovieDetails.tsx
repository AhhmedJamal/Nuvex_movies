import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieProps } from "../types/MovieDetailsProps";
import { BsBookmarkPlus } from "react-icons/bs";
import { FaPlay, FaStar } from "react-icons/fa";
import { CardMovieProps } from "../types/CardMovieProps";
import CardMovie from "../components/CardMovie";
import { IoCloseCircleSharp } from "react-icons/io5";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import Shimmer from "../components/Shimmer";
import { db } from "../config/firebase";
import toast, { Toaster } from "react-hot-toast";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { AppContext } from "../context/ThemeProvider ";

function MovieDetails() {
  const [movieVideo, setMovieVideo] = useState<MovieProps | null>(null);
  const [popular, setPopular] = useState<[]>([]);
  const Params = useParams();
  const number = Params.id;
  const numberPart = number?.match(/\d+/);
  const numericValue = parseInt(numberPart?.[0] ?? "", 10);
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [showModel, setShowModel] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMyList, setIsMyList] = useState<boolean>(false);
  const collectionsRef = collection(db, "users");
  const Context = useContext(AppContext);
  if (!Context) throw new Error("useTheme must be used within a ThemeProvider");
  const { user } = Context;

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
  let date: Date;
  if (movieVideo?.release_date) {
    date = new Date(movieVideo?.release_date);
  } else {
    date = new Date();
  }

  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
  });
  const fetchDataVideo = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${numericValue}?api_key=b9fcb57ad4b325613192f31c8cd77d8c&append_to_response=videos`
    );
    const data = await response.json();
    setMovieVideo(data);
    getMyList(data.id);
  };
  function getRandomNumber() {
    // Generate a random decimal between 0 and 1
    const randomDecimal = Math.random();
    // Scale the random decimal to be between 1 and 100
    const randomNumber = Math.floor(randomDecimal * 300) + 1;
    return randomNumber;
  }
  const SuggestedMovies = () => {
    const randomNumber = getRandomNumber();

    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=b9fcb57ad4b325613192f31c8cd77d8c&language=en-Us&page=${randomNumber}`
    )
      .then((response) => response.json())
      .then((response) => {
        setPopular(response.results);
      })
      .catch((err) => console.error(err));
  };
  const pathPhoto = (path: string | null | undefined) => {
    return `https://image.tmdb.org/t/p/original${path}`;
  };
  const handleClickShowMovie = () => {
    setShowModel((pre) => !pre);
  };
  const handleAddMyList = async () => {
    if (user) {
      try {
        const dataFromCollection = await getDocs(collectionsRef);
        const data = dataFromCollection.docs.map((doc) => doc.data());
        const filteredData = data.find((item) => item.uid === user.uid);
        if (filteredData) {
          const docRef = doc(db, "users", user.email || "");
          const newMovies = {
            myList: [...filteredData.myList, movieVideo],
          };
          await updateDoc(docRef, newMovies)
            .then(() => {
              setIsMyList(true);
              console.log("updateDoc successfully");
            })
            .catch((error) => {
              console.error("Error updating document:", error);
            });
        } else {
          console.log("No matching data found.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
    toast.success("Done Add To List");
  };
  const handleRemoveMyList = async () => {
    if (user) {
      try {
        const docRef = doc(db, "users", user.email || "");
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          const oldMyList = userData.myList || []; // Handle case where myList might be undefined
          const updatedMyList = oldMyList.filter(
            (item: { id: number | undefined }) => item.id !== movieVideo?.id
          );
          if (updatedMyList.length !== oldMyList.length) {
            await updateDoc(docRef, { myList: updatedMyList });
            setIsMyList(false); // Assuming you want to set setIsMyList(false) when an item is removed
          } else {
            console.log("Item not found in myList");
          }
        } else {
          console.log("User document does not exist");
        }
      } catch (error) {
        console.error("Error deleting favorite:", error);
      }
    } else {
      console.log("User not logged in");
    }
  };
  const getMyList = async (id: number) => {
    if (user) {
      user.myList?.forEach(async (item: MovieProps) => {
        item.id === id && setIsMyList(true);
      });
    } else {
      console.log("User is not authenticated");
    }
  };
  useEffect(() => {
    fetchDataVideo();
    SuggestedMovies();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Params]);
  return (
    <div className="w-full overflow-hidden pb-s2">
      <Toaster position="top-center" reverseOrder={false} />
      {isLoading ? (
        <Shimmer width={"100%"} height={350} />
      ) : (
        <div className="relative">
          <img
            loading="lazy"
            src={pathPhoto(movieVideo?.backdrop_path)}
            alt="backdrop_path"
            className="w-full h-[350px] object-cover "
          />
          <div className="absolute top-0 flex flex-c pl-2 items-center justify-between  bg-gradient-to-r from-[#1c1c1c] w-full h-[100%]">
            <div className="flex flex-col gap-6">
              <IoIosArrowBack
                className=" text-white"
                size={30}
                onClick={() => window.history.back()}
              />
              <img
                loading="lazy"
                src={pathPhoto(movieVideo?.poster_path)}
                alt="poster_path"
                className="mix-w-[30%] rounded-lg max-h-[250px]"
              />
            </div>
            <p className="flex items-center gap-1 text-[13px] font-bold self-end py-1 px-2 m-3 text-white bg-[#18181889] rounded-2xl">
              {movieVideo?.vote_average.toFixed(1)}{" "}
              <FaStar className="text-primary " />
            </p>
          </div>

          {showModel && (
            <div className="fixed top-0 left-0 z-10 w-full h-screen  bg-[rgba(33,_33,_33,_0.8)]">
              <div className="p-5 w-full flex justify-end">
                <IoCloseCircleSharp size={45} onClick={handleClickShowMovie} />
              </div>
              <iframe
                src={`https://www.youtube.com/embed/${movieVideo?.videos.results[0]?.key}`}
                className={`w-[90%] md:h-[400px] sm:mt-[70px] md:mt-[100px] lg:mt-0 mt-[70px] h-[300px] m-auto`}
                allowFullScreen={true}
              />
            </div>
          )}
        </div>
      )}
      <div className="p-2 mt-2">
        <div className="flex flex-col-reverse sm:flex-row gap-2  justify-between ">
          <button
            onClick={isMyList ? handleRemoveMyList : handleAddMyList}
            className="border border-zinc-600 transition-all active:bg-zinc-500 w-[98%] flex justify-center items-center gap-2 py-2  rounded-md text-[12px] font-bold"
          >
            {isMyList ? (
              <>
                <BsFillBookmarkCheckFill size={17} />
                Remove From List
              </>
            ) : (
              <>
                <BsBookmarkPlus size={17} /> My List
              </>
            )}
          </button>

          <button
            onClick={handleClickShowMovie}
            className="bg-primary active:bg-orange-300 transition-all w-[98%] flex justify-center items-center gap-2 py-2 rounded-md text-[13px] font-bold"
          >
            <FaPlay size={17} />
            Play
          </button>
        </div>
        <div className="mt-5  mb-3">
          <h1 className="font-bold text-[22px] text-primary">
            {movieVideo?.title}
          </h1>
          <p className={`text-zinc-600 dark:text-zinc-400 text-[13px] md:text-[16px] mt-2`}>
            {movieVideo?.overview}
          </p>
        </div>
        <h3 className="text-slate-500 font-bold text-[14px]">Film Genre</h3>
        <p className="grid grid-cols-3 sm:grid-cols-5 gap-1 text-[13px] my-2">
          {movieVideo?.genres?.map((item: { id: number; name: string }) => {
            return (
              <h2
                key={item.id}
                className="flex items-center justify-center  text-center bg-[#00000048] rounded-lg py-[2px]"
              >
                {item.name}
              </h2>
            );
          })}
        </p>

        <div className="text-[14px] font-bold text-slate-500  flex justify-between items-center my-3">
          Original Language:{" "}
          <div className="font-normal ">
            {movieVideo?.spoken_languages[0]?.english_name}
          </div>
        </div>
        <div className="text-slate-500 font-bold text-[14px] flex justify-between items-center">
          Release Date
          <h3 className=" text-[12px] font-normal">{formattedDate}</h3>
        </div>
      </div>
      <div className="bg-zinc-700 w-full h-[1px] my-3"></div>
      <h1 className="text-[14px] font-bold mb-2 pl-3">More Like This</h1>
      <div className="p-2">
        <h1 className="text-[18px] font-bold mb-2">Popular on Nuvex</h1>

        <div
          className="flex overflow-auto gap-3"
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
      </div>
    </div>
  );
}

export default MovieDetails;
