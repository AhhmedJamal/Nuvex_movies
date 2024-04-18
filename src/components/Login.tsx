import { FormEvent, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { auth, db, facebookProvider } from "../config/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { UserData } from "../types/UserProps";
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
          localStorage.setItem("token", user.uid);
          // Navigate to the home page
          router("/");
          // Reset email and password fields
          setEmail("");
          setPass("");
        })
        .catch(() => {
          toast.error("This didn't work.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast.error("This didn't work.");
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then(async ({ user }: { user: UserData | null | undefined }) => {
        await fetchSignInMethodsForEmail(auth, user?.email || "")
          .then(async (signInMethods) => {
            if (signInMethods.length > 0) {
              console.log(signInMethods);
            } else {
              try {
                await addDoc(collection(db, "/users"), {
                  id: user?.uid,
                  name: user?.displayName,
                  email: user?.email,
                  photoURL: user?.photoURL,
                  myList: [],
                });
                console.log("Document added successfully");
              } catch (e) {
                console.error("Error adding document: ", e);
              }
            }
          })
          .catch((err) => console.log("error: " + err));

        localStorage.setItem("token", user?.uid || "");

        router("/");
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error.message);
      });
  };

  const handleFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      try {
        try {
          await addDoc(collection(db, "users"), {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            myList: [],
          });
          console.log("Document added successfully");
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      } catch (error) {
        console.error(error);
      }
    } catch (error: unknown) {
      console.error(error);
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
          className="bg-sky-500 text-light rounded-md p-2 font-bold items-center flex justify-center"
        >
          {loading ? (
            <span className="w-[30px] h-[30px] border-[5px] border-[solid] border-[#FFF] [border-bottom-color:transparent] rounded-[50%] inline-block box-border  animate-spin"></span>
          ) : (
            "Login"
          )}
        </button>
      </form>
      <div className="flex justify-center gap-2 mt-[20px]">
        <button
          onClick={handleGoogle}
          type="button"
          className="bg-zinc-700 text-gray-800 text-[14px]  rounded-md p-2 font-bold items-center flex gap-2 justify-center"
        >
          <FcGoogle size={24} />
        </button>
        <button
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
