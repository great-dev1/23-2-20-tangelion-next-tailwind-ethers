import { useEffect, useState } from 'react';
import type { NextPage } from "next"
import Head from "next/head"
import Layout from "@/layout"
import Intro from "@/components/Intro"
import CutScene from "@/components/CutScene"
import NewGame from "@/components/NewGame"
import FarmingInfo from "@/components/FarmingInfo"
import Deadline1 from "@/components/Deadline1"
import Deadline2 from "@/components/Deadline2"
import GameOver from "@/components/GameOver"
import { useAppContext } from "@/context"
import constants from "@/utils/constants"

const Home: NextPage = () => {
  const { gameStatus, actionStatus, txStatus, appData, update, g_Model } = useAppContext()
  const [day, setDay] = useState()

  useEffect(() => {
    console.log("GAME_STATUS:", gameStatus)
    console.log("ACTION_STATUS:", actionStatus)
    console.log("TX_STATUS:", txStatus)
    console.log("APP_DATA:", appData)
  }, [gameStatus, actionStatus, txStatus])

  useEffect(() => {
    if (gameStatus === constants.NEW_GAME && actionStatus === constants.DISPLAY ||
      gameStatus === constants.FARMING ||
      gameStatus === constants.DEADLINE_1 && actionStatus === constants.DISPLAY ||
      gameStatus === constants.DEADLINE_2 && actionStatus === constants.DISPLAY ||
      gameStatus === constants.GAMEOVER && actionStatus === constants.DISPLAY) {
      update()
    }
  }, [day, gameStatus, actionStatus])

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!g_Model || gameStatus === constants.DISCONNECTED) {
        return
      }

      let result = await g_Model.getDay()
      const { day, success } = result
      if (success) {
        setDay(day)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [g_Model, gameStatus])

  return (
    <>
      <Head>
        <title>PIT master</title>
      </Head>

      <Layout>
        {gameStatus === constants.DISCONNECTED && <Intro />}
        {gameStatus === constants.CUTSCENE_1 && <CutScene no={1} />}
        {gameStatus === constants.NEW_GAME && <NewGame />}
        {gameStatus === constants.CUTSCENE_2 && <CutScene no={2} />}
        {gameStatus === constants.FARMING && <FarmingInfo />}
        {gameStatus === constants.DEADLINE_1 && <Deadline1 />}
        {gameStatus === constants.DEADLINE_2 && <Deadline2 />}
        {gameStatus === constants.GAMEOVER && <GameOver />}
      </Layout >
    </>
  )
}

export default Home
