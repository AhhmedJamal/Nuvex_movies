import { FormEvent, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { auth, db, facebookProvider, googleProvider } from "../config/firebase";
import { fetchSignInMethodsForEmail, signInWithPopup } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import LoaderButton from "./LoaderButton";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useNavigate();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (email && pass) {
      // Authenticate user and handle success
      signInWithEmailAndPassword(auth, email, pass)
        .then(async ({ user }) => {
          // Store user token in local storage
          localStorage.setItem(`token=${user?.uid}`, user.uid);
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
      const userDocRef = doc(db, "users", user.email || "");
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        // User exists, do something (e.g., set user info in local storage)
        localStorage.setItem(`token=${user.uid}`, user.uid);
        router("/", { replace: true }); // Assuming you have 'router' imported and it's used for navigation
      } else {
        // User doesn't exist, create a new document for the user
        await setDoc(userDocRef, {
          id: user?.uid,
          name: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
          myList: [],
        });
        localStorage.setItem("token", user.uid);
        console.log("New user added successfully");
        router("/", { replace: true }); // Navigate to a different route after creating the user document
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      try {
        const signInMethods = await fetchSignInMethodsForEmail(
          auth,
          user.email || ""
        );

        if (!signInMethods) {
          try {
            await setDoc(doc(db, "users", user?.email || ""), {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              favorite: [],
              cart: [],
            });

            console.log("Document added successfully");
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  return (
    <div className="flex h-[40vh] justify-center items-center flex-col overflow-hidden w-full">
      <Toaster position="top-center" reverseOrder={false} />
      <form className="w-[80%] flex flex-col gap-3" onSubmit={handleLogin}>
        <input
          className="bg-zinc-700 shadow appearance-none border border-zinc-500 rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="bg-zinc-700 shadow appearance-none border border-zinc-500 rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
          id="pass"
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        <Link
          to="/forget"
          className="text-gray-400 font-bold rounded-md p-1 text-[12px] underline text-end"
        >
          Forgot Password?
        </Link>
        <button
          type="submit"
          className="bg-primary text-white rounded-md p-2 font-bold items-center flex justify-center"
        >
          {loading ? <LoaderButton /> : "Login"}
        </button>
      </form>
      <div className="flex justify-center gap-2 mt-[20px]">
        <button
          aria-label="Button Login Google"
          onClick={handleGoogle}
          type="button"
          className="bg-zinc-700 text-gray-800 text-[14px]  rounded-md p-2 font-bold items-center flex gap-2 justify-center"
        >
          <FcGoogle size={24} />
        </button>
        <button
          aria-label="Button Login Facebook"
          onClick={handleFacebook}
          type="button"
          className="bg-zinc-700 text-gray-800 text-[14px]  rounded-md p-2 font-bold items-center flex gap-2 justify-center"
        >
          <SiFacebook size={24} className="text-sky-500" />
        </button>
      </div>
    </div>
  );
}

export default Login;
