import { Carousel } from "react-responsive-carousel";
import Logo from "../components/Logo";

function OnBoarding() {
  const dataMovie = [
    {
      backdrop_path: "assets/unlimited.svg",
      id: 7913734,
      title: "Unlimited films, TV programmes & more",
      overview: "Watch anywhere. Cancel at any time.",
    },
    {
      backdrop_path: "assets/plan.svg",
      id: 7813732,
      title: "There's a plan for every fan",
      overview: "plans start at EGP 70.",
    },
    {
      backdrop_path: "assets/watch.svg",
      id: 7213712,
      title: "Watch everywhere",
      overview: "Stream on your phone, tablet, laptop and TV.",
    },
  ];

  return (
    <div className="h-screen flex flex-col justify-between">
      <Logo heightBlur={50} fontSize={50} />
      <Carousel
        autoPlay={false}
        infiniteLoop={false}
        showThumbs={false}
        showIndicators={true}
        showStatus={false}
        showArrows={true}
      >
        {dataMovie.map((data) => {
          return (
            <div
              key={data.id}
              className="relative h-[500px] mt-10 w-full flex flex-col justify-center items-center "
            >
              <img
                loading="lazy"
                src={data.backdrop_path}
                alt={data.title}
                className=" h-[200px] sm:h-[300px]"
              />
              <div className=" font-['Madimi_One',_sans-serif] font-normal not-italic lg:pb-[100px] text-neutral-200  w-full  ">
                <h1 className=" w-[67%] m-auto text-[30px]">{data.title}</h1>
                <p className="text-neutral-500 w-[220px] md:w-[300px] m-auto">
                  {data.overview}
                </p>
              </div>
            </div>
          );
        })}
      </Carousel>
      <button className="bg-primary w-[80%] m-auto rounded-sm py-1.5 font-bold active:opacity-70">
        Get Started
      </button>
    </div>
  );
}

export default OnBoarding;
