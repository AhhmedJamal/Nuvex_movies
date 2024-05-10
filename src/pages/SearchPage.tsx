import CardMovie from "../components/CardMovie";
import { CardMovieProps } from "../types/CardMovieProps";
import ImageSearch from "/assets/emptySearch.svg";
import { useState } from "react";
import Shimmer from "../components/Shimmer";
import { IoIosArrowBack } from "react-icons/io";

function SearchPage() {
  const [search, setSearch] = useState<[]>([]);
  const [title, setTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => {
    setIsLoading(true);
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${title.replace(
        /\s/g,
        "+"
      )}&api_key=b9fcb57ad4b325613192f31c8cd77d8c`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSearch(data.results);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData();
  };
  return (
    <div className="p-4">
      <div className="flex items-center self-start mt-[5px]">
        <IoIosArrowBack
          className="hidden sm:block mr-5 cursor-pointer"
          size={30}
          onClick={() => window.history.back()}
        />
        <h1 className="font-bold text-[23px] self-start">Search</h1>
      </div>
      <form
        className="flex justify-between items-center mt-6"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={title}
          placeholder="Type Name Movie..."
          className="h-8 w-[70%] bg-zinc-300 dark:bg-neutral-700 outline-none  font-bold pl-2 placeholder:text-neutral-700 dark:placeholder:text-neutral-200"
          required
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button type="submit" className="bg-primary font-bold h-8 w-[28%]  ">
          Search
        </button>
      </form>
      {search.length !== 0 && (
        <h1 className="mt-4 font-bold">Results For ' {title} '</h1>
      )}
      {isLoading ? (
        <div className="grid grid-cols-3 sm:grid-cols-5  md:grid-cols-6 md:gap-y-5  place-items-center gap-x-2 gap-y-1 mt-5 relative ">
          {search.map((_, i) => {
            return (
              <div key={i} className="overflow-hidden">
                <Shimmer width={"110px"} height={"160px"} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-5  md:grid-cols-6 md:gap-y-5 place-items-center gap-x-3 gap-y-1 mt-5 relative">
          {search.length !== 0 ? (
            search.map((movie: CardMovieProps) => (
              <CardMovie key={movie.id} data={movie} />
            ))
          ) : (
            <div className="flex flex-col justify-center items-center w-full top-0 absolute font-bold">
              <img
                src={ImageSearch}
                alt="Image not found Movies"
                className="w-[60%] sm:w-[23%] mt-[50px]"
              />
              No results Movies !!
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchPage;

// api search
// https://api.themoviedb.org/3/search/movie?query=no+way+up&api_key=b9fcb57ad4b325613192f31c8cd77d8c
