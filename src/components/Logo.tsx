import { logoProps } from "../types/LogoProps";

function Logo({ fontSize, heightBlur, bottom }: logoProps) {
  return (
    <div className={`relative w-fit overflow-hidden z-10`}>
      <h1 className={`${fontSize} font-[700] text-primary`}>NUVEX</h1>
      <span
        className={`absolute ${bottom} w-full ${heightBlur} right-[-1px] bg-[#ffffff0c] [box-shadow:0_4px_30px_#00000005] backdrop-filter backdrop-blur-[2px]`}
      ></span>
    </div>
  );
}

export default Logo;
