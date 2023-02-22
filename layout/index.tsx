import { useEffect, useState } from "react"
import Header from "./header"
import TodayDifficulty from "./TodayDifficulty"
import { useAppContext } from "@/context"
import constants from "@/utils/constants"

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [maxWidth, setMaxWidth] = useState<number>()
  const { gameStatus, actionStatus, txStatus, appData, changeStatus } = useAppContext()
  console.log("GAME_STATUS", gameStatus)

  const changeMaxWidth = () => {
    setMaxWidth(window.innerHeight * 16 / 9)
  }

  // Change max-width on resize
  useEffect(() => {
    window.addEventListener('resize', changeMaxWidth)
    return () => {
      window.removeEventListener('resize', changeMaxWidth)
    }
  })

  return (
    <div className={gameStatus === constants.DISCONNECTED || gameStatus === constants.CONNECTING ? "bg-[#515151]" : "bg-[#127FBC]"}>
      <div
        className={`min-h-screen flex flex-col mx-auto bg-bottom bg-no-repeat bg-cover duration-1000
          ${gameStatus === constants.DISCONNECTED || gameStatus === constants.CONNECTING ? "mono-bg" : (
            gameStatus === constants.NEW_GAME ? "color-new-bg" : "color-crowd-bg"
          )}`}
        style={{ maxWidth }}
      >
        <Header />
        <TodayDifficulty />
        <div className="flex-grow flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
