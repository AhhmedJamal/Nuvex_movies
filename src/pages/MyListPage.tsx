import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useEffect, useState } from "react";

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
    console.log(dataMyList);

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>{isLoading ? <h1>true</h1> : <h1>false</h1>}</div>;
}

export default MyListPage;
