import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "./header";
import Footer from "./footer";
import { useAppContext } from "@/context";
import constants from "@/utils/constants";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useRouter();
  const [maxWidth, setMaxWidth] = useState<number>();
  const [background, setBackground] = useState<string>("");
  const { gameStatus, appData, videoLoading } = useAppContext();

  const getBackground = () => {
    if (gameStatus === constants.DISCONNECTED) return "mono-bg";
    if (gameStatus === constants.CONNECTING) return "mono-bg";
    if (gameStatus === constants.CUTSCENE_1)
      return videoLoading ? "mono-bg" : "";
    if (gameStatus === constants.NEW_GAME) return "color-new-bg";
    if (gameStatus === constants.CUTSCENE_2)
      return videoLoading ? "color-new-bg" : "";
    if (gameStatus === constants.STAKING) return `level-${appData.level}-bg`;
    if (gameStatus === constants.DEADLINE_1) return `level-${appData.level}-bg`;
    if (gameStatus === constants.DEADLINE_2) return `level-${appData.level}-bg`;
    if (gameStatus === constants.GAMEOVER) return `level-${appData.level}-bg`;
    return "mono-bg";
  };

  useEffect(() => {
    const bg = getBackground();
    setBackground(bg);
  }, [gameStatus, appData, videoLoading]);

  const changeMaxWidth = () => {
    setMaxWidth((window.innerHeight * 16) / 9);
  };

  // Change max-width on resize
  useEffect(() => {
    window.addEventListener("resize", changeMaxWidth);
    return () => {
      window.removeEventListener("resize", changeMaxWidth);
    };
  });

  // Set max-width on mount
  useEffect(() => {
    changeMaxWidth();
  }, []);

  return (
    <div
      className={
        gameStatus === constants.DISCONNECTED ||
        gameStatus === constants.CONNECTING
          ? "bg-[#515151]"
          : "bg-[#E7E6E6]"
      }
    >
      <div
        className={`min-h-screen flex flex-col mx-auto bg-bottom bg-no-repeat bg-cover duration-1000 ${background}`}
        style={{ maxWidth }}
      >
        <Header maxWidth={maxWidth} />
        {pathname.includes("tutorial") && (
          <div
            className="space-bg fixed z-0 top-[50px] md:top-[78px] bottom-[64px] w-full h-screen md:bg-center bg-cover"
            style={{ maxWidth }}
          />
        )}
        <div className="relative flex-grow flex items-center justify-center pt-[50px] md:pt-[78px]">
          {children}
        </div>
        {/* {pathname.includes("tutorial") && <Footer />} */}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
