import { FileZipIcon, LinkIcon, LogIcon, MarkGithubIcon } from '@primer/octicons-react'
import { FC, useMemo } from 'react'

interface Project {
  name: string
  link: string
  date: string
  tags: string[]
  renderLinks: () => JSX.Element
}

const LinkButton: FC<{ href: string }> = ({ children, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="text-gray-500 hover:text-white transition-all ease-in-out duration-200"
  >
    {children}
  </a>
)

export const Projects: FC = () => {
  const projects: Project[] = useMemo(
    () => [
      {
        name: 'naodong.io',
        link: 'https://naodong.io',
        date: 'Sept, 2021',
        tags: [],
        renderLinks: () => (
          <LinkButton href="https://naodong.io">
            <LinkIcon size={18} />
          </LinkButton>
        ),
      },
      {
        name: 'Subculture Colorization',
        link: 'https://github.com/tezignlab/subculture-colorization',
        date: 'Mar, 2021',
        tags: [],
        renderLinks: () => (
          <>
            <LinkButton href="https://github.com/tezignlab/subculture-colorization">
              <MarkGithubIcon size={18} />
            </LinkButton>

            <LinkButton href="https://subverse.site">
              <LinkIcon size={18} />
            </LinkButton>

            <LinkButton href="https://arxiv.org/abs/2102.05231">
              <LogIcon size={18} />
            </LinkButton>
          </>
        ),
      },
      {
        name: 'sg2layout',
        link: 'https://github.com/zhuojg/sg2layout',
        date: 'Dec, 2020',
        tags: [],
        renderLinks: () => (
          <LinkButton href="https://github.com/zhuojg/sg2layout">
            <MarkGithubIcon size={18} />
          </LinkButton>
        ),
      },
      {
        name: 'CalligraphyGAN',
        link: 'https://arxiv.org/abs/2012.00744',
        date: 'Dec, 2020',
        tags: [],
        renderLinks: () => (
          <>
            <LinkButton href="https://arxiv.org/abs/2012.00744">
              <LogIcon size={18} />
            </LinkButton>
            <LinkButton href="https://github.com/zhuojg/chinese-calligraphy-dataset">
              <MarkGithubIcon size={18} />
            </LinkButton>
          </>
        ),
      },
    ],
    [],
  )

  return (
    <div className="flex flex-col">
      <div className="flex space-x-2 items-center mb-4">
        <FileZipIcon size={24} />
        <span className="text-lg font-bold">Projects</span>
      </div>

      {projects.map(({ name, link, date, renderLinks }) => (
        <div key={name} className="flex justify-between py-8 lg:py-4">
          <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:space-x-4 lg:items-center">
            <a
              className="underline underline-offset-4 decoration-transparent decoration-2 hover:decoration-blue-600 transition-all duration-200 ease-in-out"
              href={link}
              target="_blank"
              rel="noreferrer"
            >
              {name}
            </a>
            <div className="flex space-x-4 items-center">{renderLinks()}</div>
          </div>

          <div className="text-sm text-gray-300">{date}</div>
        </div>
      ))}
    </div>
  )
}
