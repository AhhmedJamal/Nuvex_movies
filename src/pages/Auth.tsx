import { onAuthStateChanged } from "firebase/auth";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [choose, setChoose] = useState<boolean>(true);
  const router = useNavigate();
  useEffect(() => {
    // Check if a user is found
    onAuthStateChanged(auth, (user) => {
      if (localStorage.getItem(`token=${user?.uid}`) === user?.uid) {
        router("/");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="bg-[url('../public/assets/backGroundAuth.jpg')] bg-cover">
      <div className="flex h-screen  w-full justify-center items-center pt-16 flex-col bg-gradient-to-t from-black via-zinc-900 to-transparent">
        <h1 className=" text-[50px] font-['Righteous',_sans-serif] font-semibold not-italic text-primary mb-[20px]">
          Nuvex
        </h1>
        <div className="flex gap-3 font-bold justify-between w-[80%] mb-4">
          <button
            onClick={() => setChoose(true)}
            className={`border border-zinc-500 py-1 px-3 w-[48%] ${
              choose && "bg-primary text-white border-none"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setChoose(false)}
            className={`border border-zinc-500 py-1 px-3 w-[48%] ${
              !choose ? "bg-primary text-white border-none " : ""
            }`}
          >
            Sign up
          </button>
        </div>
        {choose ? <Login /> : <SignUp setChoose={setChoose} />}
      </div>
    </div>
  );
}

export default Auth;

/*
  const addFavorite = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const dataFromCollection = await getDocs(collectionsRef);
        const data = dataFromCollection.docs.map((doc) => doc.data());
        const filteredData = data.find((item) => item.id === user.uid) || [];
        const docRef = doc(db, "users", user.email);
        const newFavorites = {
          favorite: [...filteredData.favorite, { ...product, favorite: true }],
        };
        await updateDoc(docRef, newFavorites)
          .then(() => {
            console.log("updateDoc successfully");
          })
          .catch((error) => {
            console.error("Error updateDoc document:", error);
          });
      } catch (error) {
        console.error("Error getting or updateDoc document:", error);
      }
    }
    getBooleanIconFavorite();
  };
 */
