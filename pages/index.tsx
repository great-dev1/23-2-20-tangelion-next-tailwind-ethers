import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Layout from "@/layout";
import TodayDifficulty from "@/components/TodayDifficulty";
import Intro from "@/components/Intro";
import CutScene from "@/components/CutScene";
import NewGame from "@/components/NewGame";
import Staking from "@/components/Staking";
import Deadline1 from "@/components/Deadline1";
import Deadline2 from "@/components/Deadline2";
import GameOver from "@/components/GameOver";
import { useAppContext } from "@/context";
import constants from "@/utils/constants";

const Home: NextPage = () => {
  const {
    gameStatus,
    actionStatus,
    txStatus,
    update,
    g_Model,
    readOnly,
    wallet,
  } = useAppContext();
  const [day, setDay] = useState(0);

  useEffect(() => {
    // console.log("GAME_STATUS:", gameStatus);
    // console.log("ACTION_STATUS:", actionStatus);
    // console.log("TX_STATUS:", txStatus);
    console.log("App: New_Status =>", gameStatus, actionStatus, txStatus);
  }, [gameStatus, actionStatus, txStatus]);

  useEffect(() => {
    const handleUpdate = async () => {
      await update(`Reason: Update on new day${day}`);
    };
    handleUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day, wallet]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (
        !g_Model ||
        gameStatus === constants.DISCONNECTED ||
        gameStatus === constants.CONNECTING ||
        txStatus === constants.PENDING ||
        actionStatus != constants.DISPLAY
      ) {
        return;
      }
      let result = await g_Model.getDay();
      const { day, success } = result;
      if (success) {
        setDay(day);
        console.log("App: Reading currnet Day", day);
        await readOnly();
      }
    }, 5000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [g_Model, gameStatus, actionStatus, txStatus, wallet]);

  return (
    <>
      <Head>
        <title>Tangelion</title>
      </Head>

      <Layout>
        <TodayDifficulty />
        {gameStatus === constants.DISCONNECTED && <Intro />}
        {gameStatus === constants.CUTSCENE_1 && <CutScene no={1} />}
        {gameStatus === constants.NEW_GAME && <NewGame />}
        {gameStatus === constants.CUTSCENE_2 && <CutScene no={2} />}
        {gameStatus === constants.STAKING && <Staking />}
        {gameStatus === constants.DEADLINE_1 && <Deadline1 />}
        {gameStatus === constants.DEADLINE_2 && <Deadline2 />}
        {gameStatus === constants.GAMEOVER && <GameOver />}
      </Layout>
    </>
  );
};

export default Home;
