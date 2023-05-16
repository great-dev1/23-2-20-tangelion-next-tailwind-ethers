import { useEffect, useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/context";
import constants from "@/utils/constants";

const Intro = () => {
  const [mobile, setMobile] = useState<boolean>(false);
  const [play, setPlay] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);
  const { changeStatus } = useAppContext();

  const changeDevice = () => {
    if (window.innerWidth < 768) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", changeDevice);
    return () => {
      window.removeEventListener("resize", changeDevice);
    };
  });

  useEffect(() => {
    changeDevice();
    setWidth(100);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-[6vw] p-4">
      <div
        className="transition-width xl:self-start absolute top-20 md:static max-w-[90vw] xl:truncate"
        style={{
          width: `${width}%`,
        }}
      >
        <p className="overpass_font px-7 py-4 text-center text-sm md:text-[22px] font-bold md:leading-[28px] text-black bg-[#FFFFFFCC]">
          click on{" "}
          <button
            className="hover-underline inline-flex items-center gap-1 md:gap-1.5 text-[#4CB8DA]"
            onClick={() => changeStatus(constants.connect)}
          >
            <span className="blue">connect</span>
            <Image
              className="w-auto h-4 md:h-[22px]"
              src="/images/connect.svg"
              width={18}
              height={22}
              alt="connect"
            />
          </button>{" "}
          and start uplevel staking to boost your passive income
        </p>
      </div>

      {mobile && !play && (
        <button
          className="flex justify-center items-center w-24 h-24 rounded-full bg-[#515151]"
          onClick={() => setPlay(true)}
        >
          <Image
            className="translate-x-1.5"
            src="/images/play-white.svg"
            width={42}
            height={48}
            alt="play"
          />
        </button>
      )}

      {(!mobile || play) && (
        <video
          className="fadein relative z-10 max-w-[757px] w-full rounded-[10px] cursor-pointer"
          autoPlay={play}
          controls
        >
          <source src="/videos/intro.mp4" type="video/mp4" />
        </video>
      )}

      {play && (
        <div
          className="absolute z-0 top-0 left-0 w-full h-full"
          onClick={() => setPlay(false)}
        />
      )}
    </div>
  );
};

export default Intro;
