import { ChevronDownIcon, LinkIcon, LogIcon, MarkGithubIcon } from '@primer/octicons-react'
import { FC } from 'react'
import { Project } from '../types/project'
import { ProjectCard } from './projectCard'

const projects: Project[] = [
  {
    Icon: () => <LinkIcon size={18} />,
    name: 'MuseAI',
    link: 'https://museai.cc',
    date: 'Jul, 2023',
    introduction: 'AIGC Playground',
  },
  {
    Icon: () => <LinkIcon size={18} />,
    name: 'MyMfers',
    link: 'https://mymfers.xyz',
    date: 'Sept, 2022',
    introduction: 'Mix and match to claim your mfers',
  },
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
]

export const Projects: FC = () => {
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
