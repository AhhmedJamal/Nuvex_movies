import { useEffect, useRef, useState } from "react";
import Logo from "../components/Logo";
import NotificationSound from "/audio/startScreen.mp3";

function SplashScreen() {
  const [start, setStart] = useState<boolean>(false);
  const audioPlayer = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setStart(true);
    setTimeout(() => {
      setStart(false);
    }, 2600);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`flex justify-center items-center h-screen transition-all  ${
        start ? "opacity-100" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Audio element with autoplay attribute */}
      <audio ref={audioPlayer} src={NotificationSound} autoPlay />

      {/* Logo component */}
      <Logo fontSize="text-[50px]" heightBlur="h-[15px]" bottom="bottom-4" />
    </div>
  );
}

export default SplashScreen;
