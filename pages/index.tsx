import { useState } from "react"
import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import Layout from "@/layout"
import { useAppContext } from "@/context"

const Home: NextPage = () => {
  const { connected, connecting, connect, setAccounts, accounts, contract } = useAppContext()
  const [play, setPlay] = useState<boolean>(true)

  return (
    <div className="">
      <Head>
        <title>PIT master</title>
      </Head>

      <Layout>
        {/* Intro Video */}
        <section>
          {!connected && !connecting && (
            <>
              {play ? (
                <iframe
                  width={832}
                  height={485}
                  src="https://www.youtube.com/embed/QhBnZ6NPOY0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="Intro video"
                />
              ) : (
                <div className="relative flex items-center justify-center gap-[72px] w-[757px] h-[441px] rounded-[10px] bg-[#DAC94C99]">
                  <div className="absolute left-[145px] text-5xl leading-[60px] font-bold uppercase text-[#DA4C4C]">
                    <p>Play</p>
                    <p className="text-[32px] leading-10">Intro</p>
                  </div>
                  <button onClick={() => setPlay(true)}>
                    <Image className="w-24 h-auto" src="/images/play.svg" width={162} height={158} alt="play" />
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </Layout>
    </div>
  )
}

export default Home
