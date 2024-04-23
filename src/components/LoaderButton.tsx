function LoaderButton() {
  return (
    <div className="w-[100px] my-[4.5px] flex items-center justify-center gap-[5px]">
      <span className="bg-[#ffffff] w-[4px] h-[15px] animate-[grow_0.8s_ease-in-out_infinite]"></span>
      <span className="bg-[#ffffff] w-[4px] h-[15px] animate-[grow_0.8s_ease-in-out_0.15s_infinite] "></span>
      <span className="bg-[#ffffff] w-[4px] h-[15px] animate-[grow_0.8s_ease-in-out_0.3s_infinite] "></span>
      <span className="bg-[#ffffff] w-[4px] h-[15px] animate-[grow_0.8s_ease-in-out_0.475s_infinite] "></span>
    </div>
  );
}

export default LoaderButton;
