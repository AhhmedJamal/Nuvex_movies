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
      <div className="relative w-fit text-[33px] font-[700] text-primary overflow-hidden z-10 pt-4 ml-3">
        NUVEX
        <div className="absolute bottom-2 right-[0px] bg-[#ffffff0c] [box-shadow:0_4px_30px_#00000005] backdrop-filter backdrop-blur-[2px] w-full h-[11px]"></div>
      </div>
      <div className="flex h-screen  w-full items-center justify-center flex-col bg-gradient-to-t from-black via-zinc-900 to-transparent">
        <div className="flex flex-col  font-bold justify-between w-[80%] lg:w-[50%] my-4">
          <div className=" flex gap-3">
            <button
              onClick={() => setChoose(true)}
              className={`border border-zinc-500 py-1 px-3 w-[48%] text-white ${
                choose && "bg-primary border-none"
              }`}
            >
              Log in
            </button>
            <button
              onClick={() => setChoose(false)}
              className={`border border-zinc-500 py-1 px-3 w-[48%] text-white ${
                !choose ? "bg-primary border-none" : ""
              }`}
            >
              Sign up
            </button>
          </div>
          {choose ? <Login /> : <SignUp setChoose={setChoose} />}
        </div>
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
