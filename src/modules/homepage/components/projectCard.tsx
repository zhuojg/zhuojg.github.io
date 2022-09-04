import { useHover } from '@/modules/common/hooks/useHover'
import { LinkExternalIcon } from '@primer/octicons-react'
import clsx from 'clsx'
import { FC } from 'react'
import { Project } from '../types/project'

export const ProjectCard: FC<{ project: Project }> = ({ project }) => {
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
