import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useEffect, useState } from "react";
import CardMyList from "../components/CardMyList";
import { MovieProps } from "../types/MovieDetailsProps";
import Shimmer from "../components/Shimmer";

function MyListPage() {
  const [dataMyList, setDataMyList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getMyList = async () => {
    try {
      const user = auth.currentUser;
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
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="p-4 ">
      {!isLoading ? (
        <div className="flex flex-col gap-5 ">
          {dataMyList.map((movie: MovieProps) => {
            return <CardMyList key={movie.id} dataMovie={movie} />;
          })}
        </div>
      ) : (
        <div className=" flex gap-3">
          <Shimmer height={100} width={140} />
          <div className="flex flex-col justify-around">
            <Shimmer height={20} width={140} />
            <Shimmer height={20} width={140} />
          </div>
        </div>
      )}
    </div>
  );
}

export default MyListPage;
