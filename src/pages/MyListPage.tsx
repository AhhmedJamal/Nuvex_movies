import { useContext, useEffect } from "react";
import CardMyList from "../components/CardMyList";
import { MovieProps } from "../types/MovieDetailsProps";
import ImageMyList from "/assets/emptyMyList.svg";
import { Link } from "react-router-dom";
import { AppContext } from "../context/ThemeProvider";

function MyListPage() {
  const Context = useContext(AppContext);
  if (!Context) throw new Error("useTheme must be used within a ThemeProvider");
  const { userData, getDataUser } = Context;

  useEffect(() => {
    getDataUser(userData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="p-4">
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 flex-col gap-5  mt-5 relative`}
      >
        {userData.myList?.length == 0 ||  userData.myList == null ? (
          <div className="flex flex-col justify-center items-center mt-[105px] absolute w-full ">
            <img src={ImageMyList} alt="" className="w-[60%] sm:w-[23%]" />
            <h2 className="text-[16px] font-bold ">Your Not Add Any Movie</h2>
            <Link to="/" className="bg-primary font-bold px-3 rounded-lg mt-3">
              Browser Movie{" "}
            </Link>
          </div>
        ) : (
          <>
            {userData.myList?.map((movie: MovieProps) => {
              return (
                <CardMyList
                  key={movie.id}
                  dataMovie={movie}
                  getDataUser={getDataUser}
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
