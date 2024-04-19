import { ShimmerProps } from "../types/ShimmerProps";

function Shimmer({ width, height }: ShimmerProps) {
  return (
    <div
      style={{
        height: `${height}px`,
        width: `${width == 0 ? "100%" : `${width}px`}`,
      }}
      className={`animate-pulse bg-zinc-600 `}
    ></div>
  );
}

export default Shimmer;
