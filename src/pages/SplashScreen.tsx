import { useEffect, useState } from "react";
import Logo from "../components/Logo";

function SplashScreen() {
  const [start, setStart] = useState<boolean>(false);
  useEffect(() => {
    setStart(true);
    setTimeout(() => {
      setStart(false);
    }, 1600);
  }, []);
  return (
    <div
      className={`flex justify-center items-center h-screen transition-all   ${
        start ? "opacity-100" : "opacity-0 translate-y-4"
      }`}
    >
      <Logo fontSize="text-[50px]" heightBlur="h-[15px]" bottom="bottom-4" />
    </div>
  );
}

export default SplashScreen;
