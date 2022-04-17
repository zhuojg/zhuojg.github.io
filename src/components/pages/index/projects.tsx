import { useHover } from '@/hooks/useHover'
import { ChevronDownIcon, LinkExternalIcon, LinkIcon, LogIcon, MarkGithubIcon } from '@primer/octicons-react'
import clsx from 'clsx'
import { FC, useMemo } from 'react'

interface Project {
  Icon: FC
  name: string
  link: string
  date: string
  introduction: string
}

const ProjectCard: FC<{ project: Project }> = ({ project }) => {
  const [isHovering, ref] = useHover<HTMLAnchorElement>()
  const { link, name, date, introduction, Icon } = project

  return (
    <a
      className={clsx('flex flex-col py-8 space-y-2 lg:link lg:px-4 cursor-pointer', 'no-underline')}
      ref={ref}
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      <Icon />
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="flex space-x-2 items-center">
          <span className="no-underline">{name}</span>

          <LinkExternalIcon
            className={clsx(
              isHovering ? 'opacity-0 lg:opacity-100 animate-bounce' : 'opacity-0',
              'transition-opacity duration-300 ease-in-out',
            )}
            size={16}
          />
        </div>

        <div className="text-sm text-gray-700 lg:text-gray-300">{date}</div>
      </div>

      <div
        className={clsx(
          'text-sm',
          isHovering ? 'text-gray-200' : 'text-gray-500',
          'transition-all duration-300 ease-in-out',
        )}
      >
        {introduction}
      </div>
    </a>
  )
}

export const Projects: FC = () => {
  const projects: Project[] = useMemo(
    () => [
      {
        Icon: () => <LinkIcon size={18} />,
        name: 'naodong.io',
        link: 'https://naodong.io',
        date: 'Sept, 2021',
        introduction: 'Hub of creative cases',
      },
      {
        Icon: () => <MarkGithubIcon size={18} />,
        name: 'Subculture Colorization',
        link: 'https://github.com/tezignlab/subculture-colorization',
        date: 'Mar, 2021',
        introduction: 'Paper about colors in Chinese Youth Subculture',
      },
      {
        Icon: () => <MarkGithubIcon size={18} />,
        name: 'sg2layout',
        link: 'https://github.com/zhuojg/sg2layout',
        date: 'Dec, 2020',
        introduction: 'Repo for layout generation algorithm with scene graph',
      },
      {
        Icon: () => <LogIcon size={18} />,
        name: 'CalligraphyGAN',
        link: 'https://arxiv.org/abs/2012.00744',
        date: 'Dec, 2020',
        introduction: 'Paper about Chinese calligraphy generation with GAN',
      },
    ],
    [],
  )

  return (
    <div className="flex flex-col">
      <div className="flex flex-col space-x-2 justify-center items-center mb-4">
        <span className="text-2xl font-bold uppercase">Projects</span>
        <ChevronDownIcon size={32} />
      </div>

      <div className="flex flex-col divide-y divide-dashed">
        {projects.map((item) => (
          <div key={item.name} className="py-4">
            <ProjectCard project={item} />
          </div>
        ))}
      </div>
    </div>
  )
}
