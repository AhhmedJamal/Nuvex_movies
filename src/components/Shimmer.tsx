import { ShimmerProps } from "../types/ShimmerProps";

function Shimmer({ width, height }: ShimmerProps) {
  return (
    <div
      className={`overflow-hidden ${
        width === "100%" ? "rounded-none" : "rounded-xl"
      } `}
    >
      <div
        className="bg-gradient-to-r from-neutral-200 via-[#a4a4a480]  to-neutral-200 animate-shimmer  dark:from-neutral-600 dark:via-neutral-800 dark:to-neutral-600"
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
