import { useState, useEffect } from "react"
import Image from "next/image"
import { Overpass_Mono } from "@next/font/google"

const overpassMono = Overpass_Mono({ subsets: ["latin"] })

const Intro = () => {
  const [showVideo, setShowVideo] = useState<boolean>(false)

  // Stop video playing on mount
  useEffect(() => {
    setShowVideo(false)
  }, [])

  return (
    <>
      {
        showVideo ? (
          <video className="fadein w-[757px] h-[441px] rounded-[10px]" autoPlay muted controls>
            <source src="/videos/intro.mp4" type="video/mp4" />
          </video>
        ) : (
          <div className="fadein relative flex items-center justify-center gap-[72px] w-[757px] h-[441px] rounded-[10px] bg-[#DAC94C99]">
            <div className={`absolute left-[145px] ${overpassMono.className} text-5xl leading-[60px] font-bold uppercase text-[#DA4C4C]`}>
              <p>Play</p>
              <p className="text-[32px] leading-10">Intro</p>
            </div>
            <button onClick={() => setShowVideo(true)}>
              <Image className="w-24 h-auto" src="/images/play.svg" width={162} height={158} alt="play" />
            </button>
          </div>
        )
      }
    </>
  )
}

export default Intro
