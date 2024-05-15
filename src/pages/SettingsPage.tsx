import { signOut } from "firebase/auth";
import { auth, db, storage } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/ThemeProvider";
import { useContext, useRef } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MdArrowForwardIos } from "react-icons/md";
import { MdNotificationsActive } from "react-icons/md";
import { IoMdHelpCircle } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import NotificationAdd from "/audio/addMovie.mp3";
import toast, { Toaster } from "react-hot-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function SettingsPage() {
  const imageRef = useRef<HTMLInputElement>(null);
  const imageRefEffect = useRef<HTMLAudioElement>(null);
  const Context = useContext(AppContext);
  if (!Context) throw new Error("useTheme must be used within a ThemeProvider");
  const { userData, theme, toggleTheme, getDataUser } = Context;
  const router = useNavigate();
  const userCollection = collection(db, "users");
  const handleLogOut = () => {
    signOut(auth);
    router("/authentication", { replace: true });
  };
  const handleClick = async () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const dataFromCollection = await getDocs(userCollection);
      const data = dataFromCollection.docs.map((doc) => doc.data());
      const filteredData = data.find((item) => item.uid === userData.uid);
      const stoRef = ref(storage, `/${userData.email}/${file.name}`);
      // upload [ | video | doc | audio ] to storage firebase
      uploadBytes(stoRef, file).then((snapSh) =>
        // download [ | video | doc | audio ] from storage firebase
        getDownloadURL(snapSh.ref).then(async (url) => {
          if (filteredData) {
            const docRef = doc(db, "users", userData.email || "");
            const newPhoto = {
              photoURL: url,
            };
            //update variables to cloud store firebase
            await updateDoc(docRef, newPhoto)
              .then(() => {
                playAudioAdd();
                toast.success("Done update Photo");
                console.log("updateDoc successfully");
              })
              .catch((error) => {
                console.error("Error updating document:", error);
              });
          }
          playAudioAdd();
          getDataUser(userData);
        })
      );
    }
  };
  const playAudioAdd = () => {
    imageRefEffect.current?.play();
  };
  return (
    <section className="flex flex-col justify-between items-center h-[80%] gap-4 p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <audio ref={imageRefEffect} src={NotificationAdd} />
      <div className="flex items-center self-start  mt-[5px] ">
        <IoIosArrowBack
          className="hidden sm:block mr-5 cursor-pointer"
          size={30}
          onClick={() => window.history.back()}
        />
        <h1 className="font-bold text-[23px] self-start ">Settings</h1>
      </div>
      <div className="flex flex-col items-center gap-3 justify-center">
        <>
          {userData.photoURL !== "" && userData.photoURL !== undefined ? (
            <img
              src={userData.photoURL || ""}
              alt="photo user"
              className="size-[80px] object-cover  rounded-lg"
            />
          ) : (
            <FaUserCircle size={65} />
          )}
          <div className="relative">
            <FaPlus
              size={22}
              className="absolute bottom-1 left-4 bg-primary rounded-full p-[2px] active:bg-amber-600 transition-colors"
              onClick={handleClick}
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              ref={imageRef}
            />
          </div>
        </>
        <div className="flex items-center justify-between  bg-neutral-300 dark:bg-neutral-800 px-3  font-bold rounded-md">
          {userData?.displayName}
        </div>
      </div>
      <div className=" w-[90%] md:w-[50%] flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4 bg-neutral-300 dark:bg-neutral-800 p-3  font-bold rounded-xl active:bg-[#3333334d]">
          {theme ? "Dark" : "Light"}

          <div
            onClick={toggleTheme}
            className={`w-11 h-6 transition-all ${
              !theme ? "bg-gray-100" : "bg-zinc-950"
            } rounded-2xl flex items-center p-1`}
          >
            <span
              className={`w-3 h-3 transition-all ${
                !theme
                  ? "bg-zinc-950 translate-x-[0px]"
                  : "bg-gray-100 translate-x-[25px]  "
              } rounded-full`}
            ></span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 bg-neutral-300 dark:bg-neutral-800 p-3  font-bold rounded-xl active:bg-[#3333334d]">
          <div className="flex items-center gap-3">
            <MdNotificationsActive size={20} /> Notifications
          </div>
          <MdArrowForwardIos size={20} />
        </div>
        <div className="flex items-center justify-between gap-4 bg-neutral-300 dark:bg-neutral-800 p-3  font-bold rounded-xl active:bg-[#3333334d]">
          <div className="flex items-center gap-3">
            <IoMdHelpCircle size={20} />
            Help
          </div>
          <MdArrowForwardIos size={20} />
        </div>
      </div>

      <button
        onClick={handleLogOut}
        className="bg-primary p-2 font-bold rounded-md w-[200px]"
      >
        {userData.email !== undefined ? " LogOut" : "Register now"}
      </button>
    </section>
  );
}

export default SettingsPage;
