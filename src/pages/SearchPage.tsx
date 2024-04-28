import CardMovie from "../components/CardMovie";
import { CardMovieProps } from "../types/CardMovieProps";
import ImageMovie from "../../public/assets/Film rolls-rafiki.svg";
import { useState } from "react";
import Shimmer from "../components/Shimmer";

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
    <div className="p-3 mt-10 ">
      <form
        className="flex justify-between items-center mt-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={title}
          placeholder="Type Name Movie..."
          className="h-8 w-[70%] bg-zinc-400 outline-none  font-bold pl-2 placeholder:text-zinc-700"
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
        <div className="grid grid-cols-3 place-items-center gap-x-2 gap-y-1.5 mt-5 relative ">
          {search.map((_, i) => {
            return (
              <div key={i} className="overflow-hidden">
                <Shimmer width={"110px"} height={160} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-3 place-items-center gap-x-2 gap-y-1.5 mt-10 relative">
          {search.length !== 0 ? (
            search.map((movie: CardMovieProps) => (
              <CardMovie key={movie.id} data={movie} />
            ))
          ) : (
            <div className="flex flex-col justify-center items-center w-full top-0 absolute font-bold">
              <img
                src={ImageMovie}
                alt="Image not found Movies"
                className="w-[65%] mt-[50px] m-auto "
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
