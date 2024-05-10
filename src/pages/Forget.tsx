// ForgotPassword.js

import { FormEvent, useState } from "react";
import { auth } from "../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { IoIosArrowBack } from "react-icons/io";

// Import your Firebase configuration

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage("Password reset email sent!");
      setErrorMessage("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="bg-neutral-100 dark:bg-neutral-950 min-h-screen flex flex-col gap-[90px] items-center">
      <IoIosArrowBack
        className=" text-white self-start bg-primary m-5 pr-1 cursor-pointer"
        size={30}
        onClick={() => window.history.back()}
      />
      <div className="bg-neutral-100 dark:bg-neutral-800 p-8 rounded shadow-md  w-[80%] md:w-[50%]">
        <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold text-neutral-700 dark:text-neutral-200"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="Enter your email"
              className=" px-2 py-1 mt-1  border-gray-300 bg-neutral-100 w-full  shadow-sm outline-none sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-[#ecae44f3] focus:outline-none"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
