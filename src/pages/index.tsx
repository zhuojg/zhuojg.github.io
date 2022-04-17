import { Contact } from '@/components/pages/index/contact'
import { Intro } from '@/components/pages/index/intro'
import { Projects } from '@/components/pages/index/projects'
import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div className="w-full min-h-screen">
      <Head>
        <title>Zhuo Jinggang&apos;s Homepage</title>
        <meta name="description" content="ZHUO Jinggang's Homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full min-h-screen flex flex-col space-y-32 mt-16">
        <Contact />
        <Intro />
        <Projects />
      </div>
    </div>
  )
}

export default Home
