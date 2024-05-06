import { ShimmerProps } from "../types/ShimmerProps";

function Shimmer({ width, height }: ShimmerProps) {
  return (
    <div
      className={`overflow-hidden ${
        width === "100%" ? "rounded-none" : "rounded-xl"
      } `}
    >
      <div
        className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer  dark:from-zinc-600 dark:via-zinc-700 dark:to-zinc-600"
        style={{
          width: width,
          height: height,
          backgroundSize: "200% 100%",
          backgroundPosition: "90% -90%",
          animation: "shimmerAnimation 3.5s infinite",
        }}
      />
    </div>
  );
}

export default Shimmer;
