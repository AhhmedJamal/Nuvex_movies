import { useEffect, useState } from "react";
import CarouselMovie from "../components/CarouselMovie";
import MoviesList from "../components/MoviesList";
import { CardMovieProps } from "../types/CardMovieProps";
import Footer from "../components/Footer";


export default function HomePage() {
  const [popular, setPopular] = useState<CardMovieProps[]>([]);
  const [topRated, setTopRated] = useState<CardMovieProps[]>([]);
  const [upcoming, setUpcoming] = useState<CardMovieProps[]>([]);
  const [nowPlaying, setNowPlaying] = useState<CardMovieProps[]>([]);

  // const router = useNavigate();

  function getRandomNumber() {
    // Generate a random decimal between 0 and 1
    const randomDecimal = Math.random();
    // Scale the random decimal to be between 1 and 100
    const randomNumber = Math.floor(randomDecimal * 46) + 1;
    return randomNumber;
  }
  const getDataMovie = async (url: string) => {
    const randomNumber = getRandomNumber();
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${url}?api_key=b9fcb57ad4b325613192f31c8cd77d8c&language=en-Us&page=${
        url == "popular" ? randomNumber : "2"
      }`
    );
    const dataMovie = await res.json();
    if (url === "now_playing") setNowPlaying(dataMovie.results);
    else if (url === "popular") setPopular(dataMovie.results);
    else if (url === "top_rated") setTopRated(dataMovie.results);
    else if (url === "upcoming") setUpcoming(dataMovie.results);
  };

  useEffect(() => {
    // Prevent navigating back in the browser
    const handleBackButton = () => history.pushState(null, "", document.URL);
    window.addEventListener("popstate", handleBackButton);

    // Check if a user is found
    // onAuthStateChanged(auth, (user) => {
    //   if (localStorage.getItem(`token-${user?.uid}`) !== user?.uid) {
    //     router("/authentication");
    //   }
    // });

    getDataMovie("now_playing");
    getDataMovie("popular");
    getDataMovie("top_rated");
    getDataMovie("upcoming");

    // Unsubscribe when the component is removed
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main  className="p-2 lg:px-10 2xl:px-0">
      <CarouselMovie />
      <MoviesList dataMovie={nowPlaying} title={"Now Playing"} />
      <MoviesList dataMovie={popular} title={"Popular"} />
      <MoviesList dataMovie={topRated} title={"Top Rated"} />
      <MoviesList dataMovie={upcoming} title={"Upcoming"} />
      <Footer />
    </main>
  );
}
