import { useState, useEffect } from "react"
import type { NextPage } from "next"
import Head from "next/head"
import { useAppContext } from "@/context"
import Layout from "@/layout"
import Intro from "@/components/Intro"
import CutScene1 from "@/components/CutScene1"
import NewGame from "@/components/NewGame"
import TxPending from "@/components/TxPending"
import TxSuccess from "@/components/TxSuccess"
import TxFailed from "@/components/TxFailed"

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>PIT master</title>
      </Head>

      <Layout>
        {}
      </Layout>
    </>
  )
}

export default Home
