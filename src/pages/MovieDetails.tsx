import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MovieProps } from "../types/MovieDetailsProps";
import { BsBookmarkPlus } from "react-icons/bs";
import { FaPlay, FaStar } from "react-icons/fa";
import { CardMovieProps } from "../types/CardMovieProps";
import CardMovie from "../components/CardMovie";
import { IoMdClose } from "react-icons/io";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import Shimmer from "../components/Shimmer";
import { db } from "../config/firebase";
import toast, { Toaster } from "react-hot-toast";
import NotificationDelete from "/audio/deleteMovie.mp3";
import NotificationAdd from "/audio/addMovie.mp3";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { AppContext } from "../context/ThemeProvider";

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
  const { userData } = Context;
  const MovieRefAdd = useRef<HTMLAudioElement>(null);
  const MovieRefDelete = useRef<HTMLAudioElement>(null);

  const playAudioAdd = () => {
    MovieRefAdd.current?.play();
  };
  const playAudioDelete = () => {
    MovieRefDelete.current?.play();
  };
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
    if (userData) {
      try {
        const dataFromCollection = await getDocs(collectionsRef);
        const data = dataFromCollection.docs.map((doc) => doc.data());
        const filteredData = data.find((item) => item.uid === userData.uid);
        if (filteredData) {
          const docRef = doc(db, "users", userData.email || "");
          const newMovies = {
            myList: [...filteredData.myList, movieVideo],
          };
          await updateDoc(docRef, newMovies)
            .then(() => {
              setIsMyList(true);
              playAudioAdd();
              toast.success("Done Add To List");
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
  };
  const handleRemoveMyList = async () => {
    if (userData) {
      try {
        const docRef = doc(db, "users", userData.email || "");
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          const oldMyList = userData.myList || [];
          const updatedMyList = oldMyList.filter(
            (item: { id: number | undefined }) => item.id !== movieVideo?.id
          );
          if (updatedMyList.length !== oldMyList.length) {
            await updateDoc(docRef, { myList: updatedMyList });
            setIsMyList(false);
            playAudioDelete();
            toast("Done Remove From List", {
              icon: "🥺",
            });
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
    if (userData) {
      userData.myList?.forEach(async (item: MovieProps) => {
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
        <Shimmer width={"100%"} height={"350px"} />
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
              <div className="p-5 w-full flex justify-end text-white dark:text-black ">
                <IoMdClose
                  onClick={handleClickShowMovie}
                  className="text-[35px] bg-primary p-1"
                />
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
        <div className="flex flex-col-reverse sm:flex-row gap-2  justify-between items-center ">
          <div className="flex w-full gap-3">
            <button
              onClick={isMyList ? handleRemoveMyList : handleAddMyList}
              className="border border-neutral-400  transition-all active:bg-neutral-300 dark:active:bg-neutral-700 w-[50%] flex justify-center items-center gap-2 py-2  rounded-md text-[13px] font-bold"
            >
              <audio ref={MovieRefAdd} src={NotificationAdd} />
              <audio ref={MovieRefDelete} src={NotificationDelete} />
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
            <Link
              to={`https://www.imdb.com/title/${movieVideo?.imdb_id}`}
              target="_blank"
              className="bg-neutral-800 dark:bg-neutral-200 text-neutral-200 dark:text-neutral-800 active:bg-[#f5c51893] dark:active:bg-[#ffd53bc0]  transition-all w-[50%] flex justify-center items-center gap-2 py-2 rounded-md text-[13px] font-bold"
            >
              <FaExternalLinkAlt size={18} />
              IMDB
            </Link>
          </div>
          <button
            onClick={handleClickShowMovie}
            className="bg-primary text-neutral-200 dark:text-neutral-900 active:bg-neutral-400 transition-all w-full flex justify-center items-center gap-2 py-2 rounded-md text-[15px] font-bold"
          >
            <FaPlay size={17} />
            Play
          </button>
        </div>
        <div className="mt-5  mb-3">
          <h1 className="font-bold text-[22px] text-primary">
            {movieVideo?.title}
          </h1>
          <p
            className={`text-zinc-600 dark:text-zinc-400 text-[13px] md:text-[16px] mt-2`}
          >
            {movieVideo?.overview}
          </p>
        </div>
        <h3 className="text-slate-500 font-bold text-[14px]">Film Genre</h3>
        <p className="grid grid-cols-3 sm:grid-cols-5 gap-1 text-[13px] my-2">
          {movieVideo?.genres?.map((item: { id: number; name: string }) => {
            return (
              <h2
                key={item.id}
                className="flex items-center justify-center  text-center bg-neutral-300 dark:bg-neutral-700 rounded-lg py-[2px]"
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
