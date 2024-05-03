import { ShimmerProps } from "../types/ShimmerProps";

function Shimmer({ width, height }: ShimmerProps) {
  return (
    <div
      className={`overflow-hidden ${
        width === "100%" ? "rounded-none" : "rounded-xl"
      } `}
    >
      <div
        style={{
          width: width,
          height: height,
          background:
            "linear-gradient(-90deg, #8c8c8c 0%, #adadad 50%, #8c8c8c 100%)",
          backgroundSize: "200% 100%",
          backgroundPosition: "90% -90%",
          animation: "shimmerAnimation 2.5s infinite",
        }}
      />
    </div>
  );
}

export default Shimmer;
