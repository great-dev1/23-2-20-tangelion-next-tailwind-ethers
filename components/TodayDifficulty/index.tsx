import { useAppContext } from "@/context";
import constants from "@/utils/constants";

const TodayDifficulty = () => {
  const { gameStatus, appData } = useAppContext();

  return (
    <>
      {gameStatus === constants.NEW_GAME && (
        <p className="absolute top-[54px] md:top-[86px] md:right-3 flex items-center justify-center h-5 md:h-8 px-2.5 md:px-5 text-[10px] md:text-sm font-bold text-[#515151] bg-[#D9D9D9E6]">
          Network’s staking difficulty: {appData.difficultyOfToday}
        </p>
      )}
    </>
  );
};

export default TodayDifficulty;
