import type { NextPage } from "next"
import Head from "next/head"
import Layout from "@/layout"
import TBD from "@/components/TBD"

const Tutorial: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tutorial</title>
      </Head>

      <Layout>
        <TBD />
      </Layout>
    </>
  )
}

export default Tutorial