import { useState, useEffect } from "react"
import Image from "next/image"
import { Overpass_Mono } from "@next/font/google"
import { useAppContext } from "@/context"

const overpassMono = Overpass_Mono({ subsets: ["latin"] })

const Intro = () => {
  const [showVideo, setShowVideo] = useState<boolean>(false)
  const { connected, connecting, connect, setAccounts, accounts, contract } = useAppContext()

  // Stop video playing on connected change
  useEffect(() => {
    setShowVideo(false)
  }, [connected])

  return (
    <>
      {showVideo ? (
        <iframe
          width={832}
          height={485}
          src="https://www.youtube.com/watch?v=8N7IHtwruvA"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Intro video"
        />
      ) : (
        <div className="relative flex items-center justify-center gap-[72px] w-[757px] h-[441px] rounded-[10px] bg-[#DAC94C99] fadein">
          <div className={`absolute left-[145px] text-5xl leading-[60px] font-bold uppercase text-[#DA4C4C] ${overpassMono.className}`}>
            <p>Play</p>
            <p className="text-[32px] leading-10">Intro</p>
          </div>
          <button onClick={() => setShowVideo(true)}>
            <Image className="w-24 h-auto" src="/images/play.svg" width={162} height={158} alt="play" />
          </button>
        </div>
      )}
    </>
  )
}

export default Intro
