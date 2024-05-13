import { FormEvent, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { auth, db, facebookProvider, googleProvider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import LoaderButton from "./LoaderButton";
import { UserData } from "../types/UserData";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isEye, setIsEye] = useState<boolean>(false);
  const router = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (email && pass) {
      // Authenticate user and handle success
      signInWithEmailAndPassword(auth, email, pass)
        .then(async ({ user }) => {
          // Store user token in local storage
          localStorage.setItem(`token-${user?.uid}`, user.uid);
          // Navigate to the home page
          router("/", { replace: true });
          // Reset email and password fields
          setEmail("");
          setPass("");
        })
        .catch(() => {
          toast.error("Check Email and Password!");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast.error("Invalid Email or Password!");
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      await handleUserAuth(user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      await handleUserAuth(user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserAuth = async (user: UserData) => {
    const userDocRef = doc(db, "users", user.email || "");
    const userDocSnapshot = await getDoc(userDocRef);
    if (userDocSnapshot.exists()) {
      // User exists, do something (e.g., set user info in local storage)
      localStorage.setItem(`token-${user.uid}`, user.uid || "");
      router("/", { replace: true }); // Assuming you have 'router' imported and it's used for navigation
    } else {
      // User doesn't exist, create a new document for the user
      try {
        await setDoc(userDocRef, {
          uid: user?.uid,
          name: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
          myList: [],
        });
        localStorage.setItem(`token-${user.uid}`, user.uid || "");
        console.log("New user added successfully");
        router("/", { replace: true }); // Navigate to a different route after creating the user document
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };
  const handleEyePassword = () => {
    setIsEye(!isEye);
  };
  return (
    <div className="flex h-[300px]  justify-center items-center flex-col overflow-hidden w-full">
      <Toaster position="top-center" reverseOrder={false} />
      <form className="w-full flex flex-col gap-3 " onSubmit={handleLogin}>
        <input
          className="bg-neutral-300 dark:bg-zinc-700 shadow appearance-none border border-neutral-400 dark:border-neutral-500 rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline placeholder:text-neutral-500"
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="relative flex">
          <input
            className="bg-neutral-300 dark:bg-zinc-700 shadow appearance-none border border-neutral-400 dark:border-neutral-500   rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline placeholder:text-neutral-500"
            id="pass"
            type={isEye ? "text" : "password"}
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
          <div onClick={handleEyePassword}>
            {isEye ? (
              <AiOutlineEyeInvisible
                size={23}
                className="absolute right-2 top-2 text-neutral-500 dark:text-neutral-300"
              />
            ) : (
              <AiOutlineEye
                size={23}
                className="absolute right-2 top-2 text-neutral-500 dark:text-neutral-300"
              />
            )}
          </div>
        </div>
        <Link
          to="/forget"
          className="text-neutral-400 font-bold rounded-md p-1 text-[12px] underline text-end w-fit self-end"
        >
          Forgot Password?
        </Link>
        <button
          type="submit"
          className="bg-primary text-black rounded-md p-2 font-bold items-center flex justify-center"
        >
          {loading ? <LoaderButton /> : "Sign In"}
        </button>
      </form>
      <div className="flex flex-col justify-center gap-2 mt-[20px] w-full ">
        <button
          aria-label="Button Login Google"
          onClick={handleGoogle}
          type="button"
          className="bg-neutral-200 dark:bg-neutral-200  text-neutral-800 text-[14px] active:bg-gray-300  rounded-md p-1 font-bold items-center flex gap-2 justify-center"
        >
          Login with
          <FcGoogle size={24} />
        </button>
        <button
          aria-label="Button Login Facebook"
          onClick={handleFacebook}
          type="button"
          className="bg-neutral-200 dark:bg-neutral-200 text-neutral-800 text-[14px] active:bg-gray-300  rounded-md p-1 font-bold items-center flex gap-2 justify-center"
        >
          Login with
          <SiFacebook size={24} className="text-sky-500 " />
        </button>
      </div>
    </div>
  );
}

export default Login;
