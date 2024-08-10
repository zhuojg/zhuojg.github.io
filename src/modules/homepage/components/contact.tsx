import { MailIcon, MarkGithubIcon, OrganizationIcon } from '@primer/octicons-react'
import clsx from 'clsx'
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
        renderIcon: () => <OrganizationIcon size={18} />,
        content: 'Tezign',
        href: 'https://www.tezign.com/',
      },
    ],
    [],
  )

  return (
    <div className="flex flex-col space-y-16 lg:space-y-0 lg:flex-row justify-between">
      <div className="flex flex-col items-start justify-start">
        {CONTACT_INFO.map(({ renderIcon, content, href }) => (
          <div className="px-4" key={content}>
            <a
              className={clsx(
                'relative w-full group flex justify-start items-center',
                'text-sm py-2 my-1',
                'no-underline',
              )}
              href={href}
              target="_blank"
              rel="noreferrer"
            >
              {renderIcon()}
              <span className="ml-4">{content}</span>
              <div
                className={clsx(
                  'w-0 h-full border-b border-white absolute left-0 top-0 bottom-0',
                  'group-hover:w-full',
                  'transition-all duration-200 ease-in-out',
                )}
              />
            </a>
          </div>
        ))}
      </div>

      <img className="w-32 h-32 object-contain" src="/images/avatar.jpeg" alt="avatar" />
    </div>
  )
}
