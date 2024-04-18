import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import { CardMovieProps } from "../types/CardMovieProps";

async function CarouselMovie() {
  const [dataMovie, setDataMovie] = useState<CardMovieProps[]>([]);
  const getMovieTrailer = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=b9fcb57ad4b325613192f31c8cd77d8c&language=en-Us&page=2"
    );
    const data = await res.json();
    setDataMovie(data);
    
  };
  useEffect(() => {
    getMovieTrailer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pathPoster = (path: string) => {
    return `https://image.tmdb.org/t/p/original${path}`;
  };

  return (
    <div className=" h-[280px]  w-full  sm:mb-[60px] px-3 mb-[25px] ">
      <h1 className="text-[18px] font-bold mb-2">Upcoming</h1>
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
              <p className="absolute font-['Madimi_One',_sans-serif] font-normal not-italic text-[30px] text-neutral-200 bottom-0 h-[250px] w-full flex items-end bg-gradient-to-t p-2 from-[#1c1c1c]">
                {data.title}
              </p>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default CarouselMovie;
