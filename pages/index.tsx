import { useState, useEffect } from "react"
import type { NextPage } from "next"
import Head from "next/head"
import Layout from "@/layout"
import Intro from "@/components/Intro"
import CutScene1 from "@/components/CutScene1"
import NewGame from "@/components/NewGame"
import Farming from "@/components/Farming"
import { useAppContext } from "@/context"
import constants from "@/utils/constants"

const Home: NextPage = () => {
  const { gameStatus, actionStatus, txStatus, appData, changeStatus } = useAppContext()
  console.log("GAME_STATUS", gameStatus)

  return (
    <>
      <Head>
        <title>PIT master</title>
      </Head>

      <Layout>
        {gameStatus === constants.DISCONNECTED && <Intro />}
        {gameStatus === constants.CONNECTING && <></>}
        {gameStatus === constants.CUTSCENE_1 && <CutScene1 />}
        {gameStatus === constants.NEW_GAME && <NewGame />}
        {gameStatus === constants.FARMING && <Farming />}
      </Layout>
    </>
  )
}

export default Home
