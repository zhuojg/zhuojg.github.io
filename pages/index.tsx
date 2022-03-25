import type { NextPage } from 'next'
import Head from 'next/head'
import { Contact } from '../components/home/contact'
import { Intro } from '../components/home/intro'
import { Projects } from '../components/home/projects'

const Home: NextPage = () => {
  return (
    <div className="w-full min-h-screen">
      <Head>
        <title>Zhuo Jinggang&apos;s Homepage</title>
        <meta name="description" content="ZHUO Jinggang's Homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full min-h-screen flex flex-col space-y-16 mt-16">
        <Contact />
        <Intro />
        <Projects />
      </div>
    </div>
  )
}

export default Home
