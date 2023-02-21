import { useState, useEffect } from "react"
import Header from "./header"
import { useAppContext } from "@/context"

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [wide, setWide] = useState<boolean>(false)
  const { connected, connecting, connect, setAccounts, accounts, contract, showScene1} = useAppContext()

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
    <>
      <div className="min-h-screen flex flex-col">
        {!showScene1 && (
          <Header />
        )}
        <div className="flex-grow flex items-center justify-center">
          {children}
        </div>
      </div>

      {/* Background Image */}
      <div className={`absolute z-[-1] top-0 left-0 w-full h-full duration-1000 ${connected ? (showScene1 ? "bg-[#127FBC]" : "color-bg bg-[#127FBC]") : "mono-bg bg-[#515151]"} bg-bottom bg-no-repeat ${wide ? "bg-contain" : "bg-cover"}`} />
    </>
  )
}

export default Layout
