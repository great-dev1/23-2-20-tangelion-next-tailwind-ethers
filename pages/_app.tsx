import Head from "next/head"
import type { AppProps } from "next/app"
import { Oxanium } from "@next/font/google"
import 'tailwindcss/base.css'
import 'tailwindcss/components.css'
import 'tailwindcss/utilities.css'
import "@/styles/globals.scss"
import { AppContextProvider } from "@/context"

const oxanium = Oxanium({ subsets: ["latin"] })

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <AppContextProvider>
        <div className={oxanium.className}>
          <Component {...pageProps} />
        </div>
      </AppContextProvider>
    </>
  )
}

export default App
