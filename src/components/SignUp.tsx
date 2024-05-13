import { FormEvent, useState } from "react";
import { auth, db } from "../config/firebase";
import toast, { Toaster } from "react-hot-toast";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import LoaderButton from "./LoaderButton";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface SignUpProps {
  setChoose: React.Dispatch<React.SetStateAction<boolean>>;
}
function SignUp({ setChoose }: SignUpProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [passConfirmation, setPassConfirmation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isEye, setIsEye] = useState<boolean>(false);
  const [isEyeConfirmation, setIsEyeConfirmation] = useState<boolean>(false);
  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (name && email && pass && passConfirmation) {
      if (pass === passConfirmation) {
        createUserWithEmailAndPassword(auth, email, pass)
          .then(async ({ user }) => {
            await fetchSignInMethodsForEmail(auth, user?.email || "")
              .then(async (signInMethods) => {
                if (signInMethods.length > 0) {
                  console.log(signInMethods);
                } else {
                  try {
                    toast.success("Successfully Create Account");
                    await setDoc(doc(db, "users", user.email || ""), {
                      uid: user?.uid,
                      name: name,
                      email: user?.email,
                      myList: [],
                      photoURL: "",
                    });

                    setTimeout(() => {
                      // Navigate to the home page
                      setChoose(false);
                      // Reset name and  email and password fields
                      setName("");
                      setEmail("");
                      setPass("");
                      setPassConfirmation("");
                    }, 1000);
                  } catch (e) {
                    console.error("Error adding document: ", e);
                  }
                }
              })
              .catch((err) => console.log("error: " + err));
          })
          .catch(() => {
            toast.error("This didn't work.");
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setTimeout(() => {
          toast.error("The password does not match !");
          setLoading(false);
        }, 1000);
      }
    } else {
      toast.error("Check Email address or Password");
      setLoading(false);
    }
  };
  const handleEyePassword = () => {
    setIsEye(!isEye);
  };
  const handleEyePasswordConfirmation = () => {
    setIsEyeConfirmation(!isEyeConfirmation);
  };
  return (
    <div className="flex h-[300px] justify-center items-center flex-col w-full">
      <Toaster position="top-center" reverseOrder={false} />
      <form className="w-full flex flex-col gap-4 " onSubmit={handleSignUp}>
        <div className="flex gap-2">
          <input
            value={name}
            onChange={(event) => setName(event?.target.value)}
            className="bg-neutral-300 dark:bg-zinc-700 shadow appearance-none border border-neutral-400 dark:border-neutral-500 placeholder:text-neutral-500  rounded w-[35%] py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            id="Name"
            type="text"
            placeholder="Name"
            required
          />
          <input
            value={email}
            onChange={(event) => setEmail(event?.target.value)}
            className="bg-neutral-300 dark:bg-zinc-700 shadow appearance-none border border-neutral-400 dark:border-neutral-500 placeholder:text-neutral-500  rounded w-[65%] py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            required
          />
        </div>
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
                className="absolute right-2 top-2 text-neutral-500 dark:text-neutral-300 "
              />
            ) : (
              <AiOutlineEye
                size={23}
                className="absolute right-2 top-2 text-neutral-500 dark:text-neutral-300 "
              />
            )}
          </div>
        </div>
        <div className="relative flex">
          <input
            value={passConfirmation}
            onChange={(event) => setPassConfirmation(event?.target.value)}
            className="bg-neutral-300 dark:bg-zinc-700 shadow appearance-none border border-neutral-400 dark:border-neutral-500 placeholder:text-neutral-500 rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            id="passConfirmation"
            type={isEyeConfirmation ? "text" : "password"}
            placeholder="Password Confirmation"
            required
          />
          <div onClick={handleEyePasswordConfirmation}>
            {isEyeConfirmation ? (
              <AiOutlineEyeInvisible
                size={23}
                className="absolute right-2 top-2 text-neutral-500 dark:text-neutral-300 "
              />
            ) : (
              <AiOutlineEye
                size={23}
                className="absolute right-2 top-2 text-neutral-500 dark:text-neutral-300 "
              />
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary rounded-md p-2 font-bold items-center flex justify-center mt-3"
        >
          {loading ? <LoaderButton /> : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
