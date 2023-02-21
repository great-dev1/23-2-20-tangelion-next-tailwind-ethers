import { useState, useEffect } from "react"
import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { useAppContext } from "@/context"
import Layout from "@/layout"
import Intro from "@/components/Intro"
import CutScene1 from "@/components/CutScene1"
import StartFarming from "@/components/StartFarming"

const Home: NextPage = () => {
  const [farmExist, setFarmExist] = useState<boolean>(false)
  const { connected, connecting, connect, setAccounts, accounts, contract, showScene1 } = useAppContext()

  
  return (
    <>
      <Head>
        <title>PIT master</title>
      </Head>

      <Layout>
        {connected ? (
          <>
            {farmExist ? (
              <>Farm Exist</>
            ) : (
              <>
                {showScene1 ? (
                  <CutScene1 />
                ) : (
                  <StartFarming></StartFarming>
                )}
              </>
            )}
          </>
        ) : (
          <>
            {!connecting && (
              <Intro />
            )}
          </>
        )}
      </Layout>
    </>
  )
}

export default Home
