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
        const docRef = doc(db, "users", user.email);
        const docSnapshot = await getDoc(docRef);
        const userData = docSnapshot.data();
        setDataMyList(userData.myList);
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      // You can log the full error object for more details: console.error(error);
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
  return <div>MyListPage</div>;
}

export default MyListPage;
