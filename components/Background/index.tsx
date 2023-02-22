import { useState, useEffect } from "react"
import { useAppContext } from "@/context"
import constants from "@/utils/constants"

const Background = () => {
  const [wide, setWide] = useState<boolean>(false)
  const { gameStatus, actionStatus, txStatus, appData, changeStatus } = useAppContext()
  console.log("GAME_STATUS", gameStatus)

  const checkWideScreen = () => {
    if (window.innerWidth / window.innerHeight > 16 / 9) {
      setWide(true)
    } else {
      setWide(false)
    }
  }

  // Check if screen ratio is bigger than 16:9 on resize
  useEffect(() => {
    window.addEventListener('resize', checkWideScreen)
    return () => {
      window.removeEventListener('resize', checkWideScreen)
    }
  })

  // Check if screen ratio is bigger than 16:9 on mount
  useEffect(() => {
    checkWideScreen()
  }, [])

  return (
    <div className={`
      absolute z-[-1] top-0 left-0 w-full h-full bg-[#127FBC]
      ${gameStatus === constants.DISCONNECTED || gameStatus === constants.CONNECTING ? (
        "mono-bg bg-[#515151]"
      ) : (
        gameStatus !== constants.CUTSCENE_1 && "color-new-bg"
      )} 
      bg-bottom bg-no-repeat
      ${wide ? "bg-contain" : "bg-cover"}
      duration-1000
    `}
    />
  )
}

export default Background
