import { logoProps } from "../types/LogoProps";

function Logo({ fontSize, heightBlur, bottom }: logoProps) {
  return (
    <div
      className={`relative w-fit  ${fontSize} font-[700] text-primary overflow-hidden z-10`}
    >
      <p>NUVEX</p>
      <span
        className={`absolute ${bottom} w-full ${heightBlur} right-[-1px] bg-[#ffffff0c] [box-shadow:0_4px_30px_#00000005] backdrop-filter backdrop-blur-[2px]`}
      ></span>
    </div>
  );
}

export default Logo;
