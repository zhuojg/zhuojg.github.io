/* eslint-disable @next/next/no-img-element */
import { MailIcon, MarkGithubIcon } from '@primer/octicons-react'
import { FC, useMemo } from 'react'

export const Contact: FC = () => {
  const CONTACT_INFO = useMemo(
    () => [
      {
        renderIcon: () => <MailIcon size={18} />,
        content: 'jg.zhuo@outlook.com',
        href: 'mailto: jg.zhuo@outlook.com',
      },
      {
        renderIcon: () => <MarkGithubIcon size={18} />,
        content: 'zhuojg',
        href: 'https://github.com/zhuojg',
      },
      {
        renderIcon: () => (
          <img
            className="object-contain m-0"
            style={{ height: 18, width: 18 }}
            src="/images/eth-home-icon.webp"
            alt="eth"
          />
        ),
        content: 'zhuojg.eth',
        href: 'zhuojg.eth',
      },
    ],
    [],
  )

  return (
    <div className="flex flex-col space-y-16 lg:space-y-0 lg:flex-row justify-between">
      <div className="flex flex-col items-start justify-start">
        {CONTACT_INFO.map(({ renderIcon, content, href }) => (
          <a
            className="flex justify-start items-center space-x-4 text-sm lg:link no-underline lg:px-4 py-2 my-1"
            key={content}
            href={href}
            target="_blank"
            rel="noreferrer"
          >
            {renderIcon()}
            <span>{content}</span>
          </a>
        ))}
      </div>

      <img className="w-32 h-32 object-contain" src="/images/avatar.jpeg" alt="avatar" />
    </div>
  )
}