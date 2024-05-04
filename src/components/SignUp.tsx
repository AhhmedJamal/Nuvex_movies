import { FormEvent, useState } from "react";
import { auth, db } from "../config/firebase";
import toast, { Toaster } from "react-hot-toast";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import LoaderButton from "./LoaderButton";

interface SignUpProps {
  setChoose: React.Dispatch<React.SetStateAction<boolean>>;
}
function SignUp({ setChoose }: SignUpProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [passConfirmation, setPassConfirmation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
                    await setDoc(doc(db, "users", user.email || ""), {
                      photoURL: "",
                      id: user?.uid,
                      name: name,
                      email: user?.email,
                      myList: [],
                    });
                  } catch (e) {
                    console.error("Error adding document: ", e);
                  }
                }
              })
              .catch((err) => console.log("error: " + err));

            // localStorage.setItem(`token=${user?.uid}`, user?.uid || "");
            toast.success("Successfully Create Account");
            setTimeout(() => {
              // Navigate to the home page
              setChoose(true);
            }, 1500);

            // Reset email and password fields
            setName("");
            setEmail("");
            setPass("");
            setPassConfirmation("");
          })
          .catch(() => {
            toast.error("This didn't work.");
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        toast.error("The password does not match !");
        setLoading(false);
      }
    } else {
      toast.error("Check Email address or Password");
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[300px] justify-center items-center flex-col w-full">
      <Toaster position="top-center" reverseOrder={false} />
      <form className="w-full flex flex-col gap-4" onSubmit={handleSignUp}>
        <div className="flex gap-2">
          <input
            value={name}
            onChange={(event) => setName(event?.target.value)}
            className="bg-zinc-700  shadow appearance-none border border-zinc-500 rounded w-[35%] py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            id="Name"
            type="text"
            placeholder="Name"
            required
          />
          <input
            value={email}
            onChange={(event) => setEmail(event?.target.value)}
            className="bg-zinc-700  shadow appearance-none border border-zinc-500 rounded w-[65%] py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <input
          value={pass}
          onChange={(event) => setPass(event?.target.value)}
          className="bg-zinc-700 shadow appearance-none border border-zinc-500 rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
          id="pass"
          type="password"
          placeholder="Password"
          required
        />
        <input
          value={passConfirmation}
          onChange={(event) => setPassConfirmation(event?.target.value)}
          className="bg-zinc-700 shadow appearance-none border border-zinc-500 rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
          id="passConfirmation"
          type="password"
          placeholder="Password Confirmation"
          required
        />

        <button
          type="submit"
          className="bg-primary text-white rounded-md p-2 font-bold items-center flex justify-center mt-3"
        >
          {loading ? <LoaderButton /> : "Sign up"}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
