import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import toast, { Toaster } from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

function SignUp() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [passConfirmation, setPassConfirmation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useNavigate();

  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (name && email && pass && passConfirmation) {
      // Authenticate user and handle success
      createUserWithEmailAndPassword(auth, email, pass)
        .then(async ({ user }) => {
          console.log(user);
          await fetchSignInMethodsForEmail(auth, user?.email || "")
            .then(async (signInMethods) => {
              if (signInMethods.length > 0) {
                console.log(signInMethods);
              } else {
                try {
                  await addDoc(collection(db, "/users"), {
                    id: user?.uid,
                    name: name,
                    email: user?.email,
                    myList: [],
                  });
                  console.log("Document added successfully");
                } catch (e) {
                  console.error("Error adding document: ", e);
                }
              }
            })
            .catch((err) => console.log("error: " + err));

          localStorage.setItem(`token=${user?.uid}`, user?.uid || "");
          toast.success("Successfully Create Account");
          setTimeout(() => {
            // Navigate to the home page
            router("/", { replace: true });
          }, 1600);

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
      toast.error("Check Email address or Password");
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[40vh] justify-center items-center flex-col w-full">
      <Toaster position="top-center" reverseOrder={false} />
      <form className="w-[80%] flex flex-col gap-4" onSubmit={handleSignUp}>
        <input
          value={name}
          onChange={(event) => setName(event?.target.value)}
          className="bg-zinc-700  shadow appearance-none border border-zinc-500 rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
          id="Name"
          type="text"
          placeholder="Name"
          required
        />
        <input
          value={email}
          onChange={(event) => setEmail(event?.target.value)}
          className="bg-zinc-700  shadow appearance-none border border-zinc-500 rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
          required
        />
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
          className="bg-primary text-light rounded-md p-2 font-bold items-center flex justify-center mt-3"
        >
          {loading ? (
            <span className="w-[30px] h-[30px] border-[5px] border-[solid] border-[#FFF] [border-bottom-color:transparent] rounded-[50%] inline-block box-border  animate-spin"></span>
          ) : (
            "Sign up"
          )}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
