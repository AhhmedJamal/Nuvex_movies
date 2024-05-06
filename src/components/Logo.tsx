import { logoProps } from "../types/LogoProps";

function Logo({ fontSize, heightBlur }: logoProps) {
  return (
    <div
      className={`relative w-fit text-[${fontSize}] font-[700] text-primary overflow-hidden z-10`}
    >
      NUVEX
      <div
        className={`absolute bottom-4 right-[-1px] bg-[#ffffff0c] [box-shadow:0_4px_30px_#00000005] backdrop-filter backdrop-blur-[2px] w-full h-[${heightBlur}]`}
      ></div>
    </div>
  );
}

export default Logo;
