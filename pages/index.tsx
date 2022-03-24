import { MailIcon, MarkGithubIcon, ZapIcon } from '@primer/octicons-react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useMemo } from 'react'

const Home: NextPage = () => {
  const CONTACT_INFO = useMemo(
    () => [
      {
        Icon: MailIcon,
        content: 'jg.zhuo@outlook.com',
        href: 'mailto: jg.zhuo@outlook.com',
      },
      {
        Icon: MarkGithubIcon,
        content: 'zhuojg',
        href: 'https://github.com/zhuojg',
      },
      {
        Icon: ZapIcon,
        content: 'zhuojg.eth',
        href: 'zhuojg.eth',
      },
    ],
    []
  )

  return (
    <div className="w-full min-h-screen">
      <Head>
        <title>ZHUO Jinggang&apos;s Homepage</title>
        <meta name="description" content="ZHUO Jinggang's Homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full min-h-screen flex flex-col">
        <div className="flex flex-col items-start space-y-4 pt-16">
          {CONTACT_INFO.map(({ Icon, content, href }) => (
            <div
              key={content}
              className="w-full flex justify-start items-center space-x-4"
            >
              <Icon size={18} />
              <a
                className="text-sm underline decoration-white underline-offset-2"
                href={href}
              >
                {content}
              </a>
            </div>
          ))}
        </div>

        <h1 className="font-bold text-3xl pt-16">Hi!</h1>
        <div className="text-base">I'm ZHUO Jinggang.</div>
      </div>
    </div>
  )
}

export default Home
