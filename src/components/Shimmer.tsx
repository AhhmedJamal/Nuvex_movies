import { ShimmerProps } from "../types/ShimmerProps";

function Shimmer({ width, height }: ShimmerProps) {
  return (
    <div
      style={{
        height: `${height}px`,
        width: `${width == 0 ? "100%" : `${width}px`}`,
        borderRadius: `${width == 0 ? "0px" : "12px"}`,
      }}
      className={`animate-pulse bg-zinc-600 rounded-xl`}
    ></div>
  );
}

export default Shimmer;
