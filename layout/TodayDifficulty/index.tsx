import { useAppContext } from "@/context"
import constants from "@/utils/constants"

const TodayDifficulty = () => {
  const { gameStatus, appData } = useAppContext()

  return (
    <>
      {gameStatus !== constants.DISCONNECTED && gameStatus !== constants.CONNECTING && gameStatus !== constants.CUTSCENE_1 && gameStatus !== constants.CUTSCENE_2 && (
        <p className="absolute top-2 right-3 flex items-center justify-center h-[33px] px-5 text-sm font-bold text-[#515151] bg-[#D9D9D9E6]">
          Today’s farming difficulty: {appData.difficultyOfToday}
        </p>
      )}
    </>
  )
}

export default TodayDifficulty
