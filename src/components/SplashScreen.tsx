import { useEffect, useState } from "react";

function SplashScreen() {
  const [start, setStart] = useState<boolean>(false);
  useEffect(() => {
    setStart(true);
    setTimeout(() => {
      setStart(false);
    }, 2000);
  }, []);
  return (
    <div
      className={`flex justify-center items-center h-screen transition-all ${
        start ? "opacity-100" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="relative overflow-hidden z-10">
        <img src="../../public/assets/nuvex.png" className="w-[150px]" alt="" />
        <div className="absolute bottom-0 right-[0px] bg-[#ffffff0c] [box-shadow:0_4px_30px_#00000005] backdrop-filter backdrop-blur-[2px] w-full h-[11px]"></div>
      </div>
    </div>
  );
}

export default SplashScreen;
