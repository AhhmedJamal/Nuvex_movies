import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import { CardMovieProps } from "../types/CardMovieProps";
import Shimmer from "./Shimmer";

function CarouselMovie() {
  const [dataMovie, setDataMovie] = useState<CardMovieProps[]>([]);
  const getMovieTrailer = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWZjYjU3YWQ0YjMyNTYxMzE5MmYzMWM4Y2Q3N2Q4YyIsInN1YiI6IjY1ZGJkYWY2ZjZmZDE4MDE3YzU3OGRiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pkBdaOyihwle0Psel6KkEipw5gATt0ZhgEzIoj2uR9w",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setTimeout(() => {
          setDataMovie(response.results);
        }, 1500);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getMovieTrailer();
  }, []);

  const pathPoster = (path: string) => {
    return `https://image.tmdb.org/t/p/original${path}`;
  };

  return (
    <div className=" h-[250px] w-full sm:mb-[60px] px-2 mb-[20px] mt-2">
      {dataMovie.length == 0 ? (
        <Shimmer height={250} width={"100%"} />
      ) : (
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showIndicators={false}
          showStatus={false}
          interval={3000}
        >
          {dataMovie.map((data) => {
            return (
              <div key={data.id} className="relative">
                <img
                  src={pathPoster(data.backdrop_path)}
                  alt="Image Get Upcoming"
                  className="h-[250px] sm:h-[300px] object-cover overflow-hidden"
                />
                <p className="absolute font-['Madimi_One',_sans-serif] font-normal not-italic text-[30px] text-neutral-200 bottom-[-2px] h-[250px] w-full flex items-end bg-gradient-to-t p-2 from-[#1c1c1c]">
                  {data.title}
                </p>
              </div>
            );
          })}
        </Carousel>
      )}
    </div>
  );
}

export default CarouselMovie;
